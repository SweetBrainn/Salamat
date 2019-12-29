import React, {Component} from 'react';

import {StyleSheet, View, Text, ImageBackground, Image, ActivityIndicator, StatusBar} from 'react-native';
import {
    Content,
    Container,
    Footer,
    CardItem,
    Thumbnail,
    Icon,
    Right,
    List,
    ListItem,
    Card,
    Body,
    Left
} from 'native-base';

const INDEX = 2; //index of homeScreen in drawer navigator
export default class SideMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            navigationState: {},
            animated: true,
            user: null,
            fullName: null,
            baseUrl: null

        }
    }

    componentWillMount(): void {
        this.generateFullName()

    }

    componentDidMount(): void {
        StatusBar.setHidden(true)
    }

    getAccess(menuItem, role) {
        if (role !== 'admin') {
            if (menuItem === 'guide') {
                return true
            }
            if (menuItem === 'notice') {
                return true
            }
            if (menuItem === 'exit') {
                return true
            }
            return false
        } else if (role === 'admin') {
            return true;
        }
    }

    generateFullName() {
        var routes = (this.props.navigation.state['routes'])
        var homeRoute = routes[1]
        var params = homeRoute['params']
        var user = params['user']
        var userInfo = user['userInfo']
        var fullName = userInfo['first_name'] + ' ' + userInfo['last_name']
        this.setState({fullName: fullName, user: userInfo, baseUrl: params['baseUrl']})
    }

    render() {

        let PARAMS = {};
        return (
            <Container>

                {/*<View style={{height: '100%', width: '100%', backgroundColor: '#23b9b9'}}>*/}
                <View style={{height: '20%', width: '100%', backgroundColor: '#23b9b9'}}>
                    <ImageBackground style={styles.headerImage}
                                     source={require(
                                         'D:\\E\\react native projects\\salamat\\assets\\images\\BACK.png')}>
                        <Card style={{backgroundColor: 'rgba(48,255,255,0)'}}>
                            <CardItem style={{backgroundColor: 'rgba(35,185,185,0.41)'}}>
                                <Left>
                                    <View>
                                        <Thumbnail large circular style={{
                                            alignContent: 'center',
                                            alignSelf: 'center',
                                            margin: 1,
                                            opacity: 1,
                                            borderWidth: 2,
                                            borderColor: '#fff'
                                        }}
                                                   source={{uri: 'https://i.pinimg.com/564x/f3/25/82/f32582233e16aecb8d7f4062bf895acb.jpg'}}/>
                                    </View>
                                </Left>
                                <Right>
                                    <Text style={[styles.text, {color: '#fff'}]}>
                                        {this.state.fullName != null ? this.state.fullName : ''}
                                    </Text>
                                </Right>
                            </CardItem>
                        </Card>

                    </ImageBackground>
                </View>
                <Content style={[styles.container, {marginTop: 5}]}>
                    <List>
                        {this.getAccess('reserve', 'admin') &&
                        <ListItem icon style={styles.listItem} onPress={() => {
                            this.props.navigation.navigate('HomeScreen')
                        }}>
                            <Right>
                                <Icon type='FontAwesome5' name='map-marked-alt' style={styles.icons}/>
                            </Right>
                            <Body style={styles.body}>
                                <Text style={styles.text}>صفحه اصلی</Text>
                            </Body>
                        </ListItem>}
                        {this.getAccess('personalInfo', 'admin') &&
                        <ListItem icon style={styles.listItem} onPress={() => {
                            this.props.navigation.navigate('HistoryScreen')
                        }}>
                            <Right>
                                <Icon type='FontAwesome' name='history' style={styles.icons}/>
                            </Right>
                            <Body>
                                <Text style={styles.text}>پرونده شخصی</Text>
                            </Body>
                        </ListItem>}
                        {this.getAccess('reserve', 'admin') &&
                        <ListItem icon style={styles.listItem} onPress={() => {
                            this.props.navigation.navigate('ReserveScreen')
                        }}>
                            <Right>
                                <Icon type='FontAwesome' name='calendar' style={styles.icons}/>
                            </Right>
                            <Body style={styles.body}>
                                <Text style={styles.text}>نوبت دهی</Text>
                            </Body>
                        </ListItem>}
                        {false && this.getAccess('personalInfo', 'admin') &&
                        <ListItem icon style={styles.listItem} onPress={() => {
                            this.props.navigation.navigate('HistoryScreen')
                        }}>
                            <Right>
                                <Icon type='FontAwesome' name='history' style={styles.icons}/>
                            </Right>
                            <Body>
                                <Text style={styles.text}>پرونده شخصی</Text>
                            </Body>
                        </ListItem>}
                        {this.getAccess('notice', 'admin') &&
                        <ListItem icon style={styles.listItem} onPress={() => {
                            this.props.navigation.navigate('InfoScreen', {
                                baseUrl: this.state.baseUrl != null ? this.state.baseUrl : 'empty'
                            })
                        }}>
                            <Right>
                                <Icon type='FontAwesome' name='bell' style={styles.icons}/>
                            </Right>
                            <Body>
                                <Text style={styles.text}>اطلاع رسانی</Text>
                            </Body>
                        </ListItem>}
                        {this.getAccess('searchDoctor', 'admin') &&
                        <ListItem icon style={styles.listItem} onPress={() => {
                            this.props.navigation.navigate('SearchDoctorScreen', {medicalCenter: ''})
                        }}>
                            <Right>
                                <Icon type='FontAwesome' name='user-md' style={styles.icons}/>
                            </Right>
                            <Body>
                                <Text style={styles.text}>جستجوی پزشک</Text>
                            </Body>
                        </ListItem>}
                        {this.getAccess('searchMedicalCenter', 'admin') &&
                        <ListItem icon style={styles.listItem} onPress={() => {
                            this.props.navigation.navigate('SearchMedicalCenterScreen')
                        }}>
                            <Right>
                                <Icon type='FontAwesome' name='h-square' style={styles.icons}/>
                            </Right>
                            <Body>
                                <Text style={styles.text}>جستجوی مراکز درمانی</Text>
                            </Body>
                        </ListItem>}
                        {this.getAccess('profile', 'admin') &&
                        <ListItem icon style={styles.listItem} onPress={() => {
                            this.props.navigation.navigate('ProfileScreen', {
                                user: this.state.user != null ? this.state.user
                                    : console.error('user == null => when I want to navigate into profile Screen user'),
                                baseUrl: this.state.baseUrl != null ? this.state.baseUrl : 'empty'
                            })
                        }}>
                            <Right>
                                <Icon type='FontAwesome' name='user-circle' style={styles.icons}/>
                            </Right>
                            <Body>
                                <Text style={styles.text}>حساب کاربری</Text>
                            </Body>
                        </ListItem>}
                        {this.getAccess('guide', 'admin') &&
                        <ListItem icon style={styles.listItem} onPress={() => {
                            this.props.navigation.navigate('GuideScreen', {
                                user: this.state.user != null ? this.state.user
                                    : console.error('user == null => when I want to navigate into profile Screen user'),
                                baseUrl: this.state.baseUrl != null ? this.state.baseUrl : 'empty'
                            })
                        }}>
                            <Right>
                                <Icon type='FontAwesome' name='info-circle' style={styles.icons}/>
                            </Right>
                            <Body>
                                <Text style={styles.text}>راهنما</Text>
                            </Body>
                        </ListItem>}
                        {this.getAccess('exit', 'admin') &&
                        <ListItem icon style={styles.listItem} onPress={() => {
                            RNExitApp.exitApp()
                        }}>
                            <Right>
                                <Icon type='FontAwesome' name='power-off' style={styles.icons}/>
                            </Right>
                            <Body>
                                <Text style={styles.text}>خروج</Text>
                            </Body>
                        </ListItem>}
                    </List>
                </Content>

                {/*</View>*/}
                <Footer style={{backgroundColor: '#23b9b9', flexDirection: 'row'}}>
                    {this.getAccess('information', 'admin') &&
                    <View style={{flex: 1}}>
                        <ListItem style={[{alignSelf: 'center', margin: 0, borderColor: '#23b9b9'}]}>
                            <Body>
                                <Text style={styles.informationText}>سامانه نوبت دهی آنلاین شهرسالم شهرداری تهران</Text>
                            </Body>
                        </ListItem>
                    </View>
                    }
                </Footer>
            </Container>
        )
            ;
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#23b9b9'
    },
    informationText: {
        color: '#fff',
        alignContent: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        fontSize: 11,
    },
    text: {
        color: '#fff',
        alignSelf: 'flex-end',
        fontSize: 18
    },
    body: {
        flexDirection: 'column'
    },
    icons: {
        color: '#fff'
    },
    headerSpan: {
        width: '70%',
        backgroundColor: '#23b9b9'
    },
    headerImage: {
        resizeMode: 'contain',
        width: '100%',
        height: '100%',
        flex: 1,
        opacity: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        alignContent: 'center'
    },
    listItem: {
        flex: 1,
        margin: 3,

    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 63,
        borderWidth: 2,
        borderColor: "white",
        alignSelf: 'center',
        position: 'absolute',
    }
});