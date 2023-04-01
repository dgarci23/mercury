import * as React from "react";
import Container from "@cloudscape-design/components/container";
import Header from "@cloudscape-design/components/header";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import Modal from "@cloudscape-design/components/modal"
import Box from "@cloudscape-design/components/box";
import Form from "@cloudscape-design/components/form";
import FormField from "@cloudscape-design/components/form-field";
import Input from "@cloudscape-design/components/input";




class CurrentAddressComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visible : false,
            name: "Home Address",
            streetAddress1: "10124 Benham Dr",
            streetAddress2: "",
            city: "Dayton ",
            USstate: "Ohio",
            zipCode: "45458",
            
        }
    }

    resetState() {
        this.setState({
        name: "", 
        streetAddress1: "", 
        streetAddress2: "",
        city: "",
        USstate: "",
        zipCode: "",})
    }

    setVisible(value){
        this.setState({visible: value})
    }
    
    render(){
        return (
            <Container
                header={
                    <Header
                        variant="h1"
                        actions={<Button onClick={()=>{this.setVisible(true)}}>Edit</Button>}
                    >
                            Current Address :
                    </Header>
    
                }
            >
                <Container>
                    <SpaceBetween direction="vertical" size="s">
                        <Header variant="h2">Street: </Header>
                        <p>
                            {this.state.streetAddress1}    {this.state.streetAddress2}
                        </p>
                        <Header variant="h2">City:</Header>
                        {this.state.city}
                        <Header variant="h2">State:</Header>
                        {this.state.USstate}
                        <Header variant="h2">Zip Code:</Header>
                        {this.state.zipCode}
 
                    </SpaceBetween>
                    
                </Container>

                <Modal
                    onDismiss={() => this.setVisible(false)}
                    closeAriaLabel="Close modal"
                    visible={this.state.visible}
                    footer={
                        <Box float="right">
                            <SpaceBetween direction="horizontal" size="xs">
                                <Button variant="link"
                                    onClick={()=>{
                                        this.setVisible(false)
                                    }}
                                >Cancel</Button>
                                <Button variant="primary"
                                    onClick={()=>{
                                        this.setVisible(false)
                                    }}
                                >Ok</Button>
                            </SpaceBetween>
                        </Box>
                    }
                    header="Edit Address"
                >
                    <form onSubmit={e => e.preventDefault()}>
                        <Form>
                            <Container>
                                <SpaceBetween direction="vertical" size="l">
                                    <FormField label="Name">
                                        <Input
                                            onChange={({ detail }) => this.setState({name:detail.value})}
                                            value={this.state.name}
                                        />
                                    </FormField>
                                    <FormField label="Street Address 1">
                                        <Input
                                            onChange={({ detail }) => this.setState({streetAddress1:detail.value})}
                                            value={this.state.streetAddress1}
                                        />
                                    </FormField>
                                    <FormField label="Street Address 2">
                                        <Input
                                            onChange={({ detail }) => this.setState({streetAddress2:detail.value})}
                                            value={this.state.streetAddress2}
                                        />
                                    </FormField>
                                    <FormField label="City">
                                        <Input
                                            onChange={({ detail }) => this.setState({city:detail.value})}
                                            value={this.state.city}
                                        />
                                    </FormField>
                                    <FormField label="State">
                                        <Input
                                            onChange={({ detail }) => this.setState({USstate:detail.value})}
                                            value={this.state.USstate}
                                        />
                                    </FormField>
                                    <FormField label="Zip Code">
                                        <Input
                                            onChange={({ detail }) => this.setState({zipCode:detail.value})}
                                            value={this.state.zipCode}
                                        />
                                    </FormField>
                                </SpaceBetween>
                            </Container>
                        </Form>
                    </form>
    
                </Modal>
            </Container>
    
        );
    }
    
}

export default CurrentAddressComponent