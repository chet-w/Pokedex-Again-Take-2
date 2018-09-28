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

        const openBerryPage = () => {
            this.props.navigation.navigate('BerriesPage', {
                name: this.state.name
            });
        }

        const openMachinePage = () => {
            this.props.navigation.navigate('MachinePage', {
                name: this.state.name
            });
        }

        let icon = () => {
            if(this.props.click === "pokemon"){
                return (
                    <Icon onPress={openPokemonPage} name="arrow-forward" />
                )
            }if(this.props.click === "berry"){
                return (
                    <Icon onPress={openBerryPage} name="arrow-forward" />
                )
            }if(this.props.click === "machine"){
                return (
                    <Icon onPress={openMachinePage} name="arrow-forward" />
                )
            }
        };
        

        return (
            <Card >
                <CardItem>
                    <Text>{this.state.name}</Text>
                    <Right>
                        {icon()}
                    </Right>
                </CardItem>
             </Card>
        )
    }

}

export default withNavigation(CardListItem);