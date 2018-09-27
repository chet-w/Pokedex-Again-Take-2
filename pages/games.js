import React from 'react';
import { StyleSheet } from 'react-native';

import { Container, Content, Card, CardItem, Text, H1, Image, Left, Body, View } from 'native-base';
import PageHeader from '../components/page-header.js';
import GameCard from '../components/game-card.js';

export default class Games extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            preamble: "Sample Text"
        }
    }

    static navigationOptions = {
        drawerLabel: 'Games',
        headerTitle: 'Games',
    };

    render() {

        const cards = (
            <View>
                <GameCard title="red" suffix="jpg" gen="1"/>
                <GameCard title="blue" suffix="png" gen="1"/>
                <GameCard title="green" suffix="png" gen="1" />
                <GameCard title="yellow" suffix="jpg" gen="1"/>
                <GameCard title="gold" suffix="jpg" gen="2"/>
                <GameCard title="silver" suffix="jpg" gen="2"/>
                <GameCard title="crystal" suffix="png" gen="2"/>
                <GameCard title="ruby" suffix="jpg" gen="3"/>
                <GameCard title="sapphire" suffix="jpg" gen="3"/>
                <GameCard title="firered" suffix="jpg" gen="3"/>
                <GameCard title="leafgreen" suffix="jpg" gen="3"/>
                <GameCard title="emerald" suffix="jpg" gen="3"/>
                <GameCard title="diamond" suffix="jpg" gen="4"/>
                <GameCard title="pearl" suffix="jpg" gen="4"/>
                <GameCard title="platinum" suffix="jpg" gen="4"/>
                <GameCard title="heartgold" suffix="jpg" gen="4"/>
                <GameCard title="soulsilver" suffix="jpg" gen="4"/>
                <GameCard title="black" suffix="png" gen="5"/>
                <GameCard title="white" suffix="jpg" gen="5"/>
                <GameCard title="black2" suffix="jpg" gen="5"/>
                <GameCard title="white2" suffix="png" gen="5"/>
                <GameCard title="x" suffix="jpg" gen="6"/>
                <GameCard title="y" suffix="jpg" gen="6"/>
                <GameCard title="omegaruby" suffix="jpg" gen="6"/>
                <GameCard title="alphasapphire" suffix="png" gen="6"/>
                <GameCard title="sun" suffix="png" gen="7"/>
                <GameCard title="moon" suffix="png" gen="7"/>
                <GameCard title="ultrasun" suffix="png" gen="7"/>
                <GameCard title="ultramoon" suffix="jpg" gen="7"/>
            </View>
        )

        return (
            <Container>
                <PageHeader title="Games" navigation={this.props.navigation} />
                <Content padder>
                    <H1>Browse Games</H1>
                    <Text>
                        {this.state.preamble}
                    </Text>
                    {cards}
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

