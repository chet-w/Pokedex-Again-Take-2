import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { Card, CardItem, Text, Right, Icon } from 'native-base';



class CardListItem extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            name: this.props.name
        }
    }

    render(){

        const openPokemonPage = () => {
            this.props.navigation.navigate('PokemonPage', {
                name: this.state.name
            });
        }

        return (
            <Card >
                <CardItem>
                    <Text>{this.state.name}</Text>
                    <Right>
                        <Icon onPress={openPokemonPage} name="arrow-forward" />
                    </Right>
                </CardItem>
             </Card>
        )
    }

}

export default withNavigation(CardListItem);