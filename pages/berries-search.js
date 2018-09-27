import React, {Component} from 'react';
import { StyleSheet } from 'react-native';
import { Container, Content, Text, H1 } from 'native-base';

import PageHeader from '../components/page-header.js';


export default class BerriesSearch extends React.Component {

    render() {
        return (
            <Container>
                <PageHeader title="Berries" navigation={this.props.navigation} />
                <Content padder>
                    <H1>Browse Berries</H1>
                    <Text>
                        This is where the content goes.
                    </Text>
                </Content>
            </Container>
        );
    }
}