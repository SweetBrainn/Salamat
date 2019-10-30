import React, {Component} from 'react';
import {StyleSheet, View, Image, ScrollView, Alert} from 'react-native';
import Swipeable from 'react-native-swipeable-row'
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


const MyPost = (props) => {
    return (
        <Card style={[styles.post]}>
            <CardItem header style={{backgroundColor: props.myColor}}>
                <Body>
                    <Text style={styles.titleText}>{props.title}</Text>
                </Body>
            </CardItem>
            <CardItem style={{backgroundColor: props.myColor}}>
                <Body>
                    <Text style={styles.contentText}>{props.content}</Text>
                </Body>
            </CardItem>
        </Card>
    )
}
export default class ShowReservesScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            array: [
                {title: "چهارشنبه 1398/8/1", content: "رزرو نوبت با دکتر رضایی متخصص مغز و اعصاب"},
                {title: "شنبه 1398/8/5", content: "رزرو نوبت با دکتر حسینی متخصص گوارش"},
                {title: "جمعه 1398/8/7", content: "رزرو نوبت با دکتر رضایی متخصص مغز و اعصاب"},
                {title: "جمعه 1398/8/7", content: "رزرو نوبت با دکتر رضایی متخصص مغز و اعصاب"},
                {title: "جمعه 1398/8/7", content: "رزرو نوبت با دکتر رضایی متخصص مغز و اعصاب"},
                {title: "جمعه 1398/8/7", content: "رزرو نوبت با دکتر رضایی متخصص مغز و اعصاب"},
                {title: "جمعه 1398/8/7", content: "رزرو نوبت با دکتر رضایی متخصص مغز و اعصاب"},
                {title: "جمعه 1398/8/7", content: "رزرو نوبت با دکتر رضایی متخصص مغز و اعصاب"},
                {title: "جمعه 1398/8/7", content: "رزرو نوبت با دکتر رضایی متخصص مغز و اعصاب"},
            ]
        }
    }

    deleteMessage({value, index}) {
        delete this.state.array[index];
        this.setState({array: this.state.array}, () => {
            // alert('حذف انجام شد')
        })

    }

    onBackPressed() {
        this.props.navigation.goBack()
    }

    renderList(value, index) {
        if (index <= 3) {
            return (
                <View key={index}>
                    <Swipeable rightButtons={[<Button onPress={() => {
                        this.deleteMessage({value, index})
                    }} style={{height: '100%',margin:2}} danger>
                        <Icon name='trash'/>
                    </Button>]}
                               onRightActionRelease={() => this.deleteMessage({value, index})}
                    >
                        <MyPost title={value.title} content={value.content}
                                myColor='#50d177'/>
                    </Swipeable>
                </View>
            )
        } else {
            return (
                <View key={index}>
                    <Swipeable rightButtons={[<Button onPress={() => {
                        this.deleteMessage({value, index})
                    }} style={{height: '100%',margin:2}} danger>
                        <Icon name='trash'/>
                    </Button>]}
                               onRightActionRelease={() => this.deleteMessage({value, index})}
                    >
                        <MyPost title={value.title} content={value.content}
                                myColor='#909090'/>
                    </Swipeable>
                </View>
            )
        }

    }

    render() {

        return (
            <Container>
                <Header transparent style={{backgroundColor: '#23b9b9'}}>
                    {/* <Left>
                        <Button transparent style={styles.headerMenuIcon}
                                onPress={() => this.onBackPressed()}>
                            <Icon style={styles.headerMenuIcon} name='arrow-back'
                                  onPress={() => this.onBackPressed()}/>
                        </Button>
                    </Left> */}
                    <Body>
                        {/* <Title style={styles.headerText}>نوبت های رزرو شده</Title> */}
                    </Body>
                </Header>
                <Content>
                    <View style={styles.container}>
                        <ScrollView>
                            {this.state.array.map((value, index) =>
                                this.renderList(value, index)
                            )}
                        </ScrollView>
                    </View>
                </Content>
            </Container>

        );
    }

}

ShowReservesScreen.navigationOptions = {
    header: null,
    title: 'نوبت های رزرو شده',
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
    post: {
        margin: 2,
        flex: 0,
        backgroundColor: '#e4e4e4'
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
