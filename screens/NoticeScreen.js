import React, {Component} from 'react';
import {StyleSheet, View, Image, ScrollView, ActivityIndicator, StatusBar, AsyncStorage} from 'react-native';
import {
    Container,
    Header,
    Spinner,
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
    Thumbnail,
} from 'native-base';
import Drawer from "react-native-drawer";
import SideMenu from "../Menu/SideMenu";

const GETNOTICES = '/api/GetNotices';

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animate: props.animate,
            postContentImage: props.postContentImage,
            postContentText: props.postContentText,
            // keyValue: props.myKey
        }
    }

    render() {
        return (
            <Card style={[styles.post]}>
                <CardItem header>
                    <Body>
                        <ActivityIndicator color={'gray'} animating={this.state.animate} size={"small"}
                                           style={{alignSelf: 'center'}}/>
                        <Image
                            onLoadEnd={() => {
                                this.setState({animate: !this.state.animate})
                            }}
                            style={[styles.postImage]}
                            source={{uri: this.state.postContentImage}}/>
                    </Body>
                </CardItem>
                <CardItem footer>
                    <Body>
                        <Text style={styles.postText}>{this.state.postContentText}</Text>
                    </Body>
                </CardItem>
                {/*<CardItem>*/}
                {/*    <Left>*/}
                {/*        <Button transparent>*/}
                {/*            <Icon type='FontAwesome' name="heart" style={{color: '#ba150b'}}/>*/}
                {/*            <Text style={{color: '#ba150b'}}>{props.likes} نفر پسندیده اند</Text>*/}
                {/*        </Button>*/}
                {/*    </Left>*/}
                {/*</CardItem>*/}
            </Card>
        )
    }
}


export default class NoticeScreen extends Component {

    constructor(props) {


        super(props);
        this.state = {
            animate: true,
            progressModalVisible: false,
            token: null,
            baseUrl: null,
            posts: [
                {
                    id: 1,
                    image: 'http://shahresalem.tehran.ir/LinkClick.aspx?fileticket=ni7ZvuXS7rA%253d&portalid=0',
                    text: 'گزارش تصویری از خدمت‌رسانی تیم پزشکی شرکت شهر سالم به زائرین اربعین حسینی'
                },
                {
                    id: 2,
                    image: 'http://shahresalem.tehran.ir/LinkClick.aspx?fileticket=AdbFseiVurA%253d&portalid=0',
                    text: 'سرپرست توسعه منابع انسانی شهرداری تهران از ستاد مرکزی شرکت شهرسالم بازدید کرد'
                },
                {
                    id: 3,
                    image: 'http://shahresalem.tehran.ir/LinkClick.aspx?fileticket=AdbFseiVurA%253d&portalid=0',
                    text: 'سرپرست توسعه منابع انسانی شهرداری تهران از ستاد مرکزی شرکت شهرسالم بازدید کرد'
                },
                {
                    id: 4,
                    image: 'http://shahresalem.tehran.ir/LinkClick.aspx?fileticket=AdbFseiVurA%253d&portalid=0',
                    text: 'سرپرست توسعه منابع انسانی شهرداری تهران از ستاد مرکزی شرکت شهرسالم بازدید کرد'
                },
                {
                    id: 5,
                    image: 'http://shahresalem.tehran.ir/LinkClick.aspx?fileticket=AdbFseiVurA%253d&portalid=0',
                    text: 'سرپرست توسعه منابع انسانی شهرداری تهران از ستاد مرکزی شرکت شهرسالم بازدید کرد'
                },
                {
                    id: 6,
                    image: 'http://shahresalem.tehran.ir/LinkClick.aspx?fileticket=AdbFseiVurA%253d&portalid=0',
                    text: 'سرپرست توسعه منابع انسانی شهرداری تهران از ستاد مرکزی شرکت شهرسالم بازدید کرد'
                },
            ],
            notices: null
        }
    }


    async componentWillMount(): void {
        var token = await AsyncStorage.getItem('token');
        this.setState({baseUrl: this.props.navigation.getParam('baseUrl'), token: token}, () => {
            // alert(this.state.baseUrl + '    ' + this.state.token)
            this.getNotices()
        })
    }

