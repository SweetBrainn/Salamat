import React, {Component} from 'react';
import {StyleSheet, View, Linking, StatusBar, WebView, Platform} from 'react-native';
import {Container, Header, Title, Content, Footer, Fab, Button, Left, Right, Toast, Icon, Text} from 'native-base';
import * as Permissions from 'expo-permissions';
import HTML from 'react-native-render-html';

export default class HomeScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            active: true,
        }

    }

    componentDidMount(): void {

    }

    render() {

        return (
            <Container>
                <StatusBar hidden translucent backgroundColor="transparent"/>
                <Header style={styles.header}>
                    <Left>
                        <Button transparent style={styles.headerMenuIcon}
                                onPress={() => this.props.navigation.openDrawer()}>
                            <Icon style={styles.headerMenuIcon} name='menu'
                                  onPress={() => this.props.navigation.openDrawer()}/>
                        </Button>
                    </Left>
                    <Right>
                        <Text style={styles.headerText}>نرم افزار سلامت</Text>
                    </Right>
                </Header>
                <Content scrollEnabled={false} style={{flex: 1}}>


                </Content>
                <Footer style={styles.footer}>
                    <View style={{flex: 1}}>
                    </View>
                    <Fab
                        active={this.state.active}
                        direction="up"
                        style={{backgroundColor: '#ef140b'}}
                        position="bottomRight"
                        onPress={() => (Linking.openURL('tel:1842'))}>
                        <Icon type='FontAwesome' name="phone"/>
                    </Fab>

                </Footer>
            </Container>
        );
    }

}

HomeScreen.navigationOptions = {
    header: null,
    title: 'نرم افزار سلامت',
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
        width: '100%',
        height: '100%',

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
    header: {
        backgroundColor: '#23b9b9'
    },
    footer: {
        backgroundColor: '#23b9b9'
    }
});
