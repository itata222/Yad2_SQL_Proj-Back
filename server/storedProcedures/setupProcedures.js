const {sql} = require("../db/db");


function createUsersTableProcedure(){
    const reqSql= new sql.Request();
    const query=`
    CREATE PROCEDURE create_users_table
    AS
    create table tblUsers(
        userID int PRIMARY KEY NOT NULL,
        email nvarchar(50),
        password nvarchar(50)
    )
    RETURN`;
    reqSql.query(query,async(err,recordset)=>{
        if(err){
            console.log('err',err.originalError.message)
            return;
        }
    })
}

function createTokensTableProcedure(){
    const reqSql= new sql.Request();
    const query=`
    CREATE PROCEDURE create_tokens_table
    AS
    create table tblTokens(
        token nvarchar(200),
        userID int FOREIGN KEY REFERENCES tblUsers(userID)
    )
    RETURN`;
    reqSql.query(query,async(err,recordset)=>{
        if(err){
            console.log('err',err.originalError.message)
            return;
        }
    })
}

function createPostsTableProcedure(){
    const reqSql= new sql.Request();
    const query=`
    CREATE PROCEDURE create_posts_table
    AS
    create table tblPosts (
        postID int identity(1,1) NOT NULL Primary key,
        userID int FOREIGN KEY REFERENCES tblUsers(userID) NOT Null ,
        propType nvarChar(50),
        condition nvarchar(50),
        city nvarchar(50),
        street nvarChar(50),
        houseNumber int,
        floor int,
        floorsInBuilding int,
        onBars BIT not null,
        neighborhood nvarchar(50) default '',
        area nvarchar(50) default '',
        rooms int CHECK (rooms>=0 And rooms<=12),
        parking int CHECK (parking>=0 And parking<=3),
        balcony int CHECK (balcony>=0 And balcony<=3),
        airCondition BIT not null,
        mamad BIT not null,
        warehouse BIT not null,
        pandor BIT not null,
        furnished BIT not null,
        accessible BIT not null,
        elevator BIT not null,
        tadiran BIT not null,
        remaked BIT not null,
        kasher BIT not null,
        sunEnergy BIT not null,
        bars BIT not null,
        photosLength Int,
        video nvarchar(50),
        description nvarchar(50),
        buildMr int,
        totalMr int not null,
        price int,
        entryDate date,
        immidiate BIT,
        contactName nvarchar(50),
        contactPhone nvarchar(50),
        contactEmail nvarchar(50),
        creationDate datetime 
    )
    RETURN`;
    reqSql.query(query,async(err,recordset)=>{
        if(err){
            console.log('err',err.originalError.message)
            return;
        }
    })
}

function createPhotosTableProcedure(){
    const reqSql= new sql.Request();
    const query=`
    CREATE PROCEDURE create_photos_table
    AS
    create table tblPhotos(
        postID int FOREIGN KEY REFERENCES tblPosts(postID) NOT Null ,
        photo nvarchar(200)
    )
    RETURN`;
    reqSql.query(query,async(err,recordset)=>{
        if(err){
            console.log('err',err.originalError.message)
            return;
        }
    })
}

module.exports={
    createUsersTableProcedure,
    createTokensTableProcedure,
    createPostsTableProcedure,
    createPhotosTableProcedure
}