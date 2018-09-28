import React from 'react';
import { getAllMachines } from '../components/getMachines';
import { Container, Content, Text, ListItem } from 'native-base';
import PageHeader from '../components/page-header.js';

export default class MachineList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allMachines: getAllMachines()
        };
    }

    static navigationOptions = {
        drawerLabel: () => null
    }

    render() {

        const getMachineCards = () => {
            let cards = [];
            let machines = this.state.allMachines.map(el => {
                return el.name
            });
            const divs = addDividers();
            divs.forEach(el => machines.push(el));
            machines.sort();
            machines.forEach(el => {
                let card;
                if(el.length === 1){
                    card = <ListItem itemDivider key={el}><Text>{el}</Text></ListItem>
                }else{
                    card =  <ListItem key={el}><Text>{el}</Text></ListItem>
                }
                cards.push(card);
            });
            return cards;
        }

        const addDividers = () => {
            let dividers = [];
            for (let i = 65; i < 91; i++) {
                const letter = String.fromCharCode(i).toUpperCase();
                dividers.push(letter);
            }
            return dividers;
        }

        return (
            <Container>
                <PageHeader title="All Machines" navigation={this.props.navigation} />
                <Content padder>
                    {getMachineCards()}
                </Content>
            </Container>
        )
    }
}
