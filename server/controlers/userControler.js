const { uploadFile, getFilesStream } = require('../../s3');
const {sql} = require("../db/db");
const moment =require('moment')

const fs=require('fs');
const util=require('util');
const unlinkFile=util.promisify(fs.unlink);
const portUrl=`http://localhost:${process.env.PORT}`;

const generateAuthToken=require('../utils/generateToken');
const { optionalStr, getParamStrFromArr, getAppartmentPropertiesFromObject } = require('../utils/getPostsUtils');


exports.createUser = async (req, res) => {
    const query=`EXEC create_user @email = '${req.body.email}', @password = '${req.body.password}';`;
    let returnObj={};
    try {
        const reqSql= new sql.Request();
        reqSql.query(query,async(err,recordset)=>{
            if(err){
                console.log('err',err.originalError.message)
                return;
            }
            returnObj.user={
                userID:Object.values(recordset.recordset[0])[0],
                email:req.body.email,
            };
            const token=await generateAuthToken(Object.values(recordset.recordset[0])[0])
            returnObj.token=token;
            res.send(returnObj)
        })
    
    } catch (error) {
        res.status(500).send({
            status: 500,
            message: error
        })
    }
}

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    const query=`EXEC login_user @email = '${email}', @password = '${password}';`;
    let returnObj={};
    try {
        const reqSql= new sql.Request();
        reqSql.query(query,async(err,recordset)=>{
            if(err){
                console.log('err',err.originalError.message)
                return;
            }
            if(recordset.recordset.length===0){
                return res.status(400).send({
                    status:400,
                    message:'Email Or Password not Match'
                })
            }
            returnObj.user={
                userID:Object.values(recordset.recordset[0])[0],
                email:req.body.email,
            };
            const token=await generateAuthToken(Object.values(recordset.recordset[0])[0])
            returnObj.token=token;
            res.send(returnObj)
        })
    } catch (e) {
        res.status(500).send({
            status: 500,
            message: e.message,
        })
    }
}

exports.logout = async (req, res) => {
    const user = req.user;
    try {
        const reqSql=new sql.Request();
        reqSql.query(`EXEC logout_user @token='${user.token}'`,(err,recordset)=>{
            if(err){
                console.log('err2',err.originalError.message)
                return;
            }
        })
        res.send(user)
    } catch (e) {
        res.status(500).send({
            status: 500,
            message: 'something went wrong'
        })
    }
}

exports.updateInfo = async (req, res) => {
    const _id = req.user.userID;
    const newPassword = req.body.newUser.password;
    const newEmail = req.body.newUser.email;
    let userObj={};
    try {
        if (req.body && (!newPassword && !newEmail))
            throw new Error('You can only edit your password or email')
        const reqSql=new sql.Request();
         reqSql.query(`EXEC get_user_by_id @id=${_id}`,(err,record)=>{
            if(err){
                console.log('err2',err.originalError.message)
                return;
            }
            userObj=record.recordset[0]
            reqSql.query(`EXEC update_user @id=${_id} ,email='${newEmail||userObj.email}',password='${newPassword||userObj.password}'`,(err,recordset)=>{
                if(err){
                    console.log('err3',err.originalError.message)
                    return;
                }
                res.send(recordset.recordset[0])
            })
        })
      
    } catch (err) {
        res.status(500).send({
            status: 500,
            message: err.message
        })
    }
}

exports.addPost=async (req, res) => {
    const postPropertiesValues=Object.values(req.body);
    const postPropertiesKeys=Object.keys(req.body);
    for(let i=0;i<postPropertiesValues.length;i++){
       if(req.body[postPropertiesKeys[i]]===false ||req.body[postPropertiesKeys[i]]===-1)
        req.body[postPropertiesKeys[i]]=0
       else if(req.body[postPropertiesKeys[i]]===true)
        req.body[postPropertiesKeys[i]]=1
    }
    const userID=req.user.userID;
    const postProperties=req.body;
    try {
        const reqSql=new sql.Request();
        const query=`EXEC add_post @userID=${userID},@propType='${postProperties.propType}',@condition='${postProperties.condition}',
        @city='${postProperties.city}',@street='${postProperties.street}',@houseNumber=${postProperties.houseNumber},
        @floor=${postProperties.floor},@floorsInBuilding=${postProperties.floorsInBuilding},@onBars=${postProperties.onBars},
        @neighborhood='${postProperties.neighborhood}',@area='${postProperties.area}',@rooms=${postProperties.rooms},
        @parking=${postProperties.parking},@balcony=${postProperties.balcony},@airCondition=${postProperties.airCondition},
        @mamad=${postProperties.mamad},@warehouse=${postProperties.warehouse},@pandor=${postProperties.pandor},
        @furnished=${postProperties.furnished},@accessible=${postProperties.accessible},@elevator=${postProperties.elevator},
        @tadiran=${postProperties.tadiran},@remaked=${postProperties.remaked},@kasher=${postProperties.kasher},
        @sunEnergy=${postProperties.sunEnergy},@bars=${postProperties.bars},@video='${postProperties.video}',
        @description='${postProperties.description}',@buildMr=${postProperties.buildMr},@totalMr=${postProperties.totalMr},
        @price=${postProperties.price},@entryDate='${postProperties.entryDate}',@immidiate=${postProperties.immidiate},
        @contactName='${postProperties.contactName}',@contactPhone='${postProperties.contactPhone}',@contactEmail='${postProperties.contactEmail}'`;
        reqSql.query(query,(err,records)=>{
            if(err){
                console.log('err6',err.originalError.message)
                return;
            }
            for(let i=0;i<req.body.photos.length;i++){
                reqSql.query(`insert into tblPhotos values(
                    ${records.recordset[0].postID},
                    '${req.body.photos[i]}')`,(err,records)=>{
                    if(err){
                        console.log('err5',err)
                        return;
                    }
                })
            }
        }) 
        res.send(postProperties) 
    } catch (e) {
        res.status(500).send(e.message)
    }
}

