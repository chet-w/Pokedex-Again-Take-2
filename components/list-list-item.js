import React from 'react';
import { ListItem, Text } from 'native-base';

export default class ListListItem extends React.Component {

    constructor(props){
        super(props);

    }

    render() {
        if(!this.props.data){
            return null;
        }
        <ListItem>
            <Text>{this.props.data}</Text>
        </ListItem>
    }
}