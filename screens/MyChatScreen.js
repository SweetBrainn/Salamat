import React, {Component} from 'react';
import {StyleSheet, View, Image, ScrollView} from 'react-native';
import {ChatScreen} from 'react-native-easy-chat-ui'

import {
    Container,
    Header,
    Title,
    Content,
    Footer,
    FooterTab,
    CardItem,
    Button,
    Left,
    Card,
    Right,
    Body,
    Icon,
    Text,
    List,
    ListItem,
    Thumbnail
} from 'native-base';

export default class MyChatScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    onBackPressed() {
        this.props.navigation.goBack()
    }


    render() {

        return (
            <Container>
                <Header style={{backgroundColor: '#23b9b9'}}>
                    <Left>
                        <Button transparent style={styles.headerMenuIcon}
                                onPress={() => this.onBackPressed()}>
                            <Icon style={styles.headerMenuIcon} name='arrow-back'
                                  onPress={() => this.onBackPressed()}/>
                        </Button>
                    </Left>
                    <Body>
                        <Title style={styles.headerText}>{(this.props.navigation.getParam('Contact'))}</Title>
                    </Body>
                    <Right>
                        <Icon name='user' type='FontAwesome' style={{color:'#fff'}}/>
                    </Right>
                </Header>
                <Content>

                </Content>
            </Container>

        );
    }

}

MyChatScreen.navigationOptions = {
    header: null,
    title: '',
    headerStyle: {
        backgroundColor: '#23b9b9'
    },
    headerTitleStyle: {
        color: '#fff',

    },
    headerLeft: null
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerMenuIcon: {
        padding: 5,
        color: '#fff',
    },
    headerText: {
        padding: 5,
        fontSize: 15,
        color: '#fff',

    },
    questionName: {
        alignSelf: 'flex-start',
        justifyContent: 'center',
        alignContent: 'center',
        textAlign: 'right',
        fontSize: 10
    },
    questionInfo: {
        alignSelf: 'flex-start',
        justifyContent: 'center',
        alignContent: 'center',
        textAlign: 'right',
        fontSize: 10
    },
    card: {
        marginRight: 10,
        marginLeft: 10,
        marginTop: 5,
        borderWidth: 1,
        borderColor: '#c7c7c7',
        borderRadius: 2,
        elevation: 8
    },
    header: {
        backgroundColor: "#23b9b9",
        height: 150,
    },
    body: {
        marginTop: 40,
    },
    bodyContent: {
        flex: 1,
        margin: 10,
        alignItems: 'center',
        padding: 10,
        borderWidth: 2,
        borderColor: '#23b9b9'
    },
    titleText: {
        color: '#fff',
        textAlign: 'left',
        alignSelf: 'flex-end',
        fontWeight: 'bold'
    },
    contentText: {
        color: '#fff',
        textAlign: 'left',
        alignSelf: 'flex-end',
        marginTop: 5,
        fontSize: 15
    }
});
