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


// GET /user/:userId, retrieve user information (userId, name, phone, email)
app.get('/user/:userId', function(req, res) {

    if (req.apiGateway.event.requestContext.authorizer.claims["cognito:username"] !== req.params.userId) {
        res.statusCode = 401;
        return res.json({error: 'Wrong User'});
    }

    let searchParams = {
        TableName: userTableName,
        Key: {
            userId: req.params.userId
        }
    }

    dynamodb.get(searchParams, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500);
            res.json({error: 'Could not load items: ' + err});
        } else {
            const user = {
                userId: data.Item.userId,
                name: data.Item.name,
                email: data.Item.email,
                phone: data.Item.phone
            }
            res.status(200);
            res.json({response: JSON.stringify(user)});
        }
    });
});

app.put('/user/:userId', function(req, res) {

    if (req.apiGateway.event.requestContext.authorizer.claims["cognito:username"] !== req.params.userId) {
        res.statusCode = 401;
        return res.json({error: 'Wrong User'});
    }

    let putItemParams = {
        TableName: userTableName,
        Key: {
            "userId": req.params.userId
        },
        UpdateExpression: "SET #n = :n, #p = :p, #e = :e",
        ExpressionAttributeValues: {
            ":n": req.headers.name,
            ":p": req.headers.phone,
            ":e": req.headers.email
        },
        ExpressionAttributeNames: {
          "#n": "name",
          "#e": "email",
          "#p": "phone"
        }
    };

    dynamodb.update(putItemParams, (err, data) => {
        if (err) {
        console.log(err);
        res.statusCode = 500;
        res.json({error: "Could not update the user."});
        } else {
        res.json({success: 'User updated.'});
        }
    });
});

app.get('/user/address/:userId', function(req, res) {

    if (req.apiGateway.event.requestContext.authorizer.claims["cognito:username"] !== req.params.userId) {
        res.statusCode = 401;
        return res.json({error: 'Wrong User'});
    }

    let searchParams = {
        TableName: userTableName,
        Key: {
            userId: req.params.userId
        }
    }

    dynamodb.get(searchParams, (err, data)=>{
        if (err) {
            console.log(err);
            res.status(500);
            res.json({error: 'Could not load items'});
        } else {
            res.status(200);
            res.json({response: JSON.stringify(data.Item.address)});
        }
    })
});

/*app.post('/user/address/:userId', function(req, res) {

    if (req.apiGateway.event.requestContext.authorizer.claims["cognito:username"] !== req.params.userId) {
        res.statusCode = 401;
        return res.json({error: 'Wrong User'});
    }

    res.json({response: req.apiGateway.event.requestContext.authorizer.claims["cognito:username"]});
});*/

app.put('/user/address/:userId', function(req, res) {

    if (req.apiGateway.event.requestContext.authorizer.claims["cognito:username"] !== req.params.userId) {
        res.statusCode = 401;
        return res.json({error: 'Wrong User'});
    }

    const newAddress = {
        addressLine1: req.headers.addressline1,
        addressLine2: req.headers.addressline2,
        city: req.headers.city,
        state: req.headers.state,
        zip: req.headers.zip
    }

    let putItemParams = {
        TableName: userTableName,
        Key: {
            "userId": req.params.userId
        },
        UpdateExpression: "SET address = :newAddress",
        ExpressionAttributeValues: {
            ":newAddress": newAddress
        }
    };

    dynamodb.update(putItemParams, (err, data) => {
        if (err) {
        console.log(err);
        res.statusCode = 500;
        res.json({error: "Could not update the address."});
        } else {
        res.json({success: 'Address updated.'});
        }
    });

});

app.listen(3000, function() {
    console.log("App started");
});  

module.exports =  app