import React, { Component } from 'react';
import { Text } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Content, List, ListItem, View, Container } from 'native-base';
// import * as request from 'request';
// import * as cheerio from 'cheerio';
import * as pk from 'pokemon';
import { MaterialIndicator } from 'react-native-indicators';
// import * as find from 'cheerio-eq';

import PageHeader from '../components/page-header.js';




class Pokemon extends Component {

    static navigationOptions = {
        drawerLabel: () => null
    }

    constructor(props) {
        super(props);
        this.state = {
            name: this.removeQuotes(JSON.stringify(this.props.navigation.getParam('name', 'test'))),
            sprite: "test",
            loading: true
        }
        this.getData();
        // setTimeout(() => {
        //     this.setState({
        //         loading: false
        //     })
        // }, 3000);
        
    }

    removeQuotes(string) {
        return string.substr(1, string.length - 2)
    }

    getData() {
        const id = pk.getId(this.state.name);
        
        // request('https://www.serebii.net/pokedex-bw/' + id + '.shtml', (error, response, html) => {
        //     if(!error && response.statusCode == 200){
        //         const $ = cheerio.load(html);
        //         const prefix = "https://www.serebii.net";

        //         const sprites = find($, ".dextable img:eq(0)").attr("src");

        //         this.setState({
        //             sprite: sprites
        //         });
        //     }
        // });
    }

    render() {

        const content = (
            <List>
                <ListItem itemHeader>
                    <Text>Sprites</Text>
                </ListItem>
                <ListItem><Text>{this.state.sprite}</Text></ListItem>
                <ListItem itemHeader>
                    <Text>Typing</Text>
                </ListItem>
                <ListItem itemHeader>
                    <Text>Abilities</Text>
                </ListItem>
                <ListItem itemHeader>
                    <Text>Height & Weight</Text>
                </ListItem>
                <ListItem itemHeader>
                    <Text>Held Items</Text>
                </ListItem>
                <ListItem itemHeader>
                    <Text>Evolutions</Text>
                </ListItem>
                <ListItem itemHeader>
                    <Text>Moves</Text>
                </ListItem>
                <ListItem itemHeader>
                    <Text>Stats</Text>
                </ListItem>
            </List>
        )

        const loading = (
            <MaterialIndicator color="red"/>
        )

        let result = <Text>Didnt run</Text>

        if(this.state.loading){
            result = loading;
        }else{
            result = content;
        }

        return (
            <Container>
                <PageHeader title={this.state.name} navigation={this.props.navigation} />
                <Content>
                    {result}
                </Content>
            </Container>
        )
    }
}

export default withNavigation(Pokemon);