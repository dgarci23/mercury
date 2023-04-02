import * as React from "react";
import Container from "@cloudscape-design/components/container";
import Modal from "@cloudscape-design/components/modal";
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import { Header } from "@cloudscape-design/components";
import Multiselect from "@cloudscape-design/components/multiselect";
import Table from "@cloudscape-design/components/table";
import { Amplify } from 'aws-amplify';
import Input from "@cloudscape-design/components/input";
import FormField from "@cloudscape-design/components/form-field";



class CompanyModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      companies: [],
      selectedItems: [],
      companyName: "" 
    }

  }

  componentDidMount() {
    this.getCompanies();
  }


  setVisible(value) {
    this.setState({ visible: value })
  }

  setSelectedItems(value) {
    this.setState({ selectedItems: value })
  }

  path = "https://ebxzjgbuwa.execute-api.us-east-1.amazonaws.com/dev"
  async getCompanies() {
    const user = await Amplify.Auth.currentAuthenticatedUser();
    const token = user.signInUserSession.idToken.jwtToken;
    fetch(`${this.path}/user/company/${user.username}`,
      { method: "GET", headers: { Authorization: token } })
      .then(response => response.json())
      .then(data => {
        data = data.response;
        const companies = [];
        for (let key in data){
          console.log(key);
          console.log(data[key]);
          if (data[key]) {
            companies.push({name:key});
          }
        }
        console.log(companies);
        this.setState({ companies: companies });
      });
  }

  async addCompany(companyName) {
    const user = await Amplify.Auth.currentAuthenticatedUser();
    const token = user.signInUserSession.idToken.jwtToken;
    fetch(`${this.path}/user/company/${user.username}?company=${companyName}`,
      { method: "PUT", headers: { Authorization: token } })
      .then(()=>this.getCompanies());
  }



  render() {
    return (
      <div>
        <Table
          onSelectionChange={({ detail }) =>
            this.setSelectedItems(detail.selectedItems)
          }
          selectedItems={this.state.selectedItems}
          ariaLabels={{
            selectionGroupLabel: "Items selection",
            allItemsSelectionLabel: ({ selectedItems }) =>
              `${selectedItems.length} ${selectedItems.length === 1 ? "item" : "items"
              } selected`,
            itemSelectionLabel: ({ selectedItems }, item) => {
              const isItemSelected = selectedItems.filter(
                i => i.name === item.name
              ).length;
              return `${item.name} is ${isItemSelected ? "" : "not"
                } selected`;
            }
          }}
          columnDefinitions={[
            {
              id: "companyId",
              header: "Company Name",
              cell: e => e.name,
              sortingField: "name"
            },
          ]}
          items={this.state.companies}
          loadingText="Loading resources"
          selectionType="multi"
          trackBy="name"
          visibleColumns={["companyId"]}
          empty={
            <Box textAlign="center" color="inherit">
              <b>No Companies</b>
              <Box
                padding={{ bottom: "s" }}
                variant="p"
                color="inherit"
              >
                No Companies are Active.
              </Box>
            </Box>
          }
          header={
            <Header
              variant="h1"
              actions={
                <Button onClick={() => {
                  this.setVisible(true)
                }}>Add Company</Button>
              }
            >
              Selected Companies <br></br>

            </Header>
          }
        />


        {/* ik modal shouldnt be here but time */}
        <Modal
          onDismiss={() => this.setVisible(false)}
          visible={this.state.visible}
          closeAriaLabel="Close modal"
          footer={
            <Box float="right">
              <SpaceBetween direction="horizontal" size="xs">
                <Button variant="link" onClick={() => {
                  this.setVisible(false)
                  this.setState({companyName:""})
                }}>Cancel</Button>

                <Button variant="primary" onClick={() => {
                  this.setVisible(false)
                  this.addCompany(this.state.companyName)
                  this.setState({companyName:""})
                }}>Add</Button>
              </SpaceBetween>
            </Box>
          }
          header="Add a Company"
        >
            <Input value={this.state.companyName} onChange={({ detail }) => this.setState({companyName:detail.value})}/>
        </Modal>
      </div>
    );
  }
}

export default CompanyModal
