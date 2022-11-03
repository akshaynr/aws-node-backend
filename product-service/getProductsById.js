'use strict';
const { query } = require('./utils/dynamo-query.js');
const { INTERNAL_SERVER_ERROR, NOT_FOUND}  = require('./error.js');
const { HEADERS } = require('./constants.js');

exports.getProductById = async (event) => {
  let response = {
    headers: HEADERS
  };

  try{
    console.log('[Get Products List By ID] request, event:', event);
    const { productId } = event.pathParameters;
    const productData = await query(process.env.TABLE_NAME, productId);
    if(productNotAvailable(productData)){
      response = {
        ...response,
        statusCode: NOT_FOUND.statusCode,
        body: JSON.stringify(NOT_FOUND)
      }
    } else{
      response = {
        ...response,
        statusCode: 200,
        body: JSON.stringify(productData)
      }
    }
  } catch(error){
    console.log('[Error Get Products List By ID]', error);
    response = {
      ...response,
      statusCode: INTERNAL_SERVER_ERROR.statusCode,
      body: JSON.stringify(INTERNAL_SERVER_ERROR)
    }
    
  }
  return response;
};

const productNotAvailable = (product) => {
  return !product.length;
} 
