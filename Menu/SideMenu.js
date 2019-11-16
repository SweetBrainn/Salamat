import React, {Component} from 'react';
import {StyleSheet, View, Text, ImageBackground, Image} from 'react-native';
import {Content, Container, Footer, Button, Header, Icon, Right, List, ListItem, Left, Body} from 'native-base';

const INDEX = 2; //index of homeScreen in drawer navigator
export default class SideMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            navigationState: {},
            user: {}
        }


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

    render() {

        let PARAMS = {};
        return (
            <Container>
                <View style={{height: '100%', width: '100%', backgroundColor: '#23b9b9'}}>
                    <View style={{height: '30%', width: '100%'}}>
                        <Image style={styles.headerImage}
                               source={require('D:\\E\\react native projects\\salamat\\assets\\images\\BACK.png')}/>
                    </View>
                    <Content style={[styles.container, {marginTop: 5}]}>
                        <List>
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
                            {this.getAccess('notice', 'admin') &&
                            <ListItem icon style={styles.listItem} onPress={() => {
                                this.props.navigation.navigate('InfoScreen')
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
                                this.props.navigation.navigate('ProfileScreen')
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
                                this.props.navigation.navigate('GuideScreen')
                            }}>
                                <Right>
                                    <Icon type='FontAwesome' name='info-circle' style={styles.icons}/>
                                </Right>
                                <Body>
                                    <Text style={styles.text}>راهنما</Text>
                                </Body>
                            </ListItem>}
                            {this.getAccess('exit', 'admin') &&
                            <ListItem icon style={styles.listItem}>
                                <Right>
                                    <Icon type='FontAwesome' name='power-off' style={styles.icons}/>
                                </Right>
                                <Body>
                                    <Text style={styles.text}>خروج</Text>
                                </Body>
                            </ListItem>}
                            {this.getAccess('information', 'admin') &&
                            <ListItem style={styles.listItem}>
                                <Body>
                                    <Text numberOfLines={1} style={styles.informationText}>سامانه نوبت دهی آنلاین
                                        شهرسالم شهرداری
                                        تهران</Text>
                                </Body>
                            </ListItem>
                            }
                        </List>
                    </Content>
                    <Footer style={{backgroundColor: '#23b9b9'}}>
                        {this.getAccess('information', 'admin') &&
                        <ListItem style={[styles.listItem, {alignSelf: 'flex-end'}]}>
                            <Body>
                                <Text style={styles.informationText}>سامانه نوبت دهی آنلاین شهرسالم شهرداری تهران</Text>
                            </Body>
                        </ListItem>}
                    </Footer>
                </View>
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
        width: '100%',
        height: '100%',
        flex: 1,

    },
    listItem: {
        margin: 5
    }
});