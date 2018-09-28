import React, { Component } from 'react';
import { Text, Image, Dimensions } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Content, List, ListItem, View, Container, Accordion } from 'native-base';
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
            data: {
                name: "",
                number: "",
                type: "",
                height: "",
                weight: "",
                abilities: "",
                moves: [],
                stats: [],
                sprites: ""
            },
            loading: true
        }
        this.getData();
    }



    getData() {
        // Retrieve data from API
        let data = "";
        this.pokedex.getPokemonByName(this.state.name.toLowerCase()).then(resp => {
            data = this.refineData(resp);
            this.setState({ data: data, loading: false });

        }).catch(err => {
            if (err) {
                console.log(err)
            }
        });
    }

    refineData(json) {
        const refined = {
            name: this.state.name,
            number: json.id,
            type: this.getType(json.types),
            height: json.height,
            weight: json.weight,
            abilities: this.getAbilties(json.abilities),
            moves: this.getMoves(json.moves),
            stats: this.getStats(json.stats),
            sprites: this.getSprites(json.sprites),
        };

        console.log(refined);
        return refined;
    }

    getSprites(json) {
        const sprite = {
            normal: json.front_default,
            shiny: json.front_shiny
        }
        return sprite;
    }

    getStats(json) {
        let stats = [];
        json.forEach(el => {
            const stat = {
                name: this.formatString(el.stat.name),
                base: el.base_stat,
                effort: el.effort
            }
            stats.push(stat);
        });
        return stats;
    }

    getType(json) {
        let types = [];
        json.forEach(el => {
            const type = {
                slot: el.slot,
                name: this.formatString(el.type.name)
            };
            types.push(type);
        });
        return types;
    }

    getAbilties(json) {
        let abilities = [];
        json.forEach(el => {
            const ability = {
                name: this.formatString(el.ability.name),
                isHidden: el.is_hidden
            };
            abilities.push(ability);
        });
        return abilities;
    }

    formatString(string) {
        let splitStr = string.toLowerCase().split('-');
        for (let i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        const formatted = splitStr.join(' ');
        return formatted;
    }

    getMoves(json) {
        let moves = [];
        const version = "sun-moon";
        json.forEach(el => {
            const isInVersion = el.version_group_details.find(ver => {
                return ver.version_group.name === version;
            });
            if (isInVersion) {
                const move = {
                    name: this.formatString(el.move.name),
                    level: el.version_group_details.find(ver => {
                        return ver.version_group.name === version;
                    }).level_learned_at
                };
                if (move.level > 0) {
                    moves.push(move);
                }
            }
        });
        moves.sort((a, b) => {
            if (a.level > b.level) {
                return 1;
            } if (a.level < b.level) {
                return -1;
            }
            return 0;
        });
        return moves;
    }

    removeQuotes(string) {
        return string.substr(1, string.length - 2)
    }


    render() {

        const showSprites = () => {
            const normal = this.state.data.sprites.normal;
            const shiny = this.state.data.sprites.shiny;
            const width = (Dimensions.get("window").width * 0.9) / 2

            return (
                <View>
                    <ListItem>
                        <Image source={{ uri: normal }} style={{ width: width, height: width }} />
                        <Image source={{ uri: shiny }} style={{ width: width, height: width }} />
                    </ListItem>
                </View>
            )
        }

        const showTypes = () => {
            let types = [];
            for (let i = 0; i < this.state.data.type.length; i++) {
                const type = (
                    <ListItem key={i}>
                        <Text>{this.state.data.type[i].name}</Text>
                    </ListItem>
                )
                types.push(type);
            }
            return types;
        }

        const showAbilities = () => {
            let abilities = [];
            for (let i = 0; i < this.state.data.abilities.length; i++) {
                let isHidden = (
                    <Text></Text>
                )
                if (this.state.data.abilities[i].isHidden) {
                    isHidden = (
                        <Text> (Hidden)</Text>
                    );
                }
                const ability = (
                    <ListItem key={i}>
                        <Text>{this.state.data.abilities[i].name}</Text>
                        {isHidden}
                    </ListItem>
                )
                abilities.push(ability);
            }
            return abilities;

        }

        const showHeightAndWeight = () => {
            const height = (
                <ListItem>
                    <Text>Height: {this.state.data.height} inches</Text>
                </ListItem>
            )
            const weight = (
                <ListItem>
                    <Text>Weight: {this.state.data.weight} lbs</Text>
                </ListItem>
            )
            return (
                <View>
                    {height}
                    {weight}
                </View>
            );

        }

        const showStats = () => {
            let stats = [
                { title: "STATS", content: "" }
            ];

            let allStats = "";
            
            this.state.data.stats.forEach(el => {
                allStats = allStats +
                `
                ${el.name} \n
                Base Experience: ${el.base}\n
                Effort points: ${el.effort}\n
                `
            });
            stats[0].content = allStats;
            return stats;
        }

        const showMoves = () => {
            let moves = [
                { title: "MOVES", content: "" }
            ];

            let allMoves = "";

            this.state.data.moves.forEach(el => {
                allMoves = allMoves + 
                `
                ${el.name} \n
                Learnt at level: ${el.level} \n
                `;
            })

            moves[0].content = allMoves;
            return moves;

        }


        const content = (
            <List>
                <ListItem itemDivider><Text>SPRITES</Text></ListItem>
                {showSprites()}
                <ListItem itemDivider><Text>TYPING</Text></ListItem>
                {showTypes()}
                <ListItem itemDivider><Text>ABILITIES</Text></ListItem>
                {showAbilities()}
                <ListItem itemDivider><Text>HEIGHT & WEIGHT</Text></ListItem>
                {showHeightAndWeight()}
                <Accordion dataArray={showMoves()} icon="add" expandedIcon="remove"/>
                <Accordion dataArray={showStats()} icon="add" expandedIcon="remove"/>
                
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