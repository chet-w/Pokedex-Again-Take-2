import React, { Component } from 'react';
import { Text, Image, Dimensions } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Content, List, ListItem, View, Container, Accordion } from 'native-base';
import Pokedex from "pokedex-promise-v2";


import { MaterialIndicator } from 'react-native-indicators';


import PageHeader from '../components/page-header.js';

export default class Berry extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: this.props.navigation.getParam('name', 'test'),
            data: {},
            loading: false
        }
    }

    static navigationOptions = {
        drawerLabel: () => null
    }

    pokedex = new Pokedex();

    render() {

        const content = (
            <List>
                <ListItem itemDivider><Text>SPRITES</Text></ListItem>
                
                <ListItem itemDivider><Text>TYPING</Text></ListItem>
                
                <ListItem itemDivider><Text>ABILITIES</Text></ListItem>
               
                <ListItem itemDivider><Text>HEIGHT & WEIGHT</Text></ListItem>
                
                
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


