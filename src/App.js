import { useState } from "react";
import ContentLayout from "@cloudscape-design/components/content-layout";
import Header from "@cloudscape-design/components/header";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import MercuryLogo from "./resources/FullLogo_Transparent_NoBuffer.png"

import { Authenticator } from "@aws-amplify/ui-react"
import '@aws-amplify/ui-react/styles.css';
import { Amplify, Auth } from 'aws-amplify';
import AddAddressModal from "./Components/AddAddressModal";
import ProfileModal from "./Components/ProfileModal";
import CompanyModal from "./Components/CompanyModal";
import awsconfig from './aws-exports';
import './App.css';
import ColumnLayout from "@cloudscape-design/components/column-layout";
import Contaier from "@cloudscape-design/components/container"
import Dashboard from "./Components/Dashboard";


Amplify.configure(awsconfig);

export default function App() {
  const [value, setValue] = useState("");


  return (
    <Authenticator>
      {({ signOut, user }) => {

        //user = await Amplify.Auth.currentAuthenticatedUser();
        const token = user.signInUserSession.idToken.jwtToken;
        //console.log(token);

        return (
          <div className="App">
            <ContentLayout
              header={
                <SpaceBetween size="m">
                  <Header
                    variant="h1"
                    actions={
                      <Button className="vertical-center" variant="primary" iconName="user-profile-active">Profile</Button>
                    }
                  >
                    <div className="Logo-Container">
                      <img src={MercuryLogo} className="Logo-Image" alt="logo" />
                    </div>


                  </Header>
                </SpaceBetween>
              }
            >
              <Contaier>
                <Dashboard></Dashboard>
              </Contaier>

            </ContentLayout>
            <button onClick={signOut}>Sign out</button>
          </div>
        )
      }}
    </Authenticator>
  );
}
