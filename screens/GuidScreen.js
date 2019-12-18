import React, {Component} from 'react';
import {StyleSheet, View, Image, StatusBar, AsyncStorage, ActivityIndicator} from 'react-native';
import {
    Container,
    Header,
    Title,
    Content,
    Accordion,
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
import Modal, {ModalContent, SlideAnimation} from "react-native-modals";

const GETQUESTIONS = '/api/GetQuestions';
export default class GuidScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            token: null,
            baseUrl: null,
            questions: null,
            progressModalVisible: true,
        }
    }

    async componentWillMount(): void {
        var token = await AsyncStorage.getItem('token');
        var baseUrl = await AsyncStorage.getItem('baseUrl');
        this.setState({baseUrl: baseUrl, token: token}, () => {
            this.getQuestions()
        })
    }


    async getQuestions() {
        this.setState({progressModalVisible: true})
        fetch(this.state.baseUrl + GETQUESTIONS, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                Accept: 'application/json',
                'Authorization': 'Bearer ' + new String(this.state.token)
            },
        }).then((response) => response.json())
            .then((responseData) => {
                if (responseData['StatusCode'] === 200) {
                    if (responseData['Data'] != null) {
                        let data = responseData['Data'];
                        this.setState({questions: data}, () => {
                            this.setState({progressModalVisible: false})
                        })
                    }
                } else {
                    this.setState({progressModalVisible: false}, () => {
                        alert('خطا در اتصال به سرویس')
                    })

                }
            })
            .catch((error) => {
                console.error(error)
                // alert(error)
            })
    }


    SelectQuestion(selectedQuestion) {
        this.props.navigation.navigate('MoreInfo', {backRoute: 'GuideScreen', question: selectedQuestion});
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
                        <Text style={styles.headerText}>راهنما</Text>
                    </Right>
                </Header>
                <Content padder style={styles.content}>

                    <Card style={styles.card} cardItemPadding={14}>
                        <CardItem style={styles.cardHeader} header bordered>
                            <Body style={styles.body}>
                                <Text style={[styles.titleStyle,
                                    {fontSize: 15, fontWeight: 'bold', color: '#23b9b9'}]}>سوالات
                                    متداول بیماران سامانه سلامت
                                </Text>
                            </Body>
                        </CardItem>
                        <List Indent style={{backgroundColor: '#fff'}}>
                            {this.state.questions != null &&
                            this.state.questions.map((l, i) => (
                                <ListItem
                                    containerStyle={{backgroundColor: 'rgba(37,180,180,0.42)'}}
                                    noIndent
                                    style={[styles.items,]}
                                    key={i}
                                    title={l.title}
                                    titleStyle={styles.titleStyle}
                                    bottomDivider
                                    onPress={() => this.SelectQuestion(l)}
                                    leftIcon={<Icon type='FontAwesome' name='info-circle'
                                                    style={styles.leftIconStyle}/>}
                                />
                            ))
                            }
                        </List>
                    </Card>
                    <Modal style={{opacity: 0.7}}
                           width={300}
                           visible={this.state.progressModalVisible}
                           modalAnimation={new SlideAnimation({
                               slideFrom: 'bottom'
                           })}
                    >
                        <ModalContent style={styles.modalContent}>
                            <ActivityIndicator animating={true} size="small" color={"#23b9b9"}/>
                        </ModalContent>
                    </Modal>
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
        fontSize: 20
    },
    card: {
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#23a5a5',
        borderRadius: 1,
        elevation: 8,
        margin: 2,
    },
    titleStyle: {
        color: '#fff',
        fontSize: 13,
        textAlign: 'right'
    },
    leftIconStyle: {
        color: '#1f9292',
        fontSize: 15
    },
    items: {
        padding: 2,
        margin: 2,
    },
    body: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center'
    },
    cardHeader: {
        borderWidth: 1,
        borderBottomColor: '#1f9292',
        borderColor: '#fff'
    },
    modalContent: {
        marginTop: 5,
        padding: 2,
        alignContent: 'center',
        backgroundColor: 'rgba(47,246,246,0.02)'
    }
});
