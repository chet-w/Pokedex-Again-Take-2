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
            data: {sprite: "", flavors: []},
            loading: true
        };
        this.getData();
    }

    static navigationOptions = {
        drawerLabel: () => null
    }
    pokedex = new Pokedex();

    getData(){
        let data = "";
        this.pokedex.getBerryByName(this.state.name.toLowerCase().substr(0, this.state.name.length - 6)).then(resp => {
            data = this.refineData(resp);
            this.setState({ data: data, loading: false });

        }).catch(err => {
            if (err) {
                console.log(err)
            }
        });
    }

    formatString(string) {
        let splitStr = string.toLowerCase().split('-');
        for (let i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        const formatted = splitStr.join(' ');
        return formatted;
    }

    refineData(json){
        const refined = {
            name: this.state.name,
            firmness: this.formatString(json.firmness.name),
            flavors: this.getFlavors(json.flavors),
            growthTime: json.growth_time,
            maxHarvest: json.max_harvest,
            naturalGiftType: this.formatString(json.natural_gift_type.name),
            naturalGiftPower: json.natural_gift_power,
            size: json.size,
            smoothness: json.smoothness,
            soilDryness: json.soil_dryness,
            sprite: this.getSprite(json.item.name),
        };
        return refined;
    }

    getSprite(name) {
        const prefix = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/";
        return `${prefix}${name}.png`;
    }

    getFlavors(json) {
        let flavors = [];
        json.forEach(el => {
            if(el.potency !== 0){
                flavors.push(el.flavor.name)
            }
        })
        return flavors;
    }



    render() {
        const showSprite = () => {
            if(!this.state.data.sprite){
                return(
                    <MaterialIndicator color="red" />
                )
            }else{
                const width = (Dimensions.get("window").width * 0.9)/3;
                return (
                    <Image source={{uri: this.state.data.sprite}} style={{width: width, height: width}} />
                )
            }            
        }

        const showFlavors = () => {
            if(!this.state.data.flavors){
                return(
                    <MaterialIndicator color="red" />
                )
            }else{
                let flavors = [];
                this.state.data.flavors.forEach(el => {
                    const flavor = (
                        <ListItem key={el}><Text>{this.formatString(el)}</Text></ListItem>
                    )
                    flavors.push(flavor);
                });
                return flavors;
            }
        }

        const content = (
            <List>
                <ListItem itemDivider><Text>SPRITES</Text></ListItem>
                {showSprite()}
                <ListItem itemDivider><Text>SIZE</Text></ListItem>
                <ListItem><Text>{this.state.data.size}mm</Text></ListItem>
                <ListItem itemDivider><Text>FLAVORS</Text></ListItem>
                {showFlavors()}
                <ListItem itemDivider><Text>FIRMNESS</Text></ListItem>
                <ListItem><Text>{this.state.data.firmness}</Text></ListItem>
                <ListItem itemDivider><Text>SMOOTHNESS</Text></ListItem>
                <ListItem><Text>{this.state.data.smoothness} levels of smooth</Text></ListItem>
                <ListItem itemDivider><Text>GROWTH TIME</Text></ListItem>
                <ListItem><Text>{this.state.data.growthTime} hours</Text></ListItem>
                <ListItem itemDivider><Text>MAX HARVEST</Text></ListItem>
                <ListItem><Text>{this.state.data.maxHarvest} berries</Text></ListItem>
                <ListItem itemDivider><Text>SOIL DRYNESS</Text></ListItem>
                <ListItem><Text>{this.state.data.soilDryness} on the dry scale</Text></ListItem>
                <ListItem itemDivider><Text>NATURAL GIFT TYPE</Text></ListItem>
                <ListItem><Text>{this.state.data.naturalGiftType}</Text></ListItem>
                <ListItem itemDivider><Text>NATURAL GIFT POWER</Text></ListItem>
                <ListItem><Text>{this.state.data.naturalGiftPower}</Text></ListItem>
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


