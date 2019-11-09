import React, {Component} from 'react';
import {createDrawerNavigator, createAppContainer, createStackNavigator, createSwitchNavigator} from "react-navigation";
import HomeScreen from './screens/HomeScreen'
import SplashScreen from "./screens/SplashScreen";
import SideMenu from "./Menu/SideMenu";
import ReserveScreen from "./screens/ReserveScreen";
import HistoryScreen from "./screens/HistoryScreen";
import ProfileScreen from "./screens/ProfileScreen";
import GuidScreen from "./screens/GuidScreen";
import NoticeScreen from "./screens/NoticeScreen"
import MoreInfo from "./screens/MoreInfo";
import SearchMedicalCenter from "./screens/SearchMedicalCenter";
import ShowReservesScreen from "./screens/ShowReservesScreen"
import InboxScreen from "./screens/InboxScreen"
import MedicalFilesScreen from "./screens/MedicalFilesScreen"
import OldReservesScreen from "./screens/OldReservesScreen";
import ChatScreen from "./screens/MyChatScreen"
import GetVerificationCodeScreen from "./screens/GetVerificationCodeScreen";
import VerifyScreen from "./screens/VerifyScreen";
import SearchDoctorScreen from "./screens/SearchDoctorScreen";
import AdvanceSearchScreen from "./screens/AdvanceSearchScreen"
import DetailsScreen from "./screens/DetailsScreen"
import RegisterScreen from "./screens/RegisterScreen";

const SearchMedicalCenterNavigator = createStackNavigator({
    SearchMedicalCenter: {screen: SearchMedicalCenter},
    AdvanceSearchScreen: {screen: AdvanceSearchScreen},
    DetailsScreen: {screen: DetailsScreen},
    SearchDoctorScreen: {screen: SearchDoctorScreen}
},);

const SearchDoctorNavigator = createStackNavigator({
    SearchDoctorScreen: {screen: SearchDoctorScreen},
    AdvanceSearchScreen: {screen: AdvanceSearchScreen},
    DetailsScreen: {screen: DetailsScreen}
});

const VerificationStackNavigator = createStackNavigator({
    GetVerificationCodeScreen: {screen: GetVerificationCodeScreen},
    VerifyScreen: {screen: VerifyScreen}
});

const ChatStackNavigator = createStackNavigator({
    InboxScreen: {screen: InboxScreen},
    ChatScreen: {screen: ChatScreen}
}, {
    defaultNavigationOptions: {
        header: null
    }
});
const GuidStackNavigator = createStackNavigator({
    GuideScreen: {screen: GuidScreen},
    MoreInfo: {screen: MoreInfo}
})
const HistoryStackNavigator = createStackNavigator({
    HistoryScreen: {screen: HistoryScreen},
    InboxScreen: ChatStackNavigator,
    // InboxScreen:{screen:InboxScreen},
    ChatScreen: {screen: ChatScreen},
    MedicalFilesScreen: {screen: MedicalFilesScreen},
    ShowReservesScreen: {screen: ShowReservesScreen},
    OldReservesScreen: {screen: OldReservesScreen}
}, {
    initialRouteName: 'HistoryScreen',
    defaultNavigationOptions: {
        header: null
    }
});
const AppDrawerNavigator = createDrawerNavigator({
    RegisterScreen:{screen:RegisterScreen},
    SplashScreen: {screen: SplashScreen},
    HomeScreen: {screen: HomeScreen},
    ReserveScreen: {screen: ReserveScreen},
    HistoryScreen: HistoryStackNavigator,
    ProfileScreen: {screen: ProfileScreen},
    GuideScreen: GuidStackNavigator,
    InfoScreen: {screen: NoticeScreen},
    SearchMedicalCenterScreen: SearchMedicalCenterNavigator,
    SearchDoctorScreen: SearchDoctorNavigator,
    GetVerificationCodeScreen: {screen: GetVerificationCodeScreen},
    VerifyScreen: VerificationStackNavigator

}, {
    initialRouteName: 'SplashScreen',
    // initialRouteName: 'RegisterScreen',
    // initialRouteName:'GetVerificationCodeScreen',
    // initialRouteName:'VerifyScreen',
    contentComponent: SideMenu,
    drawerPosition: 'left',
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle'
});
export default createAppContainer(AppDrawerNavigator);

