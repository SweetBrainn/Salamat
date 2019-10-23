import React, {Component} from 'react';
import {StyleSheet, View, Text, ImageBackground, Image} from 'react-native';
import {Content, Container, Footer, Button, Header, Icon, Right, List, ListItem, Left, Body} from 'native-base';


export default class SideMenu extends Component {
    render() {
        return (
            <View style={{height: '100%', width: '100%', backgroundColor: '#23b9b9'}}>
                <View style={{height: '30%', width: '100%'}}>
                    <Image style={styles.headerImage}
                           source={require('D:\\E\\react native projects\\salamat\\assets\\images\\BACK.png')}/>
                </View>
                <Content style={[styles.container, {marginTop: 5}]}>
                    <List>
                        <ListItem icon style={styles.listItem} onPress={() => {
                            this.props.navigation.navigate('ReserveScreen')
                        }}>
                            <Right>
                                <Icon type='FontAwesome' name='calendar' style={styles.icons}/>
                            </Right>
                            <Body style={styles.body}>
                                <Text style={styles.text}>نوبت دهی</Text>
                            </Body>
                        </ListItem>
                        <ListItem icon style={styles.listItem} onPress={() => {
                            this.props.navigation.navigate('HistoryScreen')
                        }}>
                            <Right>
                                <Icon type='FontAwesome' name='history' style={styles.icons}/>
                            </Right>
                            <Body>
                                <Text style={styles.text}>پرونده شخصی</Text>
                            </Body>
                        </ListItem>
                        <ListItem icon style={styles.listItem} onPress={() => {
                            this.props.navigation.navigate('InfoScreen')
                        }}>
                            <Right>
                                <Icon type='FontAwesome' name='bell' style={styles.icons}/>
                            </Right>
                            <Body>
                                <Text style={styles.text}>اطلاع رسانی</Text>
                            </Body>
                        </ListItem>
                        <ListItem icon style={styles.listItem} onPress={() => {
                            this.props.navigation.navigate('SearchMedicScreen')
                        }}>
                            <Right>
                                <Icon type='FontAwesome' name='user-md' style={styles.icons}/>
                            </Right>
                            <Body>
                                <Text style={styles.text}>جستجوی پزشک</Text>
                            </Body>
                        </ListItem>
                        <ListItem icon style={styles.listItem} onPress={() => {
                            this.props.navigation.navigate('SearchMedicalCenterScreen')
                        }}>
                            <Right>
                                <Icon type='FontAwesome' name='h-square' style={styles.icons}/>
                            </Right>
                            <Body>
                                <Text style={styles.text}>جستجوی مراکز درمانی</Text>
                            </Body>
                        </ListItem>
                        <ListItem icon style={styles.listItem} onPress={() => {
                            this.props.navigation.navigate('ProfileScreen')
                        }}>
                            <Right>
                                <Icon type='FontAwesome' name='user-circle' style={styles.icons}/>
                            </Right>
                            <Body>
                                <Text style={styles.text}>حساب کاربری</Text>
                            </Body>
                        </ListItem>
                        <ListItem icon style={styles.listItem} onPress={() => {
                            this.props.navigation.navigate('GuideScreen')
                        }}>
                            <Right>
                                <Icon type='FontAwesome' name='info-circle' style={styles.icons}/>
                            </Right>
                            <Body>
                                <Text style={styles.text}>راهنما</Text>
                            </Body>
                        </ListItem>
                        <ListItem icon style={styles.listItem}>
                            <Right>
                                <Icon type='FontAwesome' name='power-off' style={styles.icons}/>
                            </Right>
                            <Body>
                                <Text style={styles.text}>خروج</Text>
                            </Body>
                        </ListItem>
                    </List>
                </Content>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#23b9b9'
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