import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Content, Text, H1, Form, Item, Label, Input } from 'native-base';
import CardListItem from '../components/card-list-item.js';
import PageHeader from '../components/page-header.js';
import { getAllBerries } from '../components/getBerries.js'

export default class BerriesSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            preamble: "Type the name of a Berry to get some more information about it.",
            suggested: getAllBerries().slice(0, 10)
        }
    }

    
    render() {

        const suggestions = this.state.suggested.map(el => {
            return (
                <CardListItem click={"berry"} name={el} key={el} />
            )
        });

        const handleInput = (text) => {
            const all = getAllBerries();

            if (text === "") {
                this.setState({
                    suggested: all.slice(0, 10)
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
                <PageHeader title="Berries" navigation={this.props.navigation} />
                <Content padder>
                    <H1>Browse Berries</H1>
                    <Text>
                        {this.state.preamble}
                    </Text>
                    <Form>
                        <Item floatingLabel>
                            <Label>Berry Name</Label>
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