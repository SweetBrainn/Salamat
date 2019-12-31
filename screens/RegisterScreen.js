import React, {Component} from 'react';
import {StyleSheet, View, Platform, StatusBar, TextInput} from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';
import SearchMedicalCenter from "./SearchMedicalCenter";
import SearchDoctorScreen from "./SearchDoctorScreen";
import {
    Container,
    Header,
    Body,
    Content,
    CardItem,
    TabHeading,
    Button,
    Left,
    Right,
    Tabs,
    Icon,
    Text,
    Title,
    Card, Tab, Accordion
} from 'native-base';
import MedicalFilesScreen from "./MedicalFilesScreen";
import ShowReservesScreen from "./ShowReservesScreen";
import InboxScreen from "./InboxScreen";


export default class ReserveScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            patientUsername: '',
            nationalCode: '',
            cellPhone: '',
            firstName: '',
            lastName: '',
            birthDate: '',
            gender: '',
            description: '',
            address: '',
            zipCode: '',
        }
    }


    render() {
        return (
            <Container>
                <StatusBar translucent backgroundColor={"#219e9e"} barStyle={"light-content"}/>
                <Header hasTabs style={{backgroundColor: '#23b9b9'}}>
                    <Left>
                        <Button transparent style={styles.headerMenuIcon}
                                onPress={() => this.props.navigation.openDrawer()}>
                            <Icon style={styles.headerMenuIcon} name='menu'
                                  onPress={() => this.props.navigation.openDrawer()}/>
                        </Button>
                    </Left>
                </Header>
                <Tabs locked initialPage={this.state.initialPage}>
                    <Tab heading={<TabHeading><Text style={{fontSize: 10}}>انتخاب مرکز درمانی</Text></TabHeading>}>

                    </Tab>
                    <Tab heading={<TabHeading><Text style={{fontSize: 10}}>انتخاب پزشک</Text></TabHeading>}>

                    </Tab>
                    <Tab heading={<TabHeading><Text style={{fontSize: 10}}>رزرو نوبت</Text></TabHeading>}>

                    </Tab>
                </Tabs>
                <Content padder style={styles.content}>
                    <View style={styles.body}>
                        <View style={styles.card}>
                            <View style={styles.row}>
                                <TextInput
                                    style={[styles.textInput, {color: this.state.TextInputColor}]}
                                    value={this.state.user['user_name'] != null ? this.state.user['user_name'] :
                                        'نا مشخص'}
                                    onChangeText={(text) => {
                                        this.setState({username: text})
                                    }}
                                    multiline={false}
                                    editable={false}/>
                                <Text style={styles.label}>نام کاربری</Text>
                            </View>
                            <View style={styles.row}>
                                <TextInput style={[styles.textInput, {color: this.state.TextInputColor}]}
                                           value={this.state.user['first_name'] != null ?
                                               this.state.user['first_name'] : 'نا مشخص'}
                                           onChangeText={(text) => {
                                               this.setState({name: text})
                                           }}
                                           multiline={false}
                                           editable={this.state.TextInputEditable}/>
                                <Text style={styles.label}>نام</Text>
                            </View>
                            <View style={styles.row}>
                                <TextInput style={[styles.textInput, {color: this.state.TextInputColor,}]}
                                           value={this.state.user['last_name'] != null ?
                                               this.state.user['last_name'] : 'نا مشخص'}
                                           multiline={false}
                                           onChangeText={(text) => {
                                               this.setState({family: text})
                                           }}
                                           multiline={false}
                                           editable={false}/>
                                <Text style={styles.label}>نام خانوادگی</Text>
                            </View>
                            <View style={styles.row}>
                                <TextInput style={[styles.textInput, {color: this.state.TextInputColor}]}
                                           value={this.state.user['nationalCode'] != null ?
                                               this.state.user['nationalCode'] : 'نا مشخص'}
                                           onChangeText={(text) => {
                                               this.setState({nationalCode: text})
                                           }}
                                           multiline={false}
                                           editable={false}/>
                                <Text style={styles.label}>کد ملی</Text>
                            </View>
                            <View style={styles.row}>
                                <TextInput style={[styles.textInput, {color: this.state.TextInputColor}]}
                                           value={this.state.user['birthDate'] != null ?
                                               this.state.user['birthDate'] : 'نا مشخص'}
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
                                           value={this.state.user['gender'] != null ? this.state.user['gender'] :
                                               'نا مشخص'}
                                           multiline={false}
                                           editable={false}/>
                                <Text style={styles.label}>جنسیت</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>
                                    بیمه های من :
                                </Text>
                            </View>
                            {/*<View style={{padding: 5, margin: 5, marginTop: 10}}>*/}
                            <Accordion style={{margin: 5, flexDirection: 'column', flex: 1}}
                                       dataArray={this.state.insurancesForShow}
                                       headerStyle={{
                                           backgroundColor: "rgba(35,185,185,0.72)",
                                           flexDirection: 'row-reverse'
                                       }}
                                       contentStyle={{
                                           backgroundColor: "rgba(49,255,255,0)",
                                           flexDirection: 'row-reverse',
                                           backfaceVisibility: 'hidden',
                                           borderColor: '#23b9b9',
                                           borderWidth: 1

                                       }}

                                       iconStyle={{color: "white"}}
                                       expandedIconStyle={{color: "white"}}
                            />
                        </View>
                    </View>
                </Content>
            </Container>
        );
    }

}

ReserveScreen.navigationOptions = {
    header: null,
    title: 'نوبت دهی',
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
        paddingTop: 5,
        paddingBottom: 5,
        color: '#fff',
    },
    headerText: {
        fontSize: 15,
        padding: 5,
        color: '#fff',

    },
    headerIcon: {
        paddingTop: 5,
        paddingBottom: 5,
        fontSize: 15,
        color: '#fff'
    },
    icons: {
        color: '#fff',
        fontSize: 20
    },
    tabsText: {
        fontSize: 10,
        color: '#fff'
    },
    viewStyle: {
        flex: 1,
        flexDirection: 'column',
    },
    row: {
        width: '100%',
        flex: 1,
        alignSelf: 'center',
        flexDirection: 'row'
    }
});