    getNotices() {
        fetch(this.state.baseUrl + GETNOTICES, {
            method: 'GET',
            headers: {'content-type': 'application/json'},
        }).then((response) => response.json())
            .then(async (responseData) => {
                if (responseData['StatusCode'] === 200) {
                    if (responseData['Data'] != null) {
                        let data = responseData['data'];
                        alert(JSON.stringify(data))
                        this.setState({progressModalVisible: false, notices: data})
                    }
                } else {
                    this.setState({progressModalVisible: false}, () => {
                        alert('خطا در اتصال به سرویس')
                    })
                }
            })
            .catch((error) => {
                // console.error(error)
                alert(error)
            })
    }

    render() {

        return (

            <Container>
                <StatusBar hidden translucent backgroundColor="transparent"/>
                <Header style={{backgroundColor: '#23b9b9'}}>
                    <Left>
                        <Button transparent style={styles.headerMenuIcon}
                                onPress={() => this.props.navigation.openDrawer()}>
                            <Icon style={styles.headerMenuIcon} name='menu'
                                  onPress={() => this.props.navigation.openDrawer()}/>
                        </Button>
                    </Left>
                    <Right>
                        <Text onPress={async () => {
                            var token = await AsyncStorage.getItem('token');
                            alert(token)
                        }} style={styles.headerText}>اطلاع رسانی</Text>
                    </Right>
                </Header>
                <Content padder style={styles.content}>
                    {/*<Card style={styles.card}>*/}
                    {/*    <CardItem>*/}
                    {/*        <Body>*/}
                    {/*            <Text style={styles.text}>*/}

                    {/*                بازدید وزیر بهداشت و سرپرست شهرداری تهران از طرح*/}
                    {/*                معاینات کودکان کار (1398/7/20)*/}
                    {/*            </Text>*/}
                    {/*        </Body>*/}
                    {/*    </CardItem>*/}
                    {/*    <CardItem>*/}
                    {/*        <Body>*/}
                    {/*            <Text style={styles.text}>*/}
                    {/*                ارائه خدمات بهداشتی درمانی شرکت شهر سالم در ایام*/}
                    {/*                تعطیلات نوروز (1398/7/25)*/}
                    {/*            </Text>*/}
                    {/*        </Body>*/}
                    {/*    </CardItem>*/}
                    {/*    <CardItem>*/}
                    {/*        <Body>*/}
                    {/*            <Text style={styles.text}>*/}
                    {/*                تکمیل چرخه خدمت در مراکز بهداشتی درمانی شرکت*/}
                    {/*                شهر سالم (1398/6/31)*/}
                    {/*            </Text>*/}
                    {/*        </Body>*/}
                    {/*    </CardItem>*/}
                    {/*</Card>*/}
                    <ScrollView>
                        {
                            this.state.posts.map((item, key) => (

                                /*<MyPost animate={this.state.animate} postContentText={item.text}*/
                                /*        postContentImage={item.image}*/
                                /*        likes={Math.round(Math.random() * 10) + 1}/>*/
                                <View key={key}>
                                    <Post animate={this.state.animate} postContentText={item.title}
                                          postContentImage={'http://shahresalem.tehran.ir/LinkClick.aspx?fileticket=ni7ZvuXS7rA%253d&portalid=0'}/>
                                </View>
                            ))}
                    </ScrollView>
                </Content>
            </Container>
        );
    }


}

NoticeScreen.navigationOptions = {
    header: null,
    title: 'اطلاع رسانی',
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
        backgroundColor: 'rgba(47,246,246,0.06)',
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
    text: {
        textAlign: 'right',
        fontSize: 15
    },
    card: {
        borderWidth: 1,
        borderColor: '#c7c7c7',
        borderRadius: 2,
        elevation: 8
    },
    postText: {
        textAlign: 'right',
        marginTop: 10,
        padding: 1,
        fontSize: 13,

    },
    post: {
        margin: 10,
        flex: 0,
        borderColor: '#23b9b9',
        borderWidth: 5,
        elevation: 8,

    },
    postImage: {
        height: 200,
        width: 300,
        flex: 1,
        alignSelf: 'center'
    }
});
