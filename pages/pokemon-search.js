import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { Container, Content, Button, Text, H1, Form, Item, Label, Input, H2 } from 'native-base';
import PageHeader from '../components/page-header.js';
import CardListItem from '../components/card-list-item.js';
import * as pkmnList from 'pokemon';


export default class PokemonSearch extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            preamble: "Type the name of a Pokemon below to bring up it's Pokedex entry.",
            suggested: pkmnList.all().slice(0, 10)
        }
    }

    static navigationOptions = {
        drawerLabel: 'Pokemon',
        headerTitle: 'Pokemon',
    };

    render() {

        const suggestions = this.state.suggested.map(el => {
            return (
                <CardListItem name={el} key={el} />
            )
        });

        const handleInput = (text) => {
            const all = pkmnList.all();

            if (text === "") {
                this.setState({
                    suggested: pkmnList.all().slice(0, 10)
                });
            } else {
                let filtered = all.filter(name => {
                    return (name.toLowerCase().indexOf(text.toLowerCase()) > -1);
                });
                if (filtered.length > 10) {
                    filtered = filtered.slice(0, 10);
                }
                this.setState({
                    suggested: filtered
                })
            }
        }

        return (
            <Container>
                <PageHeader title="Pokemon" navigation={this.props.navigation} />
                <Content padder>
                    <H1>Browse Pokemon</H1>
                    <Text>
                        {this.state.preamble}
                    </Text>
                    <Form>
                        <Item floatingLabel>
                            <Label>Pokemon Name</Label>
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

