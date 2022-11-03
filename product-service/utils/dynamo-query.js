const { getDynamoDBConnection } = require('../db/db-connect.js');

const scan = async(table_name) => {
    try{
        console.log(table_name);
        const scanResults = await getDynamoDBConnection().scan({
            TableName: table_name
        }).promise();
        return scanResults.Items;
    } catch(error){
        console.log(error);
    }
}

const query = async(table_name, id) => {
    try{
        const queryResults = await getDynamoDBConnection().query({
            TableName: table_name,
            KeyConditionExpression: 'id = :id',
            ExpressionAttributeValues : { ':id' : id }
        }).promise();
        return queryResults.Items;
    } catch(error){
        console.log(error);
    }
}

const post = async(table_name, item) => {
    try{
        const postResults = await getDynamoDBConnection().put({
            TableName: table_name,
            Item: item
        }).promise();
        return postResults;
    } catch(error){
        console.log(error);
    }
}

module.exports = { scan, query, post };