import React, {Component} from 'react';
import {StyleSheet, View, Image, ScrollView} from 'react-native';
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


const ChatList = (props) => {
    return (
        <List>
            <ListItem avatar style={{padding: 2}}>
                <Body>
                    <Text style={{textAlign: 'right', borderColor: '#fff'}}>{props.name}</Text>
                    <Text style={{textAlign: 'right', borderColor: '#fff'}} note
                          numberOfLines={1}>{props.message}</Text>
                </Body>
                <Right>
                    <Icon name='user' type='FontAwesome5' style={{color: '#b4b4b4'}}/>
                </Right>

            </ListItem>
        </List>
    )
}
export default class InboxScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            chatDetails: [
                {
                    senderName: 'دکتر حسینی',
                    senderImage: '',
                    lastMessage: 'نوبت امروز شما 15 دقیقه با تاخیر شروع می شود'
                },
                {senderName: 'دکتر رضایی', senderImage: '', lastMessage: 'نوبت امروز شما کنسل شده است'},
                {senderName: 'دکتر علیزاده', senderImage: '', lastMessage: 'دفترچه بیمه فراموش نشود'},
                {senderName: 'دکتر محمدی', senderImage: '', lastMessage: 'نسخه قبلی پزشک خود را همراه خود بیاورید'},
                {
                    senderName: 'دکتر ضیایی',
                    senderImage: '',
                    lastMessage: 'نوبت امروز شما 25 دقیقه با تاخیر شروع می شود'
                },
            ]
        }
    }

    onBackPressed() {
        this.props.navigation.getParam('navigationObject').navigate('HistoryScreen')
    }

    myNavigate() {
        this.props.navigation.navigate('ChatScreen')
    }

    renderList(value, index) {
        return (
            <View key={index}>
                <ChatList name={value.senderName} message={value.lastMessage}/>
            </View>
        )
    }

    render() {

        return (
            <Container>
                <Header hasTabs span style={{backgroundColor: '#23b9b9'}}>
                    <Left>
                        <Button transparent style={styles.headerMenuIcon}
                                onPress={() => this.onBackPressed()}>
                            {/*<Icon style={styles.headerMenuIcon} name='arrow-back'*/}
                            {/*      onPress={() => this.onBackPressed()}/>*/}
                        </Button>
                    </Left>
                    <Body>
                        <Title style={styles.headerText}>پیام ها</Title>
                    </Body>
                </Header>
                <Content>

                    <ScrollView>
                        <List>
                            {this.state.chatDetails.map((value, index) =>
                                // this.renderList(value, index)
                                <View key={index}>

                                    <ListItem avatar style={{padding: 2}}
                                              onPress={() => this.props.navigation.navigate('ChatScreen', {Contact: this.state.chatDetails[index].senderName})}>
                                        <Body>
                                            <Text style={{
                                                textAlign: 'right',
                                                borderColor: '#fff'
                                            }}>{value.senderName}</Text>
                                            <Text style={{textAlign: 'right', borderColor: '#fff'}} note
                                                  numberOfLines={1}>{value.lastMessage}</Text>
                                        </Body>
                                        <Right>
                                            <Icon name='user' type='FontAwesome5' style={{color: '#b4b4b4'}}/>
                                        </Right>

                                    </ListItem>

                                </View>
                            )}
                        </List>
                    </ScrollView>
                </Content>
            </Container>

        );
    }

}

InboxScreen.navigationOptions = {
    header: null,
    title: 'پیام ها',
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
    }
});