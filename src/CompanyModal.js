import * as React from "react";
import Container from "@cloudscape-design/components/container";
import Modal from "@cloudscape-design/components/modal";
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import { Header } from "@cloudscape-design/components";
import Multiselect from "@cloudscape-design/components/multiselect";

class CompanyModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
    }
  }

  setVisible(value) {
    this.setState({ visible: value })
  }
  
  render() {
    return (
      <Container
        header={
          <Header
            variant="h2"
            actions={
              <Button onClick={() => { this.setVisible(true) }}
                variant="primary">
                Manage
              </Button>}
          >
            Company Subscriptions <br></br>

          </Header>
        }

      >

        <Modal
          onDismiss={() => this.setVisible(false)}
          visible={this.state.visible}
          closeAriaLabel="Close modal"
          footer={
            <Box float="right">
              <SpaceBetween direction="horizontal" size="xs">
                <Multiselect
                  //selectedOptions={selectedOptions}
                  //onChange={({ detail }) =>setSelectedOptions(detail.selectedOptions)
                  //}
                  deselectAriaLabel={e => `Remove ${e.label}`}
                  options={[
                    {
                      label: "Amazon",
                      value: "1",
                      description: "Address: "
                    },
                    {
                      label: "Chewy",
                      value: "2",
                      description: "Address: "
                    },
                    {
                      label: "Blue Apron",
                      value: "3",
                      description: "Address: "
                    },
                    {
                      label: "BloomsyBox",
                      value: "4",
                      description: "Address: "
                    },
                    {
                      label: "Dollar Shave Club",
                      value: "5",
                      description: "Address: "
                    }
                  ]}
                  hideTokens
                  placeholder="Choose options"
                  selectedAriaLabel="Selected"
                />
                <Button variant="link">Cancel</Button>
                <Button variant="primary">Ok</Button>
              </SpaceBetween>
            </Box>
          }
          header={
            <Header
              variant="h1"
              className="comp-modal"
            >
              Subscriptions
            </Header>
          }
        >
        </Modal>
      </Container>
    );
  }
}

export default CompanyModal
