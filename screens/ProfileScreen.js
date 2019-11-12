import React, {Component} from 'react';
import {StyleSheet, TextInput, View, Platform, StatusBar, Image, TouchableOpacity} from 'react-native';
import {
    Container,
    Header,
    Title,
    Content,
    Footer,
    FooterTab,
    Button,
    Card,
    Left,
    CardItem,
    Thumbnail,
    Right,
    Body,
    Icon,
    Text,
    Fab
} from 'native-base';
import Drawer from "react-native-drawer";
import SideMenu from "../Menu/SideMenu";


export default class ProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeFab: true,
            TextInputEditable: false,
            TextInputColor: '#7a7a7a',
            username: 'M.Hoseini',
            name: ' محمد ',
            family: ' حسینی ',
            nationalCode: '0021578953',
            birthDate: '1370/1/2',
            gender: 'مرد',
            FabIcon: 'edit',
            FabColor: '#23b9b9',
            headerText: 'حساب کاربری'
        };
    }


    FabClicked() {
        if (!this.state.TextInputEditable) {
            this.setState({
                TextInputEditable: true,
                TextInputColor: '#000',
                FabColor: '#68d14c',
                FabIcon: 'check',
                headerText: 'ویرایش حساب کاربری'
            })
        } else {
            this.setState({
                TextInputEditable: false,
                TextInputColor: '#7a7a7a',
                FabColor: '#23b9b9',
                FabIcon: 'edit',
                headerText: ' حساب کاربری'
            })
        }
    }

    render() {


        return (
            <Container>
                <StatusBar hidden translucent backgroundColor="transparent"/>
                <Header style={{
                    backgroundColor: '#23b9b9', shadowOffset: {height: 0, width: 0},
                    shadowOpacity: 0, shadowColor: '#23b9b9'
                }}>
                    <Left>
                        <Button transparent style={styles.headerMenuIcon}
                                onPress={() => this.props.navigation.openDrawer()}>
                            <Icon style={styles.headerMenuIcon} name="menu"
                                  onPress={() => this.props.navigation.openDrawer()}/>
                        </Button>
                    </Left>
                    <Right>
                        <Text style={styles.headerText}>{this.state.headerText}</Text>
                    </Right>
                </Header>
                <Content style={[styles.content]}>
                    <View style={styles.container}>
                        <View style={styles.header}></View>
                        <Image style={styles.avatar}
                               source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
                        <View style={styles.body}>
                            <View style={styles.card}>
                                <View style={styles.row}>
                                    <TextInput
                                        style={[styles.textInput, {color: this.state.TextInputColor}]}
                                        value={this.state.username}
                                        onChangeText={(text) => {
                                            this.setState({username: text})
                                        }}
                                        multiline={false}
                                        editable={this.state.TextInputEditable}/>
                                    <Text style={styles.label}>نام کاربری</Text>
                                </View>
                                <View style={styles.row}>
                                    <TextInput style={[styles.textInput, {color: this.state.TextInputColor}]}
                                               value={this.state.name}
                                               onChangeText={(text) => {
                                                   this.setState({name: text})
                                               }}
                                               multiline={false}
                                               editable={this.state.TextInputEditable}/>
                                    <Text style={styles.label}>نام</Text>
                                </View>
                                <View style={styles.row}>
                                    <TextInput style={[styles.textInput, {color: this.state.TextInputColor,}]}
                                               value={this.state.family}
                                               multiline={false}
                                               onChangeText={(text) => {
                                                   this.setState({family: text})
                                               }}
                                               multiline={false}
                                               editable={this.state.TextInputEditable}/>
                                    <Text style={styles.label}>نام خانوادگی</Text>
                                </View>
                                <View style={styles.row}>
                                    <TextInput style={[styles.textInput, {color: this.state.TextInputColor}]}
                                               value={this.state.nationalCode}
                                               onChangeText={(text) => {
                                                   this.setState({nationalCode: text})
                                               }}
                                               multiline={false}
                                               editable={this.state.TextInputEditable}/>
                                    <Text style={styles.label}>کد ملی</Text>
                                </View>
                                <View style={styles.row}>
                                    <TextInput style={[styles.textInput, {color: this.state.TextInputColor}]}
                                               value={this.state.birthDate}
                                               onChangeText={(text) => {
                                                   this.setState({birthDate: text})
                                               }}
                                               multiline={false}
                                               editable={this.state.TextInputEditable}/>
                                    <Text style={styles.label}>تاریخ تولد</Text>
                                </View>
                                <View style={[styles.row, {
                                    borderWidth: 0,
                                    borderColor: '#fff',
                                    borderBottomWidth: 0,
                                    borderBottomColor: '#fff'
                                }]}>
                                    <TextInput style={[styles.textInput]}
                                               value={this.state.gender}
                                               multiline={false}
                                               editable={false}/>
                                    <Text style={styles.label}>جنسیت</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </Content>
                <Footer style={styles.footer}>
                    <View style={{flex: 1, backgroundColor: '#fff'}}>
                        <Fab
                            active={this.state.active}
                            direction="up"
                            style={{backgroundColor: this.state.FabColor}}
                            position="bottomRight"
                            onPress={() => this.FabClicked()}>
                            <Icon type='FontAwesome' name={this.state.FabIcon}/>
                        </Fab>
                    </View>
                </Footer>
            </Container>
        );
    }

}

ProfileScreen.navigationOptions = {
    header: null,
    title: 'حساب کاربری',
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
        color: '#fff',
    },
    headerText: {
        fontSize: 20,
        padding: 5,
        color: '#fff',
    },
    container: {

        flex: 1
    },
    header: {
        width: '100%',
        backgroundColor: "#23b9b9",
        height: 180,
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom: 10,
        alignSelf: 'center',
        position: 'absolute',
        marginTop: 60
    },
    body: {
        marginTop: 5,
        backgroundColor: 'rgba(47,246,246,0.02)',
    },
    label: {
        textAlign: 'right',
        color: '#000',
        fontSize: 15,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        margin: 2,
        flex: 1,
        padding: 3,
    },
    textInput: {
        textAlign: 'right',
        fontSize: 15,
        padding: 3,
        alignSelf: 'flex-end',
        margin: 2,
        flex: 2,
    },
    card: {
        flexDirection: 'column',
        marginTop: 5,
        marginBottom: 5,
        marginRight: 20,
        marginLeft: 20,
        borderRadius: 5,
        borderColor: '#d8d8d8',
        borderWidth: 1,
        shadowColor: '#d8d8d8',
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 2,
        elevation: 8
    },
    row: {
        flexDirection: 'row',
        marginRight: 5,
        marginLeft: 5,
        marginTop: 10,
        marginBottom: 3
    },
    footer: {
        backgroundColor: '#fff'
    }
});
