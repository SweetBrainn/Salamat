import React, { Component } from 'react';
import { StyleSheet, View, Platform, StatusBar } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Tabs, Tab, TabHeading, Icon, Text,Left,Right } from 'native-base';
import Drawer from "react-native-drawer";
import SideMenu from "../Menu/SideMenu";
import MedicalFilesScreen from "./MedicalFilesScreen";
import ShowReservesScreen from "./ShowReservesScreen";
import OldReserveScreen from "./OldReservesScreen";
import InboxScreen from "./InboxScreen";

export default class HistoryScreen extends Component {
    render() {
        return (

            <Drawer
                ref={(ref) => {
                    this._drawer = ref
                }}
                content={<SideMenu navigator />}
                onClose={() => this.closeDrawer()}
            >
                <Container>
                    <Header hasTabs style={{ backgroundColor: '#23b9b9' }}>
                        <Left>
                            <Button transparent style={styles.headerMenuIcon}
                                onPress={() => this.props.navigation.openDrawer()}>
                                <Icon style={styles.headerMenuIcon} name='menu'
                                    onPress={() => this.props.navigation.openDrawer()} />
                            </Button>
                        </Left>
                        <Right>
                        <Text style={styles.headerText}>پرونده شخصی</Text>
                        </Right>
                    </Header>
                    <Tabs>
                        <Tab heading={<TabHeading><Text style={{ fontSize: 10 }}>نسخه ها</Text></TabHeading>}>
                            <MedicalFilesScreen />
                        </Tab>
                        <Tab heading={<TabHeading><Text style={{ fontSize: 10 }}>نوبت ها</Text></TabHeading>}>
                            <ShowReservesScreen />
                        </Tab>
                        <Tab heading={<TabHeading><Text style={{ fontSize: 10 }}>پیام ها</Text></TabHeading>}>
                            <InboxScreen />
                        </Tab>
                    </Tabs>
                    {/*<Content padder style={styles.content}>*/}
                    {/*    <View style={{width: '100%', height: '100%'}}>*/}
                    {/*        <View style={styles.row}>*/}
                    {/*            <View style={[styles.card, {backgroundColor: '#23b9b9', borderColor: '#23b9b9'}]}>*/}
                    {/*                <Button transparent style={{flexDirection: 'column'}} onPress={() => {*/}
                    {/*                    this.props.navigation.navigate('ShowReservesScreen')*/}
                    {/*                }}>*/}
                    {/*                    <Icon style={styles.iconOfCard} type='FontAwesome5' name='calendar-day'/>*/}
                    {/*                    <Text style={styles.textOfCard}>نوبت های رزرو شده</Text>*/}
                    {/*                </Button>*/}
                    {/*            </View>*/}
                    {/*            <View style={[styles.card, {backgroundColor: '#aeaaaf', borderColor: '#aeaaaf'}]}>*/}
                    {/*                <Button transparent style={{flexDirection: 'column'}} onPress={() => {*/}
                    {/*                    this.props.navigation.navigate('MedicalFilesScreen')*/}
                    {/*                }}>*/}
                    {/*                    <Icon style={styles.iconOfCard} type='FontAwesome' name='clipboard'/>*/}
                    {/*                    <Text style={styles.textOfCard}>نسخه های من</Text>*/}
                    {/*                </Button>*/}
                    {/*            </View>*/}
                    {/*        </View>*/}
                    {/*        <View style={styles.row}>*/}
                    {/*            <View style={[styles.card, {backgroundColor: '#aeaaaf', borderColor: '#aeaaaf'}]}>*/}
                    {/*                <Button transparent style={{flexDirection: 'column'}}*/}
                    {/*                        onPress={() => {*/}
                    {/*                            this.props.navigation.navigate('OldReservesScreen')*/}
                    {/*                        }}*/}

                    {/*                >*/}
                    {/*                    <Icon style={styles.iconOfCard} type='FontAwesome' name='calendar'/>*/}
                    {/*                    <Text style={styles.textOfCard}>نوبت های قبلی</Text>*/}
                    {/*                </Button>*/}
                    {/*            </View>*/}
                    {/*            <View style={[styles.card, {backgroundColor: '#23b9b9', borderColor: '#23b9b9'}]}*/}
                    {/*            >*/}
                    {/*                <Button transparent style={{flexDirection: 'column'}}*/}
                    {/*                        onPress={() => {*/}
                    {/*                            this.props.navigation.navigate('InboxScreen',{navigationObject:this.props.navigation})*/}
                    {/*                        }}*/}

                    {/*                >*/}
                    {/*                    <Icon style={styles.iconOfCard} type='FontAwesome' name='inbox'/>*/}
                    {/*                    <Text style={styles.textOfCard}>پیام ها</Text>*/}
                    {/*                </Button>*/}
                    {/*            </View>*/}
                    {/*        </View>*/}
                    {/*    </View>*/}
                    {/*</Content>*/}
                    {/*<Footer>*/}
                    {/*    <FooterTab*/}
                    {/*        tabActiveBgColor="#4fb5f9"*/}
                    {/*        tabBarActiveTextColor="#2d83bc"*/}
                    {/*        tabBarTextColor="#6b6b6b"*/}
                    {/*    >*/}
                    {/*        <Button>*/}
                    {/*            <Text style={{fontSize:15,color:'#23b9b9'}}>نسخه های من</Text>*/}
                    {/*        </Button>*/}
                    {/*        <Button>*/}
                    {/*            <Text style={{fontSize:15,color:'#23b9b9'}}>نوبت های من</Text>*/}
                    {/*        </Button>*/}
                    {/*        <Button active>*/}
                    {/*            <Text style={{fontSize:15,color:'#23b9b9'}}>پیام های من</Text>*/}
                    {/*        </Button>*/}
                    {/*    </FooterTab>*/}
                    {/*</Footer>*/}
                </Container>
            </Drawer>
        );
    }

}

HistoryScreen.navigationOptions = {
    header: null,
    title: 'پرونده شخصی',
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
        padding: 5,
        color: '#fff',
    },
    headerText: {
        padding: 5,
        fontSize: 20,
        color: '#fff',

    },
    card: {
        flex: 1,
        flexDirection: 'column',
        borderRadius: 2,
        justifyContent: 'center',
        alignContent: 'center',
        padding: 5,
        height: 200,
        borderWidth: 1,
        elevation: 8,
        margin: 2,
        alignSelf: 'stretch'
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        height: '50%',
        marginTop: 10
    },
    textOfCard: {
        color: '#fff',
        fontSize: 15,
        alignContent: 'center',
        textAlign: 'center',
        alignSelf: 'center'
    },
    iconOfCard: {
        color: '#fff',
        fontSize: 25,
        marginBottom: 5,
        alignContent: 'center',
        textAlign: 'center',
        alignSelf: 'center'
    }
});
