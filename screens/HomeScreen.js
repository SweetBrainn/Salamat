import React, {Component} from 'react';
import {StyleSheet, View, Linking, StatusBar, Alert, Platform} from 'react-native';
import {Container, Header, Title, Content, Footer, Fab, Button, Left, Right, Toast, Icon, Text} from 'native-base';
import HTML from 'react-native-render-html';
import * as Permissions from 'expo-permissions'
import * as Location from 'expo-location';
import Constants from 'expo-constants'
import * as IntentLauncher from 'expo-intent-launcher';
import DeviceInfo from 'react-native-device-info'
import apiAddress from "apiAddress.json";

const AUTHENTICATE_ADDRESS = apiAddress.base + apiAddress.authenticate ;
export default class HomeScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            active: true,
            errorMessage: '',
        }

    }

    openSettings = () => {
        if (Platform.OS == 'ios') {
            Linking.openURL('app-settings:');
        } else {
            IntentLauncher.startActivityAsync(
                IntentLauncher.ACTION_LOCATION_SOURCE_SETTINGS
            );
        }
    }

    _getLocationAsync = async () => {
        try {
            let {status} = await Permissions.askAsync(Permissions.LOCATION);
            if (status !== 'granted') {
                this.setState({errorMessage: 'Permission to access location denied'})
            }
            let location = await Location.getCurrentPositionAsync({});
            this.setState({location})
        } catch (error) {
            let status = Location.getProviderStatusAsync();
            // if (!status.locationServicesEnabled) {
            //     Alert.alert(
            //     Alert.alert(
            //         '',
            //         'لطفا به برنامه برای دسترسی به موقعیت فعلی خود دسترسی دهید'
            //         ,
            //         [
            //             {
            //                 text: 'انصراف',
            //                 styles: 'cancel'
            //             },
            //             {text: 'تایید', onPress: () => this.openSettings()},
            //         ],
            //         {cancelable: true},
            //     );
            // }
        }

    }

     componentWillMount(): void {
        let data={username: 'testUsername',deviceId:DeviceInfo.getUniqueId().toString()}
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
                errorMessage: 'try on device'
            })
        } else {
             this._getLocationAsync();
        }

        fetch(AUTHENTICATE_ADDRESS, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "same-origin",
        }).then(response => {
            return response.json()
        })
            .then(jsonData => {
                alert(JSON.stringify(jsonData))
            })
            .catch(err => {
                alert(err.message.toString())
            })
    }


    // async alertIfLocationDisabledAsync() {
    //     const { status } = await Permissions.getAsync(Permissions.LOCATION);
    //     if (status !== 'granted') {
    //         Alert.alert(
    //             '',
    //             'لطفا به برنامه برای دسترسی به موقعیت فعلی خود دسترسی دهید'
    //             ,
    //             [
    //                 {text: 'انصراف',
    //                 styles:'cancel'
    //                 },
    //                 {text: 'تایید', onPress: () => Linking.openURL('app-settings:')},
    //             ],
    //             {cancelable: true},
    //         );
    //
    //     }
    // }
    // componentDidMount(): void {
    //     this.alertIfLocationDisabledAsync()
    // }

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
