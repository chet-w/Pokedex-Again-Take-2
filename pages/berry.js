import React from 'react';
import { StyleSheet } from 'react-native';

import { Container, Content, Button, Text, H1, Form, Item, Label, Input, H2 } from 'native-base';
import PageHeader from '../components/page-header.js';

export default class Berry extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            preamble: "Sample Text"
        }
    }

    static navigationOptions = {
        drawerLabel: () => null
    }

    render() {

        return (
            <Container>
                <PageHeader title="Berry" navigation={this.props.navigation} />
                <Content padder>
                    <H1>Browse Games</H1>
                    <Text>
                        {this.state.preamble}
                    </Text>
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

