const AWS =  require('aws-sdk');


exports.handler = (event, context, callback) => {
  
  console.log("LOG");
  console.log(event);

  // DynamoDB configuration
  AWS.config.update({ region: process.env.TABLE_REGION });
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  let tableName = "users";

  if (process.env.ENV && process.env.ENV !== "NONE") {
    tableName = tableName + '-' + process.env.ENV;
  }

  // DynamoDB put parameters
  const putItemParams = {
    TableName: tableName,
    Item: {
      userId: event.userName,
      name: event.request.userAttributes.name,
      phone: event.request.userAttributes.phone_number,
      email: event.request.userAttributes.email
    }
  }

  // DynamoDB put request
  dynamodb.put(putItemParams, (err, data) => {
    if (err) {
      console.log(`Unsuccessfull Put: ${err}`)
      callback(null, event);
    } else {
      console.log("Successfull Put");
      callback(null, event);
    }
  });

  callback(null, event);
};