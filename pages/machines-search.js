import React from 'react';
import { StyleSheet } from 'react-native';

import { Container, Content, Button, Text, H1, Form, Item, Label, Input, H2 } from 'native-base';
import PageHeader from '../components/page-header.js';

export default class MachinesSearch extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            preamble: "Sample Text"
        }
    }

    static navigationOptions = {
        drawerLabel: 'Machines',
        headerTitle: 'Machines',
    };

    render() {

        return (
            <Container>
                <PageHeader title="Machines" navigation={this.props.navigation} />
                <Content padder>
                    <H1>Browse Machines</H1>
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

