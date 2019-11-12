import React, {Component} from 'react';
import {StyleSheet, View, Platform, StatusBar} from 'react-native';
import {
    Container,
    Header,
    Title,
    Content,
    Footer,
    FooterTab,
    Button,
    Tabs,
    Tab,
    TabHeading,
    Icon,
    Text,
    Left,
    Right
} from 'native-base';
import Drawer from "react-native-drawer";
import SideMenu from "../Menu/SideMenu";
import MedicalFilesScreen from "./MedicalFilesScreen";
import ShowReservesScreen from "./ShowReservesScreen";
import OldReserveScreen from "./OldReservesScreen";
import InboxScreen from "./InboxScreen";

export default class HistoryScreen extends Component {
    render() {
        return (
            <Container>
                <StatusBar hidden translucent backgroundColor="transparent"/>
                <Header style={{backgroundColor: '#23b9b9'}}>
                    <Left>
                        <Button transparent style={styles.headerMenuIcon}
                                onPress={() => this.props.navigation.openDrawer()}>
                            <Icon style={styles.headerMenuIcon} name='menu'
                                  onPress={() => this.props.navigation.openDrawer()}/>
                        </Button>
                    </Left>
                    <Right>
                        <Text style={styles.headerText}>پرونده شخصی</Text>
                    </Right>
                </Header>
                <Tabs tabBarPosition={'top'} tabContainerStyle={[styles.tabHeading]} locked
                      tabBarUnderlineStyle={{height: 5, backgroundColor: "#1e8080"}} tabBarActiveTextColor={'#1e8080'}>
                    <Tab heading={<TabHeading style={styles.tabHeading}><Icon
                        type={'FontAwesome5'} style={styles.tabIcon} name="notes-medical"/><Text style={styles.tabText}>نسخه
                        ها</Text></TabHeading>}>
                        <MedicalFilesScreen/>
                    </Tab>
                    <Tab heading={<TabHeading style={styles.tabHeading}><Icon
                        type={'FontAwesome5'} style={styles.tabIcon} name="calendar-alt"/><Text style={styles.tabText}>نوبت
                        ها</Text></TabHeading>}>
                        <ShowReservesScreen/>
                    </Tab>
                    <Tab heading={<TabHeading style={styles.tabHeading}><Icon
                        type={'FontAwesome5'} style={styles.tabIcon} name="inbox"/><Text style={styles.tabText}>پیام
                        ها</Text></TabHeading>}>
                        <InboxScreen myNavigator={this.props.navigation}/>
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
        );
    }

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
    },
    tabHeading: {
        backgroundColor: '#fff'
    },
    tabIcon: {
        fontSize: 20,
        color: '#1e8080'
    },
    tabText: {
        fontSize: 10,
        color: '#1e8080'
    }
});
