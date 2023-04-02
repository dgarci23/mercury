import * as React from "react";
import Container from "@cloudscape-design/components/container";
import Modal from "@cloudscape-design/components/modal";
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import { Header } from "@cloudscape-design/components";
import Multiselect from "@cloudscape-design/components/multiselect";
import Table from "@cloudscape-design/components/table";


class CompanyModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      companyList: [
        {
          label: "Amazon",
        },
        {
          label: "Chewy",
        },
        {
          label: "Blue Apron",
        },
        {
          label: "BloomsyBox",
        },
        {
          label: "Dollar Shave Club",
        }
      ],

      selectedItems: []
    }

  }


  setVisible(value) {
    this.setState({ visible: value })
  }

  setSelectedItems(value) {
    this.setState({ selectedItems: value })
  }

  render() {
    return (
      

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
          items={[
            {
              name: "Item 1",
            },
            {
              name: "Item 2",
            },
            {
              name: "Item 3",
            },
            {
              name: "Item 4",
            },
            {
              name: "Item 5",
            },
            {
              name: "Item 6",
            }
          ]}
          loadingText="Loading resources"
          selectionType="multi"
          trackBy="name"
          visibleColumns={["companyId"]}
          empty={
            <Box textAlign="center" color="inherit">
              <b>No resources</b>
              <Box
                padding={{ bottom: "s" }}
                variant="p"
                color="inherit"
              >
                No resources to display.
              </Box>
              <Button>Create resource</Button>
            </Box>
          }
          header={
            <Header
              variant="h1"
            >
              Company Subscriptions <br></br>
  
            </Header>
          }        />

    );
  }
}

export default CompanyModal
