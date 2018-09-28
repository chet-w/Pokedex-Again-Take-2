import React from 'react';
import { Container, Content, Text, ListItem, Left, Image, Body, Button } from 'native-base';
import PageHeader from '../components/page-header.js';
import { getAllBerries } from '../components/getBerries.js';

export default class BerryList extends React.Component {
    constructor(props){
        super(props);
    }

    static navigationOptions = {
        drawerLabel: () => null
    }

    render(){

        const reformatString = (string) => {
            let splitStr = string.toLowerCase().split(' ');
            
            const formatted = splitStr.join('-');
            return formatted;
        }

        const allBerries = () => {
            let berryList = [];
            let berries = getAllBerries();
            const dividers = addDividers();
            dividers.forEach(el => berries.push(el));
            berries = berries.sort();
            berries.forEach(el => {
                let b;
                if(el.length === 1){
                    b = (
                        <ListItem itemDivider key={el}><Text>{el}</Text></ListItem>
                    );
                }else{
                    b = (
                        <ListItem key={el}><Text>{el}</Text></ListItem>
                    );
                }
                berryList.push(b);
            });

            return berryList;
        }

        const addDividers = () => {
            let dividers = [];
            for(let i = 65; i < 91; i++){
                const letter = String.fromCharCode(i).toUpperCase();
                dividers.push(letter);
            }
            return dividers;
        }

        return (
            <Container>
                <PageHeader title="All Berries" navigation={this.props.navigation} />
                <Content padder>
                    {allBerries()}
                </Content>
            </Container>
        )
    }
}