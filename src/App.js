import { useState } from "react";
import ContentLayout from "@cloudscape-design/components/content-layout";
import Container from "@cloudscape-design/components/container";
import Header from "@cloudscape-design/components/header";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Link from "@cloudscape-design/components/link";
import Button from "@cloudscape-design/components/button";
import Alert from "@cloudscape-design/components/alert";

export default function App() {
  const [value, setValue] = useState("");



  return (
    <ContentLayout
      header={
        <SpaceBetween size="m">
          <Header
            variant="h1"
            info={<Link>Info</Link>}
            description="This is a generic description used in the header."
            actions={
              <Button variant="primary">Button</Button>
            }
          >
            Header
          </Header>

          <Alert>This is a generic alert.</Alert>
        </SpaceBetween>
      }
    >
      <Container
        header={
          <Header
            variant="h2"
            description="Container description"
          >
            Container header
          </Header>
        }
      >
        Container content
      </Container>
    </ContentLayout>
  );
}
