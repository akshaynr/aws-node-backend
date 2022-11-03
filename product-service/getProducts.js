'use strict';
const { scan } = require('./utils/dynamo-query.js');
const { HEADERS } = require('./constants.js');
const { INTERNAL_SERVER_ERROR }  = require('./error.js');

exports.getProductsList = async (event) => {
  console.log('[Get Products List] request, event:', event);
  let response = {
    headers: HEADERS
  };

  try{
    const productData = await scan(process.env.TABLE_NAME);
    response = {
      ...response,
      statusCode: 200,
      body: JSON.stringify(productData)
    }
  } catch(error){
    console.log('Error:', error);
    response = {
      ...response,
      statusCode: INTERNAL_SERVER_ERROR.statusCode,
      body: JSON.stringify(INTERNAL_SERVER_ERROR)
    }
  }
  
  return response;
};
