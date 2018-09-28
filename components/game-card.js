import React from 'react';
import { Image, Dimensions } from 'react-native';
import { Card, CardItem, Text } from 'native-base';


export default class GameCard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            path: 'https://raw.githubusercontent.com/chet-w/Pokedex-Again-Take-2/master/images/games/' + this.props.title + '.' + this.props.suffix,
         }
    }

    render(){

        const width = (Dimensions.get("window").width * 0.9)
        return(
            <Card>
                <CardItem cardBody>
                    <Image source={{ uri: this.state.path }} style={{height: width, width: width, flex: 1}}/> 
                </CardItem>
                <CardItem>
                    <Text>Pokemon {this.props.title} version</Text>
                </CardItem>
            </Card>
        )
    }
}
