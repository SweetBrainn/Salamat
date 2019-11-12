import React, {Component} from 'react';
import {StyleSheet, View, Linking, StatusBar, WebView} from 'react-native';
import {Container, Header, Title, Content, Footer, Fab, Button, Left, Right, Toast, Icon, Text} from 'native-base';
import * as Permissions from 'expo-permissions';
import HTML from 'react-native-render-html';

const htmlPage = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>map</title>
</head>
<body>
<Text>hiii</Text>
<div style="flex-direction: row;flex: 1;justify-content: center;align-content: center">
<div id="mapId" style="width: 500px;height:500px;position: center;padding-left: 600px">

</div>
</div>
</body>

<script src="http://tmap.tehran.ir/app/pub/index.php/application/api/key/47b38134190e432ea74623de53f91c34"></script>
<script>
    var map = null;
    var marker;

 $(document).ready(function () {
        LoadMap('mapId')
    });

    function LoadMap(panelId) {
        
        map = new MPS.Map(panelId, {controls: ['Navigation'], zoom: 4});
        marker = null;
    }
LoadMap('mapId')
    
</script>


</html>`

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

                {/*<HTML html={htmlPage}/>*/}

                <Content scrollEnabled={false} style={{flex: 1}}>

                    <HTML
                        html={htmlPage}
                        style={{flex: 1}}
                        mixedContentMode='always'
                    />

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
