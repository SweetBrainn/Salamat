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



export default class InboxScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            question: {}
        }
    }

    onBackPressed() {
        this.props.navigation.goBack()
    }

    render() {

        return (
            <Container>
                <Header span style={{backgroundColor: '#23b9b9'}}>
                    <Left>
                        <Button transparent style={styles.headerMenuIcon}
                                onPress={() => this.onBackPressed()}>
                            <Icon style={styles.headerMenuIcon} name='arrow-back'
                                  onPress={() => this.onBackPressed()}/>
                        </Button>
                    </Left>
                    <Body>
                        <Title style={styles.headerText}>پیام ها</Title>
                    </Body>
                </Header>
                <Content>

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
        padding:5,
        color: '#fff',
    },
    headerText: {
        padding:5,
        fontSize: 20,
        color: '#fff',

    },
    questionName: {
        alignSelf:'flex-start',
        justifyContent:'center',
        alignContent:'center',
        textAlign: 'right',
        fontSize: 10
    },
    questionInfo: {
        alignSelf:'flex-start',
        justifyContent:'center',
        alignContent:'center',
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
    header:{
        backgroundColor: "#23b9b9",
        height:150,
    },
    body:{
        marginTop:40,
    },
    bodyContent: {
        flex: 1,
        margin:10,
        alignItems: 'center',
        padding:10,
        borderWidth: 2,
        borderColor: '#23b9b9'
    },
});
