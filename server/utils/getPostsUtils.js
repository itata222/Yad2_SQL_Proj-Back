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
      return propSqlQuery;
  }
  
  module.exports={
    getParamStrFromArr,
    optionalStr,
    getAppartmentPropertiesFromObject
  }