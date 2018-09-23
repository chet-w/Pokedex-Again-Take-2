import React, { Component } from 'react';
import { Text } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Content, List, ListItem, View, Container } from 'native-base';
import Pokedex from "pokedex-promise-v2";


import { MaterialIndicator } from 'react-native-indicators';


import PageHeader from '../components/page-header.js';




class Pokemon extends Component {

    static navigationOptions = {
        drawerLabel: () => null
    }

    pokedex = new Pokedex();
    
    constructor(props) {
        super(props);
        this.state = {
            name: this.removeQuotes(JSON.stringify(this.props.navigation.getParam('name', 'test'))),
            sprite: "test",
            loading: true
        }
        this.getData();
        

    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                loading: false
            })
        }, 3000);
    }

    getData(){
        // Retrieve data from API
        console.log("Getting data...")
        let data = "";
        this.pokedex.getPokemonByName('eevee').then(resp => {
            data = this.refineData(resp);
            console.log(data);
        }).catch(err => {
            if(err){
                console.log(err)
            }
        });

        
    }

    refineData(json){
        let name = this.state.name;
        let number = json.id;
        let type = ""//this.getType(json.types);
        let height = json.height;
        let weight = json.weight;
        let abilities = "" //this.getAbilties(json.abilities);
        let moves = "" //this.getMoves(json.moves);
        let stats = json.stats;//this.getStats(json.stats);
        let sprites = json.sprites; //this.getSprites(json.sprites);

        return {
            name: name,
            number: number,
            type: type,
            height: height,
            weight: weight,
            abilities: abilities,
            moves: moves,
            stats: stats,
            sprites: sprites,
        }
    }

    getType(json) {
        let types = [];
        json.forEach(el => {
            const type = {
                slot: el.slot,
                name: el.type.name
            };
            types.push(type);
        });
        return types;
    }

    getAbilties(json) {
        let abilities = [];
        json.forEach(el => {
            const ability = {
                name: el.ability.name,
                isHidden: el.isHidden
            };
            abilities.push(ability);
        });
        return abilities;
    }

    getMoves(json) {
        let moves = [];
        const version = "sun-moon";
        json.forEach(el => {
            const isInVersion = el.version_group_details.find(ver => {
                return ver.version_group === version;
            });
            if(isInVersion){
                const move = {
                    name: el.move,
                    level: el.version_group_details.find(ver => {
                        return ver.version_group === version;
                    })
                };
                moves.push(move);
            }
        });
        return moves;
    }

    removeQuotes(string) {
        return string.substr(1, string.length - 2)
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
        )
    }
}

export default withNavigation(Pokemon);