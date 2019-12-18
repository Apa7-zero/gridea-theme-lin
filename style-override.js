const generateOverride = (params = {}) => {
  let result = ''

  
  if (params.indeximg && params.indeximg !== '') {
    result += `
    .header {background-image: url(${params.indeximg});}
    .index-img{ background-image: url(${params.indeximg});}
    `
  }
  if (params.postimg && params.postimg !== '') {
    result += `
    .index-list-img{background-image: url(${params.postimg});}
    .archives-img{ background-image: url(${params.indeximg});}
    `
  }

  if (typeof params.valine !== 'undefined' && !params.valine) {
    result += `
      .v {
        display: none;
      }
    `
  }

  console.log('result', result)

  return result
}

module.exports = generateOverride