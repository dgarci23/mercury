# mercury

## Overview

Mercury aims to provide a simple solution to address management. It works as a link between clients and companies, where the user can update their current address without individually doing it for every single company. For the companies, this provides reliable information on the address of their customers.

## Technical Specifications

The technologies used to build the service are the following:
* **React**: provides the framework for the Front-End.
    * **Cloudscape**: UI React library.
* **API Gateway**: provides the different API routes and the levels of authentication for each of them.
    * **AWS Lambda**: handles the logic for each API route using **ExpressJS**.
* **Cognito**: provides user pool and authentication flows to securely sign in and sign up users.
* **DynamoDB**: NoSQL database to store the user information.
* **Amplify**: provides hosting for the Front-End and connectivity between different AWS services.

To better navigate the repository, here are some important files:

[React App](https://github.com/dgarci23/mercury/blob/main/src/App.js)

[API Lambda](https://github.com/dgarci23/mercury/blob/main/amplify/backend/function/mercuryApiLambda/src/app.js)

[Sign-Up Lambda](https://github.com/dgarci23/mercury/blob/main/amplify/backend/function/mercurySignupLambda/src/index.js)

