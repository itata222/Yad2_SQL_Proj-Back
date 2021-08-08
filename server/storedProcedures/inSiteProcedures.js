const {sql}=require('../db/db')

function loginProcedure(){
    const reqSql= new sql.Request();
    const query=`
    CREATE OR ALTER PROCEDURE login_user
    @email nvarchar(50) = '',
    @password nvarchar(50) = ''
    AS
    select * from tblUsers where email=@email AND password=@password
    RETURN`;
    reqSql.query(query,async(err,recordset)=>{
        if(err){
            console.log('err',err.originalError.message)
            return;
        
        }})
    }
function createUserProcedure(){
    const reqSql= new sql.Request();
    const query=`
    CREATE OR ALTER PROCEDURE create_user
    @email nvarchar(50) = '',
    @password nvarchar(50) = ''
    AS
    insert into tblUsers output inserted.userID values(@email,@password)
    RETURN`;
    reqSql.query(query,async(err,recordset)=>{
        if(err){
            console.log('err',err.originalError.message)
            return;
        
        }})
    }
function logoutProcedure(){
    const reqSql= new sql.Request();
    const query=`
    CREATE OR ALTER PROCEDURE logout_user
    @token nvarchar(300) = ''
    AS
    DELETE FROM tblTokens WHERE token=@token;
    RETURN`;
    reqSql.query(query,async(err,recordset)=>{
        if(err){
            console.log('err',err.originalError.message)
            return;
        
        }})
    }
function getUserByIDProcedure(){
    const reqSql= new sql.Request();
    const query=`
    CREATE OR ALTER PROCEDURE get_user_by_id
    @id nvarchar(200) = ''
    AS
    select * from tblUsers where userID=@id;
    RETURN`;
    reqSql.query(query,async(err,recordset)=>{
        if(err){
            console.log('err',err.originalError.message)
            return;
        }})
    }
function updateUserProcedure(){
    const reqSql= new sql.Request();
    const query=`
    CREATE OR ALTER PROCEDURE update_user
    @id nvarchar(200) = '',
    @password nvarchar(50)='',
    @email nvarchar(50)=''
    AS
    UPDATE tblUsers SET password = @password,Email=@email OUTPUT inserted.* WHERE userID = @id;
    RETURN`;
    reqSql.query(query,async(err,recordset)=>{
        if(err){
            console.log('err',err.originalError.message)
            return;
        
        }})
    }
function addPostProcedure(){
    const reqSql= new sql.Request();
    const query=`
    CREATE OR ALTER PROCEDURE add_post
    @userID nvarchar(50),@propType nvarchar(50),@condition nvarchar(50),
    @city nvarchar(50),@street nvarchar(50),@houseNumber int,
    @floor int,@floorsInBuilding int,@onBars BIT,
    @neighborhood nvarchar(50),@area nvarchar(50),@rooms int,
    @parking int,@balcony int,@airCondition BIT,
    @mamad BIT,@warehouse BIT,@pandor BIT,
    @furnished BIT,@accessible BIT,@elevator BIT,
    @tadiran BIT,@remaked BIT,@kasher BIT,
    @sunEnergy BIT,@bars BIT,@video nvarchar(50),
    @description nvarchar(50),@buildMr int,@totalMr int,
    @price int,@entryDate datetime,@immidiate BIT,
    @contactName nvarchar(50),@contactPhone nvarchar(50),@contactEmail nvarchar(50)
    AS
    insert into tblPosts (
        userID,propType,condition,city,street,houseNumber,floor,floorsInBuilding,onBars,
        neighborhood,area,rooms,parking,balcony,airCondition,mamad,warehouse,pandor,
        furnished,accessible,elevator,tadiran,remaked,kasher,sunEnergy,bars,video,
        description,buildMr,totalMr,price,entryDate,immidiate,contactName,contactPhone,contactEmail
      ) OUTPUT inserted.* values (
        @userID,@propType,@condition,
        @city,@street,@houseNumber,
        @floor,@floorsInBuilding,@onBars,
        @neighborhood,@area,@rooms,
        @parking,@balcony,@airCondition,
        @mamad,@warehouse,@pandor,
        @furnished,@accessible,@elevator,
        @tadiran,@remaked,@kasher,
        @sunEnergy,@bars,@video,
        @description,@buildMr,@totalMr,
        @price,@entryDate,@immidiate,
        @contactName,@contactPhone,@contactEmail
    )
    RETURN`;
    reqSql.query(query,async(err,recordset)=>{
        if(err){
            console.log('err',err.originalError.message)
            return;
        
        }})
    }
function getAllPostsProcedure(){
    const reqSql= new sql.Request();
    const query=`
    CREATE OR ALTER PROCEDURE get_all_posts
    @roomsRange nvarchar(200),@totalMrRange nvarchar(200),@types nvarchar(200),
    @priceRange nvarchar(200),@cityText nvarchar(50),@streetText nvarchar(50),
    @floorsFrom int=0,@floorsTo int=20,@propSqlQuery nvarchar(400),
    @entryDate datetime,@freeText nvarchar(400)='', @sortBy nvarchar(50)
    AS
    Select * from tblPosts WHERE @roomsRange AND @totalMrRange AND (@types)
                        AND @priceRange AND (city like '%@cityText%' OR street like '%@streetText%')
                        AND floor>@floorsFrom AND floor<=floorsTo IF LEN(@propSqlQuery)>0  
                                                                        {'AND @propSqlQuery' }   
                                                                    ELSE   
                                                                        { '' } 
                        AND @entryDate AND description like '%@freeText%'
                        ORDER BY ${!sortBy?'creationDate DESC':sortBy==='-price'?'price DESC':'price ASC'}
    RETURN`;
    reqSql.query(query,async(err,recordset)=>{
        if(err){
            console.log('err',err.originalError.message)
            return;
        
        }})
}


module.exports={
    loginProcedure,
    createUserProcedure,
    logoutProcedure,
    getUserByIDProcedure,
    updateUserProcedure,
    addPostProcedure,
    getAllPostsProcedure
}
