import React, { Component } from 'react';
import { Header, Left, Button, Icon, Body, Right, Title } from 'native-base';


export default class PageHeader extends React.Component {

    render(){
        return(
            <Header>
                <Left>
                    <Button transparent onPress={()=> this.props.navigation.toggleDrawer()}>
                      <Icon name='menu' />
                    </Button>
                </Left>
               <Body>
                 <Title>{this.props.title}</Title>
               </Body>
               <Right />

             </Header>
        )
    }
}

