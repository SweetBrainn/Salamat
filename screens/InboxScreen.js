import React, {Component} from 'react';
import {StyleSheet, View, Image, ScrollView, TouchableOpacity, Alert} from 'react-native';
import Swipeable from 'react-native-swipeable-row';
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
    Thumbnail,
    SwipeRow
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
            ],
            navigator: this.props.myNavigator
        }
    }

    myNavigate() {
        this.state.navigator.navigate('ChatScreen')
    }

    deleteMessage({value, index}) {
        delete this.state.chatDetails[index];
        this.setState({chatDetails: this.state.chatDetails}, () => {
            // alert('حذف انجام شد')
        })

    }

    render() {

        return (
            <Container>
                <Header style={{backgroundColor: '#23b9b9'}}>
                    <Right>
                        <Button light bordered style={{padding: 2, color: '#fff', marginBottom: 5}}
                                onPress={() => this.myNavigate()}>
                            <Icon type='FontAwesome5' name='pen' style={{color: '#fff', fontSize: 20}}/>
                            <Text> ارسال پیام </Text>
                        </Button>
                    </Right>

                </Header>
                <Content>
                    <ScrollView>
                        <List>
                            {this.state.chatDetails.map((value, index) =>
                                <View key={index}>
                                    <Swipeable rightButtons={[<Button onPress={() => {
                                        this.deleteMessage({value, index})
                                    }} style={{height: '90%'}} danger>
                                        <Icon name='trash'/>
                                    </Button>]}
                                               onRightActionRelease={() => this.deleteMessage({value, index})}>
                                        <ListItem avatar style={{padding: 2}}
                                                  onLongPress={() => Alert.alert(
                                                      'حذف پیام',
                                                      'ادامه میدهید ؟ ',
                                                      [
                                                          {
                                                              text: 'بله',
                                                              onPress: () => this.deleteMessage({value, index})
                                                          },
                                                          {text: 'انصراف'},
                                                      ],
                                                      {cancelable: true}
                                                  )}
                                        >
                                            <Body style={{width: '70%', height: '100%'}}>
                                                <Text style={{
                                                    textAlign: 'right',
                                                    borderColor: '#fff'
                                                }}>{value.senderName}</Text>
                                                <Text style={{textAlign: 'right', borderColor: '#fff'}} note
                                                      numberOfLines={1}>{value.lastMessage}</Text>
                                            </Body>
                                            <Right style={{height: '100%'}}>
                                                <Icon name='user' type='FontAwesome5' style={{color: '#b4b4b4'}}/>
                                            </Right>
                                        </ListItem>
                                    </Swipeable>
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
