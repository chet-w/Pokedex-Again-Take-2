import React from 'react';
import { Dimensions, Image } from 'react-native';

import { Container, Content, Button, Text, List, ListItem, Item, Label, Input, H2 } from 'native-base';
import PageHeader from '../components/page-header.js';
import { getMachineFromName } from '../components/getMachines.js'
import { MaterialIndicator } from 'react-native-indicators'
import Pokedex from "pokedex-promise-v2";

export default class Machine extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: this.props.navigation.getParam('name', 'test'),
            data: {},
            loading: true
        };
    }

    componentDidMount(){
        this.getData();
    }

    static navigationOptions = {
        drawerLabel: () => null
    }

    pokedex = new Pokedex();

    getData() {
        const machine = getMachineFromName(this.state.name)
        console.log(machine);
        this.setState({
           data: {
               id: machine.id,
               name: machine.name,
               type: machine.type,
               power: machine.power,
               pp: machine.pp,
               accuracy: machine.accuracy,
               description: machine.description
           },
           loading: false 
        });
    }

    render() {
        const path = `https://raw.githubusercontent.com/chet-w/Pokedex-Again-Take-2/master/images/types/${this.state.data.type}.png`;
        const width = (Dimensions.get("window").width * 0.9) / 2
        const content = (
            <List>
                <ListItem itemDivider><Text>TYPE</Text></ListItem>
                <Image source={{uri: path}} style={{height: width, width: width, marginLeft: width/2}} />
                <ListItem itemDivider><Text>NUMBER</Text></ListItem>
                <ListItem><Text>TM{this.state.data.id}</Text></ListItem>
                <ListItem itemDivider><Text>DESCRIPTION</Text></ListItem>
                <ListItem><Text>{this.state.data.description}</Text></ListItem>
                <ListItem itemDivider><Text>POWER</Text></ListItem>
                <ListItem><Text>{this.state.data.power}</Text></ListItem>
                <ListItem itemDivider><Text>POWER POINTS</Text></ListItem>
                <ListItem><Text>{this.state.data.pp}</Text></ListItem>
                <ListItem itemDivider><Text>ACCURACY</Text></ListItem>
                <ListItem><Text>{this.state.data.accuracy}%</Text></ListItem>
            </List>
        )

        const loading = (
            <MaterialIndicator color="red" />
        )

        let result = <Text>Didnt run</Text>

        if (this.state.loading) {
            result = loading;
        } else {
            result = content;
        }

        return (
            <Container>
                <PageHeader title={this.state.name} navigation={this.props.navigation} />
                <Content>
                    {result}
                </Content>
            </Container>
        );
    }
}


