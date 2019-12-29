import React, {Component} from 'react';
import {StyleSheet, View, Linking, StatusBar, Platform, ActivityIndicator} from 'react-native';
import {Container, Header, Footer, Fab, Button, Left, Right, Icon, Text, Content} from 'native-base';
import * as Permissions from 'expo-permissions'
import * as Location from 'expo-location';
import Constants from 'expo-constants'
import {WebView} from 'react-native-webview';
import * as IntentLauncher from 'expo-intent-launcher';
import Modal, {ModalContent, SlideAnimation} from "react-native-modals";

// import DeviceInfo from 'react-native-device-info'

const map = '<!DOCTYPE html>\n' +
    '<html lang="en">\n' +
    '<head>\n' +
    '    <meta charset="UTF-8">\n' +
    '    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
    '    <meta name="viewport" content="height=device-height, initial-scale=1.0">\n' +
    '    <title>map</title>\n' +
    '</head>\n' +
    '<body>\n' +
    '<div style="flex-direction: row;flex: 1;justify-content: center;align-content: center">\n' +
    '    <div id="mapId" style="width: 96.5%;height: 96.5%;position: absolute">\n' +
    '\n' +
    '    </div>\n' +
    '\n' +
    '</div>\n' +
    '</body>\n' +
    '\n' +
    '<script src="http://tmap.tehran.ir/app/pub/index.php/application/api/key/47b38134190e432ea74623de53f91c34"></script>\n' +
    '<script>\n' +
    '    var map = null;\n' +
    '    var marker;\n' +
    '\n' +
    '\n' +
    '\n' +
    '\n' +
    '\n' +
    '    function LoadMap(panelId) {\n' +
    '        map = new MPS.Map(panelId, {controls: [\'Navigation\',\'ZoomBar\',\'ScaleLine\',\'Navigator\'], zoom: 1});\n' +
    '        marker = null;\n' +
    '        map.setCenter(new MPS.LonLat(35.637911, 51.390477), 3);\n' +
    '        var size = new MPS.Size(34, 34);\n' +
    '        var offset = new MPS.Pixel(-size.w / 2,(-size.h));\n' +
    '        var icon = new\n' +
    '        MPS.Icon(\'https://i.dlpng.com/static/png/1465417-download-this-image-as-map-marker-png-600_498_preview.png\',\n' +
    '            size, offset);\n' +
    '        var marker = new MPS.Marker(new MPS.LonLat(35.637911, 51.390477), icon);\n' +
    '        map.addMarker(marker);\n' +
    '\n' +
    '    }\n' +
    '\n' +
    '    LoadMap(\'mapId\');\n' +
    '\n' +
    '\n' +
    '</script>\n\n' +
    '\n' +
    '\n' +
    '</html>';
const javascript = '<script src="http://tmap.tehran.ir/app/pub/index.php/application/api/key/47b38134190e432ea74623de53f91c34"></script>\n' +
    '<script>\n' +
    '    var map = null;\n' +
    '    var marker;\n' +
    '\n' +
    '\n' +
    '\n' +
    '\n' +
    '\n' +
    '    function LoadMap(panelId) {\n' +
    '        map = new MPS.Map(panelId, {controls: [\'Navigation\',\'ZoomBar\',\'ScaleLine\',\'Navigator\'], zoom: 1});\n' +
    '        marker = null;\n' +
    '        map.setCenter(new MPS.LonLat(35.637911, 51.390477), 3);\n' +
    '        var size = new MPS.Size(34, 34);\n' +
    '        var offset = new MPS.Pixel(-size.w / 2,(-size.h));\n' +
    '        var icon = new\n' +
    '        MPS.Icon(\'https://i.dlpng.com/static/png/1465417-download-this-image-as-map-marker-png-600_498_preview.png\',\n' +
    '            size, offset);\n' +
    '        var marker = new MPS.Marker(new MPS.LonLat(35.637911, 51.390477), icon);\n' +
    '        map.addMarker(marker);\n' +
    '\n' +
    '    }\n' +
    '\n' +
    '    LoadMap(\'mapId\');\n' +
    '\n' +
    '\n' +
    '</script>\n'
export default class HomeScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            active: true,
            errorMessage: '',
            user: null,
            baseUrl: null,
            progressModalVisible: false,
        }

    }

    openSettings = async () => {
        if (Platform.OS === 'ios') {
            await Linking.openURL('app-settings:');
        } else {
            await IntentLauncher.startActivityAsync(
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

    async componentWillMount(): void {
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
                errorMessage: 'try on device'
            })
        } else {
            this._getLocationAsync();
        }
        this.setState(
            {user: this.props.navigation.getParam('user'), baseUrl: this.props.navigation.getParam('baseUrl')})
    }

    componentDidMount(): void {
        this.setState(
            {user: this.props.navigation.getParam('user'), baseUrl: this.props.navigation.getParam('baseUrl')})
    }

    render() {

        return (
            <Container>
                <StatusBar  translucent backgroundColor={"#219e9e"} barStyle={"light-content"}/>

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
                {/*<Content scrollEnabled={true} style={{flex: 1}}>*/}

                <View style={{flex: 1, width: '100%', height: '100%'}}>
                    <WebView
                        scalesPageToFit={true}
                        startInLoadingState={true}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        originWhitelist={['*']}
                        mixedContentMode='always'
                        scalesPageToFit={true}
                        onLoadStart={() => this.setState({progressModalVisible: true})}
                        onLoadEnd={() => this.setState({progressModalVisible: false})}
                        originWhitelist={['*']}
                        onLoadProgress={() => this.setState({progressModalVisible: !this.state.progressModalVisible})}
                        source={{html: map}}
                        injectedJavaScript={javascript}
                    />

                    <Modal style={{opacity: 0.7}}
                           width={300}
                           visible={this.state.progressModalVisible}
                           modalAnimation={new SlideAnimation({
                               slideFrom: 'bottom'
                           })}
                    >
                        <ModalContent style={[styles.modalContent, {backgroundColor: 'rgba(47,246,246,0.02)'}]}>
                            <ActivityIndicator animating={true} size="small" color={"#23b9b9"}/>
                        </ModalContent>
                    </Modal>
                </View>

                {/*</Content>*/}
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
    },
    modalContent: {
        marginTop: 5,
        padding: 2,
        alignContent: 'center',
        backgroundColor: 'rgba(47,246,246,0.06)'
    }
});