exports.getPosts=async (req, res) => {
    const limit=parseInt(req.query.limit);
    const page=parseInt(req.query.page);
    const query=JSON.parse(req.query.queryObj);
    const currentLength=req.query.postsCurrentLength?parseInt(req.query.postsCurrentLength):0
    let hasMore=true,skip=(page-1)*limit;
    try {
        const textBy=query.text?`${query.text}`:'';
        const cityText=!!query.city?`${query.city}`:textBy;
        const streetText=!!query.street?`${query.street}`:cityText;
        const onlyWithImage=query.withImage===true;
        const typesString= getParamStrFromArr(query.types);
        const propertiesStr = getAppartmentPropertiesFromObject(query);

        const querySql=`
        EXEC sp_get_all_posts 
        @roomsFrom=${optionalStr(query.roomsFrom)}, @roomsTo=${optionalStr(query.roomsTo)},
        @totalMrFrom=${optionalStr(query.sizeFrom)}, @totalMrTo=${optionalStr(query.sizeTo)},
        @priceFrom=${optionalStr(query.fromPrice)}, @priceTo=${optionalStr(query.toPrice)},
        @cityText=${optionalStr(cityText)}, @streetText=${optionalStr(streetText)},
        @floorsFrom=${optionalStr(query.floorsFrom)}, @floorsTo=${optionalStr(query.floorsTo)},
        @entryDate=${optionalStr(query.entryDate)}, @freeText=${optionalStr(query.freeText)},
        @sortBy=${optionalStr(query.sort)}, @types=${optionalStr(typesString)}, @properties=${optionalStr(propertiesStr)}`;
        const reqSql=new sql.Request();
        reqSql.query(querySql,(err,records)=>{
            if(err){
                console.log('err1',err.originalError?.message)
                return;
            }
            const allPostsThatMeetsTheQuery=records.recordset;
            if(query.fromPrice===1||query.withImage===true)
                skip=skip>0?currentLength:(page-1)*limit;
            if(query.fromPrice===-1||query.withImage===false&&skip>0)
                skip=(page-1)*limit;

            const querySqlExtended=`
            EXEC sp_get_top_5_posts 
            @skip = ${optionalStr(skip)} ,@roomsFrom=${optionalStr(query.roomsFrom)}, @roomsTo=${optionalStr(query.roomsTo)},
            @totalMrFrom=${optionalStr(query.sizeFrom)}, @totalMrTo=${optionalStr(query.sizeTo)},
            @priceFrom=${optionalStr(query.fromPrice)}, @priceTo=${optionalStr(query.toPrice)},
            @cityText=${optionalStr(cityText)}, @streetText=${optionalStr(streetText)},
            @floorsFrom=${optionalStr(query.floorsFrom)}, @floorsTo=${optionalStr(query.floorsTo)},
            @entryDate=${optionalStr(query.entryDate)}, @freeText=${optionalStr(query.freeText)},
            @sortBy=${optionalStr(query.sort)}, @limit=${optionalStr(limit)},
            @types=${optionalStr(typesString)},@properties=${optionalStr(propertiesStr)}`
            
            reqSql.query(querySqlExtended,(err,recordset)=>{
                if(err){
                    console.log('err12',err.originalError?.message)
                    return;
                }
                let posts=recordset.recordset;
                if((posts.length>0&&posts[posts.length-1].postID===allPostsThatMeetsTheQuery[allPostsThatMeetsTheQuery.length-1].postID)||posts.length===0)
                    hasMore=false;

                reqSql.query(`SELECT tblPosts.postID ,tblPhotos.photo
                            FROM tblPhotos
                            JOIN tblPosts 
                            ON tblPosts.postID=tblPhotos.postID`,(err,records)=>{
                                if(err){
                                    console.log('err',err.originalError?.message)
                                    return;
                                }
                                const photos=records.recordset;
                                for (let i = 0; i < posts.length; i++) {
                                    posts[i].photos = [];
                                    for (let j = 0; j < photos.length; j++) {
                                        if (posts[i].postID === photos[j].postID)
                                            posts[i].photos.push(photos[j]);
                                    }
                                    if(onlyWithImage&&posts[i].photos.length===0){
                                        posts.splice(i,1);
                                        i--;
                                    }
                                }
                                if(posts.length<5)
                                    hasMore=false
                                // console.log(posts.length,hasMore)
                                res.send({posts,hasMore})
                            })
                
            })
        })
    } catch (e) {
        res.status(500).send(e.message);
    }
}

exports.userPosts=async(req,res)=>{
    const id=req.query.id;
    try {
        const reqSql=new sql.Request();
        reqSql.query(`select * from tblPosts WHERE userID=${id}`,(err,records)=>{
            if(err){
                console.log('err7',err)
                return;
            }
            res.send(records.recordset)
        })
    } catch (e) {
        res.status(500).send(e.message)
    }
}

exports.postFile=async(req,res)=>{
    try {
        const file=req.file;
        const result=await uploadFile(file);
        await unlinkFile(file.path)
        res.send({filePath:`${portUrl}/files/${result.Key}`})
    } catch (e) {
        res.send(e)
    }
}

exports.getFiles=async(req,res)=>{
    const key=req.params.key;
    const readStream=getFilesStream(key)

    readStream.pipe(res)
}