import React, {Component} from 'react';
import {StatusBar} from "react-native";
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
import DetailsForMedicalCenterScreen from './screens/DetailsForMedicalCenterScreen'
import MedicalCentersResult from "./screens/MedicalCentersResult";
import DoctorsResult from "./screens/DoctorsResult";
import ServicePlanResult from "./screens/ServicePlanResult";

const ReserveStackNavigator = createStackNavigator({
    ReserveScreen: {screen: ReserveScreen},
    ServicePlanResultScreen: {screen: ServicePlanResult},
});
const SearchDoctorNavigator = createStackNavigator({
    SearchDoctorScreen: {screen: SearchDoctorScreen},
    AdvanceSearchScreen: {screen: AdvanceSearchScreen},
    DetailsScreen: {screen: DetailsScreen},
    DoctorsResultScreen: {screen: DoctorsResult},
    ReserveScreen: ReserveStackNavigator,
}, {
    defaultNavigationOptions: {
        gesturesEnabled: false,
        header: null,
    }
});
const SearchMedicalCenterNavigator = createStackNavigator({
    SearchMedicalCenter: {screen: SearchMedicalCenter},
    AdvanceSearchScreen: {screen: AdvanceSearchScreen},
    DetailsForMedicalCenterScreen: {screen: DetailsForMedicalCenterScreen},
    MedicalCenterResultScreen: {screen: MedicalCentersResult},
    SearchDoctorScreen: SearchDoctorNavigator,
    ReserveScreen: ReserveStackNavigator

}, {
    defaultNavigationOptions: {
        header: null,
        gesturesEnabled: false,
    }
});


// const SearchDoctorNavigator = createStackNavigator({
//     SearchDoctorScreen: {screen: SearchDoctorScreen},
//     AdvanceSearchScreen: {screen: AdvanceSearchScreen},
//     DetailsScreen: {screen: DetailsScreen},
//     DoctorsResultScreen: {screen: DoctorsResult},
//     ReserveScreen: ReserveStackNavigator,
// }, {
//     defaultNavigationOptions: {
//         gesturesEnabled: false,
//         header: null,
//     }
// });


const VerificationStackNavigator = createStackNavigator({
    GetVerificationCodeScreen: {screen: GetVerificationCodeScreen},
    VerifyScreen: {screen: VerifyScreen}
});

const ChatStackNavigator = createStackNavigator({
    InboxScreen: {screen: InboxScreen},
    ChatScreen: {screen: ChatScreen}
}, {
    defaultNavigationOptions: {
        header: null,
        gesturesEnabled: false,
    }
});

const GuidStackNavigator = createStackNavigator({
    GuideScreen: {screen: GuidScreen},
    MoreInfo: {screen: MoreInfo}
}, {
    defaultNavigationOptions: {
        gesturesEnabled: false,
    }
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
        header: null,
        gesturesEnabled: false,
    }
});
const SplashStackNavigator = createStackNavigator({
    SplashScreen: {screen: SplashScreen},
    GetVerificationCodeScreen: {screen: GetVerificationCodeScreen},
    VerifyScreen: {screen: VerifyScreen},
    RegisterScreen: {screen: RegisterScreen}
}, {
    initialRouteName: 'SplashScreen',
    defaultNavigationOptions: {
        gesturesEnabled: false,
    }
});

const AppDrawerNavigator = createDrawerNavigator({
    RegisterScreen: {screen: RegisterScreen},
    HomeScreen: {screen: HomeScreen},
    ReserveScreen: ReserveStackNavigator,
    HistoryScreen: HistoryStackNavigator,
    ProfileScreen: {screen: ProfileScreen},
    GuideScreen: GuidStackNavigator,
    InfoScreen: {screen: NoticeScreen},
    SearchMedicalCenterScreen: SearchMedicalCenterNavigator,
    SearchDoctorScreen: SearchDoctorNavigator,
    GetVerificationCodeScreen: {screen: GetVerificationCodeScreen},
    VerifyScreen: VerificationStackNavigator

}, {
    defaultNavigationOptions: {
        gesturesEnabled: false,
    },
    initialRouteName: 'HomeScreen',
    contentComponent: SideMenu,
    user: {username: 'empty', password: 'empty', role: 'stranger'},
    drawerPosition: 'left',
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle'
});

const defaultGetStateForAction = AppDrawerNavigator.router.getStateForAction;

AppDrawerNavigator.router.getStateForAction = (action, state) => {
    if (state && action.type === 'Navigation/NAVIGATE' && action.routeName === 'DrawerClose') {
        StatusBar.setHidden(false);
    }

    if (state && action.type === 'Navigation/NAVIGATE' && action.routeName === 'DrawerOpen') {
        StatusBar.setHidden(true);
    }


    return defaultGetStateForAction(action, state);
};

const AppSwitchNavigator = createSwitchNavigator({
    SplashItem: SplashStackNavigator,
    HomeItem: AppDrawerNavigator,

}, {
    initialRouteName: 'SplashItem',
});

export default createAppContainer(AppSwitchNavigator);



