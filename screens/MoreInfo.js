import React, {Component} from 'react';
import {StyleSheet, View, Text, StatusBar} from 'react-native';
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
    List,
} from 'native-base';


export default class MoreInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            question: {}
        }
    }

    componentDidMount() {
        this.setState({question: this.props.navigation.getParam('question')})
    }

    onBackPressed() {
        this.props.navigation.goBack()
    }

    render() {

        return (
            <Container>
                <StatusBar hidden translucent backgroundColor="transparent"/>
                <Header span style={{backgroundColor: '#23b9b9'}}>
                    <Left>
                        <Button transparent style={styles.headerMenuIcon}
                                onPress={() => this.onBackPressed()}>
                            <Icon style={styles.headerMenuIcon} name='arrow-back'
                                  onPress={() => this.onBackPressed()}/>
                        </Button>
                    </Left>
                    <Body>
                        <Title style={styles.headerText}>اطلاعات بیشتر</Title>
                    </Body>
                </Header>
                <Content>

                    <View style={{flex: 1}}>
                        <View style={styles.header}></View>
                        <View style={styles.body}>
                            <View style={styles.bodyContent}>
                                <Card style={styles.card}>
                                    <CardItem header style={{flexDirection:'row-reverse'}}>
                                        <Text style={styles.questionName}>{this.state.question.title}</Text>
                                    </CardItem>
                                    <CardItem style={{flexDirection:'row-reverse'}}>
                                        <Text style={styles.questionInfo}>{this.state.question.content}</Text>
                                    </CardItem>
                                </Card>
                            </View>
                            <View style={{
                                flex: 1,
                                margin: 2,
                                flexDirection: 'row',
                                alignItems: 'center',
                                backgroundColor: '#fff',
                                padding: 5,
                                borderWidth: 2,
                                borderColor: '#fff'
                            }}>
                                <Text style={styles.offer}>در صورت نیاز به اطلاعات بیشتر لطفا با شماره 1842 تماس
                                    بگیرید</Text>
                            </View>
                        </View>
                    </View>

                </Content>
            </Container>

        );
    }

}

MoreInfo.navigationOptions = {
    header: null,
    title: 'اطلاعات بیشتر',
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

    },
    headerMenuIcon: {
        padding: 5,
        color: '#fff',
    },
    headerText: {
        padding: 5,
        fontSize: 20,
        color: '#fff',
        alignSelf: 'flex-end'

    },
    questionName: {
        alignSelf: 'flex-start',
        justifyContent: 'center',
        alignContent: 'center',
        textAlign: 'right',
        fontSize: 10,
        fontWeight:'bold'
    },
    questionInfo: {
        alignSelf: 'flex-start',
        justifyContent: 'center',
        alignContent: 'center',
        textAlign: 'right',
        fontSize: 10
    },
    offer: {
        flex: 1,
        alignSelf: 'flex-start',
        justifyContent: 'center',
        alignContent: 'center',
        textAlign: 'center',
        fontSize: 10,
        color: 'gray'
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
        backgroundColor: '#23b9b9',
        height: 120,
    },
    body: {
        marginTop: 20,
    },
    bodyContent: {
        flex: 1,
        margin: 5,
        alignItems: 'center',
        backgroundColor: 'rgba(47,250,250,0.08)',
        padding: 10,
        borderWidth: 2,
        borderColor: '#23b9b9'
    },
});
