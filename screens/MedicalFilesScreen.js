import React, { Component } from 'react';
import { StyleSheet, View, Modal, ScrollView } from 'react-native';
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
            <CardItem header style={{ backgroundColor: props.myColor }}>
                <Body>
                    <Text style={styles.titleText}>{props.title}</Text>
                </Body>
            </CardItem>
            <CardItem style={{ backgroundColor: props.myColor }}>
                <Body>
                    <Text style={styles.contentText}>{props.content}</Text>
                </Body>
            </CardItem>
        </Card>
    )
}
export default class MedicalFilesScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            array: [
                { title: "چهارشنبه 1398/8/1", content: "نسخه شماره 1" },
                { title: "شنبه 1398/8/5", content: "نسخه شماره 2" },
                { title: "جمعه 1398/8/7", content: "نسخه شماره 3" },
            ]
        }
    }

    onBackPressed() {
        this.props.navigation.goBack()
    }
    renderList(value, index) {
        if (index <= 3) {
            return (
                <View key={index}>
                    <MyPost title={value.title} content={value.content}
                        myColor='#fff' />
                </View>
            )
        } else {
            return (
                <View key={index}>
                    <MyPost title={value.title} content={value.content}
                        myColor='#fff' />
                </View>
            )
        }

    }

    render() {

        return (
            <Container>
                <Header transparent style={{ backgroundColor: '#23b9b9' }}>
                    <Left>
                        <Button transparent style={styles.headerMenuIcon}
                            onPress={() => this.onBackPressed()}>
                            {/*<Icon style={styles.headerMenuIcon} name='arrow-back'*/}
                            {/*      onPress={() => this.onBackPressed()}/>*/}
                        </Button>
                    </Left>
                    <Body>
                        {/* <Title style={styles.headerText}>نسخه های من</Title> */}
                    </Body>
                </Header>
                <Content>
                    <ScrollView>
                        {this.state.array.map((value, index) =>
                            this.renderList(value, index)
                        )}
                    </ScrollView>
                </Content>
            </Container>

        );
    }

}

MedicalFilesScreen.navigationOptions = {
    header: null,
    title: 'نسخه های من',
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
        color: '#000',
        textAlign: 'left',
        alignSelf: 'flex-end',
        fontWeight: 'bold'
    },
    contentText: {
        color: '#000',
        textAlign: 'left',
        alignSelf: 'flex-end',
        marginTop: 5,
        fontSize: 15
    }
});
