import { useState } from "react";
import Header from "@cloudscape-design/components/header";
import Container from "@cloudscape-design/components/container";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Input from "@cloudscape-design/components/input";
import Button from "@cloudscape-design/components/button";
import { ColumnLayout } from "@cloudscape-design/components";
import AddAdressModal from "./AddAdressModal";

export default function App() {
  const [value, setValue] = useState("");



  return (
    <SpaceBetween size="m">
      <Container>
        <ColumnLayout columns={2}>
        <div>        
          {/* put logo here */}
          <Header variant="h1">Mercury</Header>
        </div>
        <div >
          <Button style="profile-button" iconAlign="right" iconName="user-profile-active" variant="icon"/>
        </div>
        <div>
          <Header variant="h5">the one stop shop for shipping adresses</Header>
        </div>
        </ColumnLayout>

      </Container>

      <Container>
        <SpaceBetween size="s">
          <span>Start editing to see some magic happen</span>
          <Input
            value={value}
            onChange={(event) => setValue(event.detail.value)}
          />
          <Button variant="primary">Click me</Button>
          <Button variant="primary">Button</Button>
          <AddAdressModal></AddAdressModal>
        </SpaceBetween>
      </Container>
    </SpaceBetween>
  );
}
