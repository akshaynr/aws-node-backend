const AWS = require('aws-sdk');

const getDynamoDBConnection = () => {
    const DYNAMO = new AWS.DynamoDB.DocumentClient();
    return DYNAMO;
}

module.exports = { getDynamoDBConnection };