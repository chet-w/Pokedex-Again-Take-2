import React from 'react';
import { Image } from 'react-native';
import { Card, CardItem, Text } from 'native-base';


export default class GameCard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            path: '../images/games/' + this.props.title + '.' + this.props.suffix
        }
    }

    render(){
        return(
            <Card>
                <CardItem cardBody>
                    <Image source={{ uri: './images/games/gold.jpg' }} style={{height: 200, width: null, flex: 1}}/> 
                </CardItem>
                {/* <CardItem>
                    <Text>Test</Text>
                </CardItem> */}
            </Card>
        )
    }
}
