'use strict';
const { post } = require('./utils/dynamo-query.js');
const { validateProductSchema } = require('./schema/product-schema.js');
const { v4: uuidv4 } = require('uuid'); 
const { HEADERS } = require('./constants.js');
const { INTERNAL_SERVER_ERROR, BAD_REQUEST }  = require('./error.js');


exports.createProduct = async (event) => {
  console.log('[Create Product] request, event:', event);
  let response = {
    headers: HEADERS,
    statusCode: 201
  }; 
  try{
    let productData;
    try{
        productData = await validateProductSchema(JSON.parse(event.body));
    } catch(error){
        response = {
            ...response,
            statusCode: BAD_REQUEST.statusCode,
            body: JSON.stringify(BAD_REQUEST)
        }
        return response;
    }
    console.log('Validated Product:', productData);
    productData.id = uuidv4();
    const result = await post(process.env.TABLE_NAME, productData);
    response = {
      ...response,
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
