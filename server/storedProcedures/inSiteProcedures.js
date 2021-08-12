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
    @token nvarchar(200)
    AS
    DELETE FROM tblTokens WHERE token=@token;
    RETURN`;
    reqSql.query(query,async(err,recordset)=>{
        if(err){
            console.log('err2',err.originalError.message)
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
function getTop5PostsProcedure(){
    const reqSql= new sql.Request();
    const query=`
    CREATE OR ALTER PROCEDURE sp_get_top_5_posts
    @skip int = NULL,
    @roomsFrom FLOAT = NULL,
    @roomsTo FLOAT = NULL,
    @totalMrFrom int = NULL,
    @totalMrTo int = NULL,
    @priceFrom FLOAT = NULL, 
    @priceTo FLOAT = NULL,
    @cityText nvarchar(50) =  NULL,
    @streetText nvarchar(50) = @cityText,
    @floorsFrom int = NULL,
    @floorsTo int =  NULL,
    @freeText nvarchar(400) =  NULL, 
    @entryDate datetime = NULL,
    @sortBy nvarchar(50)=NULL,
    @propSqlQuery nvarchar(400) = NULL,
    @types nvarchar(MAX) = NULL,
    @limit int = NULL,
    @properties NVARCHAR(MAX) = NULL
    AS
    DECLARE @Where nvarchar(MAX);
    SET @Where=' postID > 0 AND'

    IF (@skip IS NULL)
        SET @skip=0;
    IF (@limit IS NULL)
        SET @limit=5;
    IF (@roomsFrom IS NOT NULL)
        SET @Where=@Where+' rooms > CONVERT(VARCHAR(12), @roomsFromDyn) AND';
    IF (@roomsTo IS NOT NULL)
        SET @Where=@Where+' rooms <= CONVERT(VARCHAR(12), @roomsToDyn) AND';
    IF (@totalMrFrom IS NOT NULL)
        SET @Where=@Where+' totalMr > CONVERT(VARCHAR(12), @totalMrFromDyn) AND';
    IF (@totalMrTo IS NOT NULL)
        SET @Where=@Where+' totalMr <= CONVERT(VARCHAR(12), @totalMrToDyn) AND';
    IF (@priceFrom IS NOT NULL)
        SET @Where=@Where+' price > CONVERT(VARCHAR(12), @priceFromDyn) AND';
    IF (@priceTo IS NOT NULL)
        SET @Where=@Where+' price <= CONVERT(VARCHAR(12), @priceToDyn) AND';
    IF (@streetText=@cityText)
        SET @Where=@Where+' CHARINDEX(@cityTextDyn, city) > 0 OR CHARINDEX(@streetTextDyn, street) > 0';
    ELSE IF (@cityText IS NOT NULL)
        SET @Where=@Where+' CHARINDEX(@cityTextDyn, city) > 0 AND';
    ELSE IF (@streetText IS NOT NULL)
        SET @Where=@Where+' CHARINDEX(@streetTextDyn, street) > 0 AND';
    IF (@floorsFrom IS NOT NULL)
        SET @Where=@Where+' floor > CONVERT(VARCHAR(12), @floorsFromDyn) AND';
    IF (@floorsTo IS NOT NULL)
        SET @Where=@Where+' floor <= CONVERT(VARCHAR(12), @floorsToDyn) AND';
    IF (@freeText IS NOT NULL) 
        SET @Where=@Where+' CHARINDEX(@freeTextDyn, description) > 0 AND';
    IF (@entryDate IS NOT NULL)
        SET @Where=@Where+' entryDate <= CONVERT(VARCHAR(50), @entryDateDyn) AND';
    IF (@types IS NOT NULL)
        SET @Where=@Where+ ' CHARINDEX(propType,@TypesDyn) > 0 AND';
    IF (@properties IS NOT NULL AND LEN(@properties)>0)
        SET @Where=@Where +' '+ @properties

    IF (RIGHT(@Where, 3) = 'AND')
        SET @Where = SUBSTRING(@Where, 0, LEN(@Where) - 3) 
    IF (@sortBy IS NULL) 
        SET @Where=@Where+ ' ORDER BY creationDate DESC'
    ELSE IF (@sortBy ='-price') 
        SET @Where=@Where+ ' ORDER BY price DESC'
    ELSE IF (@sortBy = 'price') 
        SET @Where=@Where+ ' ORDER BY price ASC'
  
    
    DECLARE @Command NVARCHAR(MAX)
    SET @Command = '
    SELECT * FROM tblPosts
    WHERE' + @Where + '
    OFFSET CONVERT(INT, @skipDyn) ROWS
    FETCH NEXT CONVERT(INT, @limitDyn) ROWS ONLY'

    Execute SP_ExecuteSQL @Command, N'
    @priceFromDyn FLOAT,
    @priceToDyn FLOAT,
    @roomsFromDyn FLOAT,
    @roomsToDyn FLOAT,
    @totalMrFromDyn int,
    @totalMrToDyn int,
    @cityTextDyn NVARCHAR(50),
    @streetTextDyn NVARCHAR(50),
    @freeTextDyn NVARCHAR(400),
    @entryDateDyn NVARCHAR(50),
    @skipDyn int,
    @limitDyn int,
    @floorsFromDyn int,
    @floorsToDyn int,
    @TypesDyn NVARCHAR(MAX)',

    @priceFromDyn = @priceFrom,
    @priceToDyn = @priceTo,
    @roomsFromDyn = @roomsFrom,
    @roomsToDyn = @roomsTo,
    @totalMrFromDyn = @totalMrFrom,
    @totalMrToDyn = @totalMrTo,
    @cityTextDyn = @cityText,
    @streetTextDyn = @streetText,
    @freeTextDyn = @freeText,
    @entryDateDyn = @entryDate,
    @skipDyn=@skip,
    @limitDyn=@limit,
    @floorsFromDyn=@floorsFrom,
    @floorsToDyn=@floorsTo,
    @TypesDyn=@types
    
    RETURN`;
   
    reqSql.query(query,async(err,recordset)=>{
        if(err){
            console.log('err',err.originalError?.message)
            return;
        }
    })
}


module.exports={
    loginProcedure,
    createUserProcedure,
    logoutProcedure,
    getUserByIDProcedure,
    updateUserProcedure,
    addPostProcedure,
    getTop5PostsProcedure
}
