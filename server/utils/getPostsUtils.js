const getParamStrFromArr = (arr) => {
    let arrStr = null;
    if (arr.length>0) {
      arrStr = "";
      for (const item of arr) arrStr += item.trim().replace("'","") + ",";
      if(arrStr[arrStr.length-1]===",")
          arrStr=arrStr.slice(0,-1)
    }
    return arrStr;
  };

  const optionalStr = (str) => (!!str ? `'${str}'` : null);

  const getAppartmentPropertiesFromObject=(obj)=>{   
    let propSqlQuery='';  
    const queryAsArray = Object.entries(obj);
    const queryFilteredOnlyToBooleans = queryAsArray.filter(([key, value]) => typeof value=='boolean'&&key!=='withImage'&&key!=='immidiate');
    queryFilteredOnlyToBooleans.map((prop,i)=>{
        i===queryFilteredOnlyToBooleans.length-1?
        propSqlQuery=propSqlQuery.concat(prop[1]===true?`${prop[0]}=1`:``):
        propSqlQuery=propSqlQuery.concat(prop[1]===true?`${prop[0]}=1 AND `:``)
    })
    if(propSqlQuery.substr(propSqlQuery.length - 4).includes('AND'))
        propSqlQuery=propSqlQuery.substr(0,propSqlQuery.length-4)
    return propSqlQuery;
  }

  const getFinalPosts=(posts,photos,onlyWithImage)=>{
    let hasMore=true;
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
      hasMore=false;
    const finalPosts=posts;
      return {finalPosts,hasMore};
  }
  
  module.exports={
    getParamStrFromArr,
    optionalStr,
    getAppartmentPropertiesFromObject,
    getFinalPosts
  }