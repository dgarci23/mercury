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
      companyList: [
        {
          label: "Amazon",
          value: "1",
        },
        {
          label: "Chewy",
          value: "2",
        },
        {
          label: "Blue Apron",
          value: "3",
        },
        {
          label: "BloomsyBox",
          value: "4",
        },
        {
          label: "Dollar Shave Club",
          value: "5",
        }
      ],
    
      selectedOptions: []
    }
      
  }


  setVisible(value) {
    this.setState({ visible: value })
  }

  setSelectedOptions(value){
    this.setState({ selectedOptions: value})
  }
  
  render() {
    return (
      <Container
        header={
          <Header
            variant="h2"
            actions={
              <Button onClick={() => { this.setVisible(true) }}
                >
                Manage Companies
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
                <Button variant="link" onClick={() => this.setVisible(false)}>Cancel</Button>
                <Button variant="primary" onClick={() => this.setVisible(false)
                }>Ok</Button>
              </SpaceBetween>
            </Box>
          }
          header={
            <Header
              variant="h1"
              className="comp-modal"
            >
              Manage Companies
            </Header>
          }
        >
          <Multiselect
                  selectedOptions={this.state.selectedOptions}
                  onChange={
                    ({ detail }) =>this.setSelectedOptions(detail.selectedOptions)
                  }
                  deselectAriaLabel={e => `Remove ${e.label}`}
                  options={this.state.companyList}
                  hideTokens
                  placeholder="Choose options"
                  selectedAriaLabel="Selected"
                />
        </Modal>
      </Container>
    );
  }
}

export default CompanyModal
