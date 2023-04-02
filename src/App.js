import React from "react";
import ContentLayout from "@cloudscape-design/components/content-layout";
import Header from "@cloudscape-design/components/header";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import MercuryLogo from "./resources/FullLogo_Transparent_NoBuffer.png"
import Box from "@cloudscape-design/components/box"

import { Authenticator, Grid } from "@aws-amplify/ui-react"
import '@aws-amplify/ui-react/styles.css';
import { Amplify, Auth } from 'aws-amplify';
import AddAddressModal from "./Components/AddAddressModal";
import ProfileModal from "./Components/ProfileModal";
import CompanyModal from "./Components/CompanyModal";
import awsconfig from './aws-exports';
import './App.css';
import Dashboard from "./Components/Dashboard";

Amplify.configure(awsconfig);
class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Authenticator>
        {({ signOut, user }) => {

          //user = await Amplify.Auth.currentAuthenticatedUser();
          const token = user.signInUserSession.idToken.jwtToken;
          console.log(token);

          return (
            <div className="App">
              <ContentLayout
                header={
                  <SpaceBetween size="m">
                    <Header
                      variant="h1"
                      actions={
                        <Box padding="xxl">
                          <SpaceBetween direction="horizontal" size="xs">
                            <Button variant="primary" iconName="user-profile-active">Profile</Button>
                            <Button onClick={signOut}>Sign out</Button>
                          </SpaceBetween>
                        </Box>
                      }
                    >
                      <div className="Logo-Container">
                        <img src={MercuryLogo} className="Logo-Image" alt="logo" />
                      </div>
                    </Header>
                  </SpaceBetween>
                }
              >
                <Dashboard></Dashboard>

              </ContentLayout>

            </div>
          )
        }}
      </Authenticator>
    );
  }
}

export default App
