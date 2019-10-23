import React, {Component} from 'react';
import {StyleSheet, View, Image} from 'react-native';
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
} from 'native-base';
import {ListItem} from 'react-native-elements'
import Drawer from "react-native-drawer";
import SideMenu from "../Menu/SideMenu";


export default class GuidScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            questions: [
                "چگونه می توان از خدمات ویزیت در منزل و پرستاری استفاده نمود (ویژه کارکنان رسمی)",
                "در صورت نیاز به استفاده از خدمات فوریتهای پزشکی(اورژانس) با چه شماره ای می توان تماس گرفت؟",
                "فیزیوتراپی درمنزل چگونه انجام می گیرد؟(ویژه کارکنان رسمی)",
                "درچه صورت می توان از آمبولانس استفاده کرد؟",
                "در صورت نیاز به استفاده از خدمات فوریتهای پزشکی(اورژانس) با چه شماره ای می توان تماس گرفت؟",
                "هزینه های استفاده از اورژانس به چه میزان است؟",
            ],
            info: [
                "جهت استفاده از این خدمات درخواست کتبی خود را به معاونت درمان ارسال نمائید تا پس از بررسی درخواست در کمیسیون ، در صورت موافقت خدمات به شما ارائه گردد.",
                "شماره 1842",
                "درخواست کتبی خود را به همراه برگ دستور فیزیوتراپی ممهور به مهر پزشک متخصص ارتوپدی یا جراح مغز و اعصاب به معاونت درمان ارسال تا پس از بررسی در کمیسیون درمان و موافقت، خدمات به شما ارائه گردد.",
                "بیمه شدگان رسمی و قراردادی شهرداری تهران\n" +
                "1- در صورت تماس با پزشک اورژانس می توانند درخواست آمبولانس نمایند. در صورت تشخیص پزشک اورژانس آمبولانس اعزام می شود.\n" +
                "2- در صورت نیاز به انتقال بیماران از بیمارستان به منزل می بایست این مطلب در دفترچه بیمه درمانی بیمار توسط پزشک تائید گردد.\n" +
                "3- در صورت نیاز به جابجایی بیمار از بیمارستان به مراکز درمانی و بالعکس می بایست این مطلب در دفترچه بیمه درمانی بیمار توسط پزشک تائید گردد. ",
                "شماره 1842",
                "کارکنان رسمی شهرداری تهران کاملا رایگان\n" +
                "کارکنان قراردادی دارای بیمه مکمل سینا با فرانشیز 30درصد -- (هزینه دوساعت اول 150،000 ریال)\n" +
                "کارکنان قراردادی بدون بیمه مکمل می بایست کلیه هزینه ها را به صورت آزاد پرداخت نمایند(هزینه استفاده دوساعت اول: 500،000 ریال -- پس از آن ساعتی 130،000 ریال)",
            ],
            questionsList: []
        }
    }

    componentDidMount() {
        var list = [];
        for (var i in this.state.questions) {
            for (var j in this.state.info) {
                if (i === j) {
                    var data = {name : this.state.questions[i],moreInfo:this.state.info[i]}
                    list.push(data)
                }
            }
        }
        this.setState({questionsList: list})
    }

    SelectQuestion(selectedQuestion) {
        this.props.navigation.navigate('MoreInfo', {backRoute: 'GuideScreen', question: selectedQuestion});
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
                        <Text style={styles.headerText}>راهنما</Text>
                    </Right>
                </Header>
                <Content padder style={styles.content}>
                    {
                        this.state.questionsList.map((l, i) => (
                            <ListItem
                                key={i}
                                title={l.name}
                                titleStyle={styles.titleStyle}
                                bottomDivider
                                onPress={() => this.SelectQuestion(l)}
                                leftIcon={<Icon type='FontAwesome' name='info-circle'
                                                style={styles.leftIconStyle}/>}
                            />
                        ))
                    }

                </Content>
            </Container>
        );
    }

}

GuidScreen.navigationOptions = {
    header: null,
    title: 'راهنما',
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
        padding:5,
        color: '#fff',
    },
    headerText: {
        padding:5,
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
    titleStyle: {
        color: '#000',
        fontSize: 10,
        textAlign: 'right'
    },
    leftIconStyle: {
        color: '#c7c7c7',
        fontSize: 15
    }
});
