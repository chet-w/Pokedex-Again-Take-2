import React from 'react';
import { StyleSheet } from 'react-native';

import { Container, Content, Button, Text, H1, Form, Item, Label, Input, H2 } from 'native-base';
import PageHeader from '../components/page-header.js';
import CardListItem from '../components/card-list-item.js';
import { getAllMachines } from '../components/getMachines.js'

export default class MachinesSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            preamble: `Type the name of a TM or HM to get some more information about it. \n\nOr browse a list of all the Machines if you're stuck.`,
            suggested: getAllMachines().slice(0, 10)
        }
        
    }

    static navigationOptions = {
        drawerLabel: 'Machines',
        headerTitle: 'Machines',
    };

    render() {

        const suggestions = this.state.suggested.map(el => {
            return (
                <CardListItem click={"machine"} name={el.name} key={el.name} />
            )
        });
        

        const handleInput = (text) => {
            const all = getAllMachines();

            if (text === "") {
                this.setState({
                    suggested: all.slice(0, 10)
                });
            } else {
                let filtered = all.filter(move => {
                    return (move.name.toLowerCase().indexOf(text.toLowerCase()) > -1);
                });
                if (filtered.length > 10) {
                    filtered = filtered.slice(0, 10);
                }
                this.setState({
                    suggested: filtered
                })
            }
        }

        const openMachineListPage = () => {
            this.props.navigation.navigate('MachineListPage');
        }

        return (
            <Container>
                <PageHeader title="Machines" navigation={this.props.navigation} />
                <Content padder>
                    <H1>Browse Machines</H1>
                    <Text>
                        {this.state.preamble}
                    </Text>
                    <Button onPress={openMachineListPage} style={{marginTop: 40}}><Text>List of all Machines</Text></Button>
                    
                    <Form>
                        <Item floatingLabel>
                            <Label>Machine Name</Label>
                            <Input onChangeText={(text) => handleInput(text)} />
                        </Item>
                    </Form>

                    <Container padder>
                        {suggestions}
                    </Container>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        marginBottom: '20'
    }
});

