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
    Thumbnail,
} from 'native-base';
import Drawer from "react-native-drawer";
import SideMenu from "../Menu/SideMenu";

const MyPost = (props) => {
    return (
        <Card style={[styles.post]}>
            <CardItem>
                <Body>
                    <Image style={styles.postImage}
                           source={{uri: props.postContentImage}}/>
                    <Text style={styles.postText}>{props.postContentText}</Text>
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
export default class NoticeScreen extends Component {

    constructor(props) {


        super(props);
        this.state = {
            posts: [
                {
                    image: 'http://shahresalem.tehran.ir/LinkClick.aspx?fileticket=ni7ZvuXS7rA%253d&portalid=0',
                    text: 'گزارش تصویری از خدمت‌رسانی تیم پزشکی شرکت شهر سالم به زائرین اربعین حسینی'
                },
                {
                    image: 'http://shahresalem.tehran.ir/LinkClick.aspx?fileticket=AdbFseiVurA%253d&portalid=0',
                    text: 'سرپرست توسعه منابع انسانی شهرداری تهران از ستاد مرکزی شرکت شهرسالم بازدید کرد'
                },
                {
                    image: 'http://shahresalem.tehran.ir/LinkClick.aspx?fileticket=7AOJunaG-3s%253d&portalid=0',
                    text: 'برگزاری جشن شکرانه شرکت شهر سالم سال 1397'
                },
            ]
        }
    }

    render() {

        return (

            <Container>
                <Header style={{backgroundColor: '#23b9b9'}}>
                    <Left>
                        <Button transparent style={styles.headerMenuIcon}
                                onPress={() => this.props.navigation.openDrawer()}>
                            <Icon style={styles.headerMenuIcon} name='menu'
                                  onPress={() => this.props.navigation.openDrawer()}/>
                        </Button>
                    </Left>
                    <Right>
                        <Text style={styles.headerText}>اطلاع رسانی</Text>
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
                        {this.state.posts.map((item, key) => (
                            <View key={key}>
                                <MyPost postContentText={item.text} postContentImage={item.image}
                                        likes={Math.round(Math.random() * 10) + 1}/>
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
        marginTop: 5,
        fontSize: 10
    },
    post: {
        margin: 5,
        flex: 0
    },
    postImage: {
        height: 200,
        width: 200,
        flex: 1,
        alignSelf: 'center'
    }
});
