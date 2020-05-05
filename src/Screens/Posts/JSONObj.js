import React, { Component } from 'react';
import { Container, Content, Header, Left, Body, Right, Button,Text, Icon, Title } from 'native-base';
export default class JsonData extends Component {
    constructor(props){
        super(props);
    }
  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: '#fff' }}>
          <Left>
            <Button transparent>
              <Icon style={{ color: '#000' }} onPress={()=>this.props.navigation.goBack(null)} name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title style={{ color: '#000' }}>JSON</Title>
          </Body>
          <Right>
           
          </Right>
        </Header>
        <Content>
            <Text>{JSON.stringify(this.props.navigation.state.params.post)}</Text>
</Content>
      </Container>
    );
  }
}
