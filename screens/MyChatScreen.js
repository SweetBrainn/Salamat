import React, {Component} from 'react';
import {StyleSheet, View, Image, ScrollView, Keyboard, StatusBar} from 'react-native';
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
    Item,
    Input,
    Right,
    Body,
    Icon,
    Text,
    Textarea,
    Form,
    Thumbnail,
    Fab
} from 'native-base';

export default class MyChatScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {};
    }

    onBackPressed() {
        this.props.navigation.goBack()
    }


    render() {

        return (
            <Container>
                <StatusBar hidden translucent backgroundColor="transparent"/>
                <Header style={{backgroundColor: '#23b9b9'}}>
                    <Left>
                        <Button transparent style={styles.headerMenuIcon}
                                onPress={() => this.onBackPressed()}>
                            <Icon style={styles.headerMenuIcon} name='arrow-back'
                                  onPress={() => this.onBackPressed()}/>
                        </Button>
                    </Left>
                    <Right>
                        <Text style={styles.headerText}>ارسال پیام</Text>
                    </Right>
                </Header>
                <Content padder>
                    <Form>
                        <Item style={{padding: 1, fontSize: 15, marginBottom: 5, marginTop: 5}}>
                            <Icon active name='person' style={{fontSize: 15, textAlign: 'right'}}/>
                            <Input placeholder='گیرنده پیام' style={{textAlign: 'right'}}/>
                        </Item>
                        <Textarea rowSpan={7} bordered placeholder="متن پیام"
                                  style={{textAlign: 'right', padding: 2, fontSize: 15}}/>
                    </Form>

                </Content>
                <Footer style={styles.footer}>

                    <Fab
                        direction="up"
                        containerStyle={styles.chatInput}
                        style={{backgroundColor: '#34A34F'}}
                        position="bottomRight"
                        onPress={() => alert('Sent')}>
                        <Icon name="paper-plane" type="FontAwesome"/>

                    </Fab>

                </Footer>
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
        fontSize: 20,
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
    },
    chatInput: {
        padding: 2,
        marginTop: 10,
        marginBottom: 10
    },
    footer:{
        backgroundColor:'#fff'
    }
});
