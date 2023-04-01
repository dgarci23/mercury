const AWS = require('aws-sdk')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const bodyParser = require('body-parser')
const express = require('express')

const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// DynamoDB configuration
AWS.config.update({ region: process.env.TABLE_REGION });
const dynamodb = new AWS.DynamoDB.DocumentClient();
let userTableName = "users";
let companyTableName = "companies";

if (process.env.ENV && process.env.ENV !== "NONE") {
    userTableName = userTableName + '-' + process.env.ENV;
    companyTableName = companyTableName + '-' + process.env.ENV;
}

// Enable CORS for all methods
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "*")
    next()
});

app.get('/user/:userId', function(req, res) {

    if (req.apiGateway.event.requestContext.authorizer.claims["cognito:username"] !== req.params.userId) {
        res.statusCode = 401;
        return res.json({error: 'Wrong User'});
    }

    res.json({response: req.apiGateway.event.requestContext.authorizer.claims["cognito:username"]});
});

app.put('/user/:userId', function(req, res) {

    if (req.apiGateway.event.requestContext.authorizer.claims["cognito:username"] !== req.params.userId) {
        res.statusCode = 401;
        return res.json({error: 'Wrong User'});
    }

    res.json({response: req.apiGateway.event.requestContext.authorizer.claims["cognito:username"]});
});

app.get('/user/address/:userId', function(req, res) {

    if (req.apiGateway.event.requestContext.authorizer.claims["cognito:username"] !== req.params.userId) {
        res.statusCode = 401;
        return res.json({error: 'Wrong User'});
    }



    res.json({response: req.apiGateway.event.requestContext.authorizer.claims["cognito:username"]});
});

app.post('/user/address/:userId', function(req, res) {

    if (req.apiGateway.event.requestContext.authorizer.claims["cognito:username"] !== req.params.userId) {
        res.statusCode = 401;
        return res.json({error: 'Wrong User'});
    }

    res.json({response: req.apiGateway.event.requestContext.authorizer.claims["cognito:username"]});
});

app.put('/user/address/:userId', function(req, res) {

    if (req.apiGateway.event.requestContext.authorizer.claims["cognito:username"] !== req.params.userId) {
        res.statusCode = 401;
        return res.json({error: 'Wrong User'});
    }

    res.json({response: req.apiGateway.event.requestContext.authorizer.claims["cognito:username"]});
});

app.listen(3000, function() {
    console.log("App started");
});  

module.exports =  app