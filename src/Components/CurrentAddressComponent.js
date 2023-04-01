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
import { Amplify } from 'aws-amplify';





class CurrentAddressComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visible : false,
            name: "",
            streetAddress1: "",
            streetAddress2: "",
            city: " ",
            USstate: "",
            zipCode: "",
           
        }
        this.savedState = {
            name: "",
            streetAddress1: "",
            streetAddress2: "",
            city: "",
            USstate: "",
            zipCode: "",
        }
    }

    path = "https://ebxzjgbuwa.execute-api.us-east-1.amazonaws.com/dev"

    async getUserData() {
        const user = await Amplify.Auth.currentAuthenticatedUser();
        const token = user.signInUserSession.idToken.jwtToken;
        fetch(`${this.path}/user/address/${user.username}`, {method:"GET", headers:{Authorization:token}})
                .then(response => response.json())
                .then(data => { this.setState({
                    ...this.state,
                    streetAddress1: data.streetAddress1,
                    streetAddress2: data.streetAddress2,
                    city: data.city,
                    USstate: data.state,
                    zipCode: data.zip,
        
                });});
    }

    async updateStatus(){
        const user = await Amplify.Auth.currentAuthenticatedUser();
        const token = user.signInUserSession.idToken.jwtToken;
        await fetch(`${this.path}/user/address/${user.username}`,
            {method:'PUT', headers: {
                Authorization:token, 
                addressLine1 : this.state.streetAddress1,
                addressLine2 : this.state.streetAddress2 ,
                city : this.state.city,
                state : this.state.USstate,
                zip : this.state.zipCode 
            }
            }
        )
    }

    // resets  the address lines to what is on the database
    resetState() {
        this.setState({
            name : this.savedState.name,
            streetAddress1 : this.savedState.streetAddress1,
            streetAddress2 : this.savedState.streetAddress2 ,
            city : this.savedState.city,
            USstate : this.savedState.USstate,
            zipCode : this.savedState.zipCode
        })


    }

    // pushes the current address to the database
    pushState() {
        this.savedState = this.state
        this.updateStatus()
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
                        actions={<Button onClick={()=>{
                            this.setVisible(true)
                        }}>Edit</Button>}
                    >
                            Current Address :
                    </Header>
    
                }
            >
                <Container>
                    <SpaceBetween direction="vertical" size="s">
                        <Header variant="h2">Street: </Header>
                        <p>
                            {this.savedState.streetAddress1}    {this.savedState.streetAddress2}
                        </p>
                        <Header variant="h2">City:</Header>
                        {this.savedState.city}
                        <Header variant="h2">State:</Header>
                        {this.savedState.USstate}
                        <Header variant="h2">Zip Code:</Header>
                        {this.savedState.zipCode}
 
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
                                        this.resetState()
                                    }}
                                >Cancel</Button>
                                <Button variant="primary"
                                    onClick={()=>{
                                        this.setVisible(false)
                                        this.pushState()
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