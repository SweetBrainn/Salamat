import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    StatusBar,
    TextInput,
    AsyncStorage,
    ActivityIndicator,
    TouchableOpacity,
    SafeAreaView
} from 'react-native';
import Modal, {ModalButton, ModalFooter, ModalTitle, SlideAnimation, ModalContent} from 'react-native-modals';
import JalaliCalendarPicker from 'react-native-jalali-calendar-picker';
import PersianCalendarPicker from 'react-native-persian-calendar-picker';
import Autocomplete from 'react-native-autocomplete-input'
import {
    Container,
    Header,
    Root,
    Content,
    Footer,
    TabHeading,
    Button,
    Left,
    Right,
    Tabs,
    Icon,
    Title,
    Card,
    Tab,
    ActionSheet, Body, Input
} from 'native-base';
import MedicalFilesScreen from "./MedicalFilesScreen";
import ShowReservesScreen from "./ShowReservesScreen";
import InboxScreen from "./InboxScreen";
import {ListItem} from "react-native-elements";

//date.format('jYYYY-jM-jD [is] YYYY-M-D')

const CANCEL_TEXT = 'انصراف';
const SEARCHMEDICALCENTERALLFIELD = '/api/SearchMedicalCenterAllField';
const SEARCHDOCTORALLFIELD = '/api/SearchDoctorAllField';
export default class ReserveScreen extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            //-----------------------ProgressBar States--------------------
            progressModalVisible: false,
            //-----------------------API States--------------------
            token: null,
            baseUrl: null,
            //-----------------------ActionSheets States--------------------
            selectedSkill: {id: -100, value: ' انتخاب تخصص'},
            selectedState: {id: -100, value: 'انتخاب منطقه'},
            selectedGender: {id: -100, value: ' انتخاب جنسیت'},
            //-----------------------Modal states---------------------------
            startDateModalVisible: false,
            endDateModalVisible: false,
            //-----------------------JalaliCalendar States------------------
            minDate: new Date(),
            selectedStartDate: null,
            selectedEndDate: null,
            //-----------------------BaseInfo States------------------------
            states: [
                {id: 0, value: '1'},
                {id: 1, value: '2'},
                {id: 2, value: '3'},
                {id: 3, value: '4'},
                {id: 4, value: '5'},
                {id: 5, value: '6'},
                {id: 6, value: '7'},
                {id: 7, value: '8'},
                {id: 8, value: '9'},
                {id: 9, value: '10'},
                {id: 10, value: '11'},
                {id: 11, value: '12'},
                {id: 12, value: '13'},
                {id: 13, value: '14'},
                {id: 14, value: '15'},
                {id: 15, value: '16'},
                {id: 16, value: '17'},
                {id: 17, value: '18'},
                {id: 18, value: '19'},
                {id: 19, value: '20'},
                {id: 20, value: '21'},
                {id: 21, value: '22'},
            ],
            skills: [
                {id: 0, value: 'دندانپزشک'},
                {id: 1, value: 'چشم پزشک'},
                {id: 2, value: 'فیزیوتراپ'},
                {id: 3, value: 'روانپزشک'},
                {id: 4, value: 'جراح فک و دندان'},
                {id: 5, value: 'پزشک داخلی'},
            ],
            genders: [
                {id: 0, value: 'آقا'},
                {id: 1, value: 'خانم'},
                {id: 2, value: 'آقا یا خانم'}
            ],
            years: [
                {id: 0, value: '1398'},
                {id: 1, value: '1399'},
            ],
            month: [
                {id: 0, value: 'فروردین'},
                {id: 1, value: 'اردیبهشت'},
                {id: 2, value: 'خرداد'},
                {id: 3, value: 'تیر'},
                {id: 4, value: 'مرداد'},
                {id: 5, value: 'شهریور'},
                {id: 6, value: 'مهر'},
                {id: 7, value: 'آبان'},
                {id: 8, value: 'آذر'},
                {id: 9, value: 'دی'},
                {id: 10, value: 'بهمن'},
                {id: 11, value: 'اسفند'},
            ],
            days: [
                {id: 0, value: '1'},
                {id: 1, value: '2'},
                {id: 2, value: '3'},
                {id: 3, value: '4'},
                {id: 4, value: '5'},
                {id: 5, value: '6'},
                {id: 6, value: '7'},
                {id: 7, value: '8'},
                {id: 8, value: '9'},
                {id: 9, value: '10'},
                {id: 10, value: '11'},
                {id: 11, value: '12'},
                {id: 12, value: '13'},
                {id: 13, value: '14'},
                {id: 14, value: '15'},
                {id: 15, value: '16'},
                {id: 16, value: '17'},
                {id: 17, value: '18'},
                {id: 18, value: '19'},
                {id: 19, value: '20'},
                {id: 20, value: '21'},
                {id: 21, value: '22'},
                {id: 22, value: '23'},
                {id: 23, value: '24'},
                {id: 24, value: '25'},
                {id: 25, value: '26'},
                {id: 26, value: '27'},
                {id: 27, value: '28'},
                {id: 28, value: '29'},
                {id: 29, value: '30'},
                {id: 30, value: '31'},
            ],
            dates: [
                {id: 0, value: '9 تا 12'},
                {id: 1, value: '12 تا 14'},
                {id: 2, value: '14 تا 16'},
                {id: 3, value: '16 تا 18'},
                {id: 4, value: '18 تا 20'},
            ],
            //-----------------------AutoComplete States------------------------
            medicalCenters: [],
            medicalCenterText: '',
            selectedMedicalCenter: {},
            medicalCenterPreviousLength: -1,
            doctors: [],
            doctorText: '',
        };
        (this: any).onStartDateChange = this.onStartDateChange.bind(this);
        (this: any).onEndDateChange = this.onEndDateChange.bind(this);
    }


    async componentWillMount(): void {
        var token = await AsyncStorage.getItem('token');
        var baseUrl = await AsyncStorage.getItem('baseUrl')
        await this.setState({baseUrl: baseUrl, token: token})
    }

    async generateMedicalCenterAutoComplete(text) {
        await this.setState({progressModalVisible: true})
        await fetch(this.state.baseUrl + SEARCHMEDICALCENTERALLFIELD, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                Accept: 'application/json',
                'Authorization': 'Bearer ' + new String(this.state.token)
            },
            body: JSON.stringify({
                searchWord: text
            })
        }).then((response) => response.json())
            .then((responseData) => {
                if (responseData['StatusCode'] === 200) {
                    if (responseData['Data'] != null) {
                        let data = responseData['Data'];
                        this.setState({progressModalVisible: false}, () => {
                            this.setState({medicalCenters: data})
                        })
                    }
                } else {
                    this.setState({progressModalVisible: false}, () => {
                        alert(JSON.stringify('خطا در دسترسی به سرویس'))
                    })

                }
            })
            .catch((error) => {
                console.error(error)
                // alert(error)
            })
    }

    onStartDateChange(date) {
        this.setState({selectedStartDate: date});
    }

    onEndDateChange(date) {
        this.setState({selectedEndDate: date});
    }

    getOptions(array) {
        let options = [];
        for (let item of array) {
            options.push(item.value)
        }
        options.push(CANCEL_TEXT)
        return options;
    }

    getObject(array, title) {
        let obj = {id: 0, value: title};
        for (let item of array) {
            if (item.value === title) {
                obj.id = item.id
            }
            break
        }
        return obj;
    }

    getCancelButtonIndex(array) {
        return array.indexOf(CANCEL_TEXT)
    }

    getMaxDate() {
        let date = new Date();
        date.setMonth(this.state.minDate.getUTCMonth() + 3)
        return date;
    }

    render() {
        return (
            <Container>
                <StatusBar hidden translucent backgroundColor="transparent"/>
                <Header hasTabs style={{backgroundColor: '#23b9b9'}}>
                    <Left>
                        <Button transparent style={styles.headerMenuIcon}
                                onPress={() => this.props.navigation.openDrawer()}>
                            <Icon style={styles.headerMenuIcon} name='menu'
                                  onPress={() => this.props.navigation.openDrawer()}/>
                        </Button>
                    </Left>
                    <Right>
                        <Text style={styles.headerText}>جستجوی نوبت</Text>
                    </Right>
                </Header>
                <Root>
                    <Content padder style={styles.content}>

                        {true && <Card style={styles.card}>
                            <View style={styles.row}>

                                <View style={{flex: 3}}>
                                    <Autocomplete
                                        data={this.state.medicalCenters}
                                        placeholder={'جستجوی نام مرکز،خدمات،منطقه و ...'}
                                        inputContainerStyle={{flexDirection: 'row-reverse'}}
                                        listStyle={{flexDirection: 'row-reverse'}}
                                        onChangeText={(searchTerm) => {
                                            if (searchTerm.length > this.state.medicalCenterPreviousLength) {
                                                (this.setState({
                                                        medicalCenterText: searchTerm,
                                                        medicalCenterPreviousLength: searchTerm.length
                                                    },
                                                    async () => {

                                                        if (searchTerm.length === 0) {
                                                            await this.setState({medicalCenters: []})
                                                        } else {
                                                            if (searchTerm.length >= 3) {
                                                                await this.generateMedicalCenterAutoComplete(searchTerm)
                                                            }
                                                        }

                                                    }))
                                            } else {
                                                this.setState({
                                                    medicalCenterText: searchTerm,
                                                    medicalCenterPreviousLength: searchTerm.length
                                                })
                                            }
                                        }}
                                        keyExtractor={(item, index) => index.toString()}
                                        value={this.state.medicalCenterText}
                                        renderItem={({item, i}) => (
                                            <View key={i}>
                                                <TouchableOpacity>
                                                    <Text>{item.Title}</Text>
                                                </TouchableOpacity>
                                            </View>
                                        )}
                                    />
                                </View>
                                <Text style={styles.label}>مرکز درمانی</Text>
                            </View>


                            <View style={styles.row}>
                                <TextInput style={styles.input}/>
                                <Text style={styles.label}>نام پزشک</Text>
                            </View>
                            <View style={styles.row}>
                                <Button
                                    onPress={() => {
                                        ActionSheet.show(
                                            {
                                                options: this.getOptions(this.state.skills),
                                                cancelButtonIndex: this.getCancelButtonIndex(
                                                    this.getOptions(this.state.skills)),
                                                title: "انتخاب تخصص"
                                            },
                                            buttonIndex => {
                                                if (buttonIndex <= this.state.skills.length - 1)
                                                    this.setState({selectedSkill: this.state.skills[buttonIndex]});
                                            }
                                        )
                                    }}
                                    bordered style={{
                                    textAlign: 'center',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 2,
                                    margin: 1,
                                    flex: 2,
                                    borderWidth: 1,
                                    borderColor: '#fff',

                                }}>
                                    <Text style={{
                                        padding: 1,
                                        textAlign: 'center',
                                        borderRadius: 2,
                                        flex: 2,
                                        fontSize: 13,
                                        color: '#23b9b9',
                                        borderWidth: 1,
                                        borderColor: '#23b9b9',

                                    }}>{this.state.selectedSkill.value}</Text>
                                </Button>
                                <Text style={styles.label}>تخصص</Text>
                            </View>
                            <View style={styles.row}>
                                <Button
                                    onPress={() => {
                                        ActionSheet.show(
                                            {
                                                options: this.getOptions(this.state.genders),
                                                cancelButtonIndex: this.getCancelButtonIndex(
                                                    this.getOptions(this.state.genders)),
                                                title: "انتخاب جنسیت"
                                            },
                                            buttonIndex => {
                                                if (buttonIndex <= this.state.genders.length - 1)
                                                    this.setState({selectedGender: this.state.genders[buttonIndex]});
                                            }
                                        )
                                    }}
                                    bordered style={{
                                    textAlign: 'center',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 2,
                                    margin: 1,
                                    flex: 2,
                                    borderWidth: 1,
                                    borderColor: '#fff',

                                }}>
                                    <Text style={{
                                        padding: 1,
                                        textAlign: 'center',
                                        borderRadius: 2,
                                        flex: 2,
                                        fontSize: 13,
                                        color: '#23b9b9',
                                        borderWidth: 1,
                                        borderColor: '#23b9b9',

                                    }}>{this.state.selectedGender.value}</Text>
                                </Button>
                                <Text style={styles.label}>جنسیت</Text>
                            </View>
                            <View style={styles.row}>
                                <Button
                                    onPress={() => {
                                        ActionSheet.show(
                                            {
                                                options: this.getOptions(this.state.states),
                                                cancelButtonIndex: this.getCancelButtonIndex(
                                                    this.getOptions(this.state.states)),
                                                title: "انتخاب منطقه"
                                            },
                                            buttonIndex => {
                                                if (buttonIndex <= this.state.states.length - 1)
                                                    this.setState({selectedState: this.state.states[buttonIndex]});
                                            }
                                        )
                                    }}
                                    bordered style={{
                                    textAlign: 'center',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 2,
                                    margin: 1,
                                    flex: 2,
                                    borderWidth: 1,
                                    borderColor: '#fff',

                                }}>
                                    <Text style={{
                                        padding: 1,
                                        textAlign: 'center',
                                        borderRadius: 2,
                                        flex: 2,
                                        fontSize: 13,
                                        color: '#23b9b9',
                                        borderWidth: 1,
                                        borderColor: '#23b9b9',

                                    }}
                                    >{this.state.selectedState.value}</Text>
                                </Button>
                                <Text style={styles.label}>منطقه</Text>
                            </View>
                            <View style={styles.row}>
                                <Button
                                    onPress={() => {
                                        this.setState({startDateModalVisible: true})
                                    }}
                                    bordered style={{
                                    textAlign: 'center',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 2,
                                    margin: 1,
                                    flex: 2,
                                    borderWidth: 1,
                                    borderColor: '#fff',

                                }}>
                                    <Text style={{
                                        padding: 1,
                                        textAlign: 'center',
                                        borderRadius: 2,
                                        flex: 2,
                                        fontSize: 13,
                                        color: '#23b9b9',
                                        borderWidth: 1,
                                        borderColor: '#23b9b9',

                                    }}>{this.state.selectedStartDate == null ? 'انتخاب تاریخ' :
                                        this.state.selectedStartDate.format('jYYYY-jM-jD')}</Text>
                                </Button>
                                <Text style={styles.label}>از تاریخ</Text>
                            </View>
                            <View style={styles.row}>
                                <Button
                                    onPress={() => {
                                        // ActionSheet.show(
                                        //     {
                                        //         options: this.getOptions(this.state.days),
                                        //         cancelButtonIndex: this.getCancelButtonIndex(
                                        //             this.getOptions(this.state.days)),
                                        //         title: "انتخاب تاریخ"
                                        //     },
                                        //     buttonIndex => {
                                        //         if (buttonIndex <= this.state.days.length - 1)
                                        //             this.setState({selectedDay: this.state.days[buttonIndex]});
                                        //     }
                                        // )
                                        this.setState({endDateModalVisible: true})
                                    }}
                                    bordered style={{
                                    textAlign: 'center',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 2,
                                    margin: 1,
                                    flex: 2,
                                    borderWidth: 1,
                                    borderColor: '#fff',

                                }}>

                                    <Text style={{
                                        padding: 1,
                                        textAlign: 'center',
                                        borderRadius: 2,
                                        flex: 2,
                                        fontSize: 13,
                                        color: '#23b9b9',
                                        borderWidth: 1,
                                        borderColor: '#23b9b9',

                                    }}>{this.state.selectedEndDate == null ? 'انتخاب تاریخ' :
                                        this.state.selectedEndDate.format('jYYYY-jM-jD')}</Text>
                                </Button>
                                <Text style={styles.label}>تا تاریخ</Text>
                            </View>
                        </Card>}

                  {false &&      <View style={styles.autocompletesContainer}>
                            <SafeAreaView>
                                <Autocomplete
                                    data={this.state.medicalCenters}
                                    placeholder={'جستجوی نام مرکز،خدمات،منطقه و ...'}
                                    inputContainerStyle={{flexDirection: 'row-reverse'}}
                                    listStyle={{flexDirection: 'row-reverse'}}
                                    onChangeText={(searchTerm) => {
                                        if (searchTerm.length > this.state.medicalCenterPreviousLength) {
                                            (this.setState({
                                                    medicalCenterText: searchTerm,
                                                    medicalCenterPreviousLength: searchTerm.length
                                                },
                                                async () => {

                                                    if (searchTerm.length === 0) {
                                                        await this.setState({medicalCenters: []})
                                                    } else {
                                                        if (searchTerm.length >= 3) {
                                                            await this.generateMedicalCenterAutoComplete(searchTerm)
                                                        }
                                                    }

                                                }))
                                        } else {
                                            this.setState({
                                                medicalCenterText: searchTerm,
                                                medicalCenterPreviousLength: searchTerm.length
                                            })
                                        }
                                    }}
                                    keyExtractor={(item, index) => index.toString()}
                                    value={this.state.medicalCenterText}
                                    listStyle={{
                                        flexDirection: 'row-reverse',
                                        padding: 2,
                                        backgroundColor: 'rgba(33,180,180,0.33)',
                                        marginTop: 3,
                                        marginBottom: 3,
                                        borderBottomWidth: 3,
                                        borderBottomColor: '#fff'
                                    }}
                                    renderItem={({item, i}) => (
                                            <TouchableOpacity style={{
                                                width: '100%',
                                                height: 30,
                                                borderBottomWidth: 1,
                                                borderBottomColor: '#fff',
                                                padding: 2
                                            }}
                                                              onPress={() => this.setState({
                                                                  medicalCenterText: item.Title,
                                                                  selectedMedicalCenter: {
                                                                      title: item.Title,
                                                                      id: item.Id
                                                                  }
                                                              })}>
                                                <Text style={{color: '#165e5e', textAlign: 'right'}}>{item.Title}</Text>
                                            </TouchableOpacity>
                                    )}
                                />
                            </SafeAreaView>
                        </View>
}
                        {/*<Card>*/}
                        {/*    <CardItem bordered style={{flexDirection: 'column'}}>*/}
                        {/*        <View style={[styles.row]}>*/}
                        {/*            <SearchableDropdown style={{alignSelf: 'flex-end', width: '100%',}}*/}
                        {/*                                multi={false}*/}
                        {/*                                onItemSelect={(item) => {*/}

                        {/*                                }}*/}
                        {/*                                containerStyle={{padding: 5}}*/}
                        {/*                                onRemoveItem={(item, index) => {*/}

                        {/*                                }}*/}
                        {/*                                itemStyle={{*/}
                        {/*                                    padding: 10,*/}
                        {/*                                    marginTop: 2,*/}
                        {/*                                    backgroundColor: '#fff',*/}
                        {/*                                    borderBottomColor: 'rgba(35,185,185,0.49)',*/}
                        {/*                                    borderTopColor: '#fff',*/}
                        {/*                                    borderRightColor: '#fff',*/}
                        {/*                                    borderLeftColor: '#fff',*/}
                        {/*                                    borderWidth: 1,*/}
                        {/*                                    borderRadius: 2,*/}
                        {/*                                }}*/}
                        {/*                                itemTextStyle={{*/}
                        {/*                                    color: 'rgba(34,34,34,0.72)',*/}
                        {/*                                    textAlign: 'right'*/}
                        {/*                                }}*/}
                        {/*                                itemsContainerStyle={{maxHeight: 200}}*/}
                        {/*                                items={medicalItems}*/}
                        {/*                                chip={false}*/}
                        {/*                                resetValue={false}*/}
                        {/*                                textInputProps={*/}
                        {/*                                    {*/}
                        {/*                                        placeholder: "جستجوی مرکز دزمانی",*/}
                        {/*                                        underlineColorAndroid: "transparent",*/}
                        {/*                                        placeholderTextColor: '#23b9b9',*/}
                        {/*                                        style: {*/}
                        {/*                                            padding: 12,*/}
                        {/*                                            borderWidth: 1,*/}
                        {/*                                            borderColor: '#ccc',*/}
                        {/*                                            borderRadius: 5,*/}
                        {/*                                            width: '100%',*/}
                        {/*                                            flex: 1*/}
                        {/*                                        },*/}
                        {/*                                        onTextChange: text => (this.search(text))*/}
                        {/*                                    }*/}
                        {/*                                }*/}
                        {/*                                listProps={*/}
                        {/*                                    {*/}
                        {/*                                        nestedScrollEnabled: true,*/}
                        {/*                                    }*/}
                        {/*                                }*/}
                        {/*            />*/}
                        {/*            <SearchableDropdown*/}
                        {/*                multi={false}*/}
                        {/*                onItemSelect={(item) => {*/}

                        {/*                }}*/}
                        {/*                containerStyle={{padding: 5}}*/}
                        {/*                onRemoveItem={(item, index) => {*/}

                        {/*                }}*/}
                        {/*                itemStyle={{*/}
                        {/*                    padding: 10,*/}
                        {/*                    marginTop: 2,*/}
                        {/*                    backgroundColor: '#fff',*/}
                        {/*                    borderBottomColor: 'rgba(35,185,185,0.49)',*/}
                        {/*                    borderTopColor: '#fff',*/}
                        {/*                    borderRightColor: '#fff',*/}
                        {/*                    borderLeftColor: '#fff',*/}
                        {/*                    borderWidth: 1,*/}
                        {/*                    borderRadius: 2,*/}
                        {/*                }}*/}
                        {/*                itemTextStyle={{*/}
                        {/*                    color: 'rgba(34,34,34,0.72)',*/}
                        {/*                    textAlign: 'right'*/}
                        {/*                }}*/}
                        {/*                itemsContainerStyle={{maxHeight: 200}}*/}
                        {/*                items={medicalItems}*/}
                        {/*                chip={false}*/}
                        {/*                resetValue={false}*/}
                        {/*                textInputProps={*/}
                        {/*                    {*/}
                        {/*                        placeholder: "منطقه",*/}
                        {/*                        underlineColorAndroid: "transparent",*/}
                        {/*                        placeholderTextColor: '#23b9b9',*/}
                        {/*                        style: {*/}
                        {/*                            padding: 12,*/}
                        {/*                            borderWidth: 1,*/}
                        {/*                            borderColor: '#ccc',*/}
                        {/*                            borderRadius: 5,*/}
                        {/*                            width: '100%',*/}
                        {/*                            flex: 1*/}
                        {/*                        },*/}
                        {/*                        onTextChange: text => (this.search(text))*/}
                        {/*                    }*/}
                        {/*                }*/}
                        {/*                listProps={*/}
                        {/*                    {*/}
                        {/*                        nestedScrollEnabled: true,*/}
                        {/*                    }*/}
                        {/*                }*/}
                        {/*            />*/}
                        {/*            <SearchableDropdown*/}
                        {/*                multi={false}*/}
                        {/*                onItemSelect={(item) => {*/}

                        {/*                }}*/}
                        {/*                containerStyle={{padding: 5}}*/}
                        {/*                onRemoveItem={(item, index) => {*/}

                        {/*                }}*/}
                        {/*                itemStyle={{*/}
                        {/*                    padding: 10,*/}
                        {/*                    marginTop: 2,*/}
                        {/*                    backgroundColor: '#fff',*/}
                        {/*                    borderBottomColor: 'rgba(35,185,185,0.49)',*/}
                        {/*                    borderTopColor: '#fff',*/}
                        {/*                    borderRightColor: '#fff',*/}
                        {/*                    borderLeftColor: '#fff',*/}
                        {/*                    borderWidth: 1,*/}
                        {/*                    borderRadius: 2,*/}
                        {/*                }}*/}
                        {/*                itemTextStyle={{*/}
                        {/*                    color: 'rgba(34,34,34,0.72)',*/}
                        {/*                    textAlign: 'right'*/}
                        {/*                }}*/}
                        {/*                itemsContainerStyle={{maxHeight: 200}}*/}
                        {/*                items={medicalItems}*/}
                        {/*                chip={false}*/}
                        {/*                resetValue={false}*/}
                        {/*                textInputProps={*/}
                        {/*                    {*/}
                        {/*                        placeholder: "خدمات",*/}
                        {/*                        underlineColorAndroid: "transparent",*/}
                        {/*                        placeholderTextColor: '#23b9b9',*/}
                        {/*                        style: {*/}
                        {/*                            padding: 12,*/}
                        {/*                            borderWidth: 1,*/}
                        {/*                            borderColor: '#ccc',*/}
                        {/*                            borderRadius: 5,*/}
                        {/*                            width: '100%',*/}
                        {/*                            flex: 1*/}
                        {/*                        },*/}
                        {/*                        onTextChange: text => (this.search(text))*/}
                        {/*                    }*/}
                        {/*                }*/}
                        {/*                listProps={*/}
                        {/*                    {*/}
                        {/*                        nestedScrollEnabled: true,*/}
                        {/*                    }*/}
                        {/*                }*/}
                        {/*            />*/}
                        {/*            <SearchableDropdown*/}
                        {/*                multi={false}*/}
                        {/*                onItemSelect={(item) => {*/}

                        {/*                }}*/}
                        {/*                containerStyle={{padding: 5}}*/}
                        {/*                onRemoveItem={(item, index) => {*/}

                        {/*                }}*/}
                        {/*                itemStyle={{*/}
                        {/*                    padding: 10,*/}
                        {/*                    marginTop: 2,*/}
                        {/*                    backgroundColor: '#fff',*/}
                        {/*                    borderBottomColor: 'rgba(35,185,185,0.49)',*/}
                        {/*                    borderTopColor: '#fff',*/}
                        {/*                    borderRightColor: '#fff',*/}
                        {/*                    borderLeftColor: '#fff',*/}
                        {/*                    borderWidth: 1,*/}
                        {/*                    borderRadius: 2,*/}
                        {/*                }}*/}
                        {/*                itemTextStyle={{*/}
                        {/*                    color: 'rgba(34,34,34,0.72)',*/}
                        {/*                    textAlign: 'right'*/}
                        {/*                }}*/}
                        {/*                itemsContainerStyle={{maxHeight: 200}}*/}
                        {/*                items={medicalItems}*/}
                        {/*                chip={false}*/}
                        {/*                resetValue={false}*/}
                        {/*                textInputProps={*/}
                        {/*                    {*/}
                        {/*                        placeholder: "سرویس",*/}
                        {/*                        underlineColorAndroid: "transparent",*/}
                        {/*                        placeholderTextColor: '#23b9b9',*/}
                        {/*                        style: {*/}
                        {/*                            padding: 12,*/}
                        {/*                            borderWidth: 1,*/}
                        {/*                            borderColor: '#ccc',*/}
                        {/*                            borderRadius: 5,*/}
                        {/*                            width: '100%',*/}
                        {/*                            flex: 1*/}
                        {/*                        },*/}
                        {/*                        onTextChange: text => (this.search(text))*/}
                        {/*                    }*/}
                        {/*                }*/}
                        {/*                listProps={*/}
                        {/*                    {*/}
                        {/*                        nestedScrollEnabled: true,*/}
                        {/*                    }*/}
                        {/*                }*/}
                        {/*            />*/}

                        {/*        </View>*/}
                        {/*    </CardItem>*/}


                        {/*    <CardItem bordered style={{flexDirection: 'column'}}>*/}
                        {/*        <View style={styles.viewStyle}>*/}
                        {/*            <View style={[styles.row]}>*/}
                        {/*                <SearchableDropdown style={{flex: 1, width: '100%',}}*/}
                        {/*                                    multi={false}*/}
                        {/*                                    onItemSelect={(item) => {*/}

                        {/*                                    }}*/}
                        {/*                                    containerStyle={{padding: 5}}*/}
                        {/*                                    onRemoveItem={(item, index) => {*/}

                        {/*                                    }}*/}
                        {/*                                    itemStyle={{*/}
                        {/*                                        padding: 10,*/}
                        {/*                                        marginTop: 2,*/}
                        {/*                                        backgroundColor: '#fff',*/}
                        {/*                                        borderBottomColor: 'rgba(35,185,185,0.49)',*/}
                        {/*                                        borderTopColor: '#fff',*/}
                        {/*                                        borderRightColor: '#fff',*/}
                        {/*                                        borderLeftColor: '#fff',*/}
                        {/*                                        borderWidth: 1,*/}
                        {/*                                        borderRadius: 2,*/}
                        {/*                                    }}*/}
                        {/*                                    itemTextStyle={{*/}
                        {/*                                        color: 'rgba(34,34,34,0.72)',*/}
                        {/*                                        textAlign: 'right'*/}
                        {/*                                    }}*/}
                        {/*                                    itemsContainerStyle={{maxHeight: 200}}*/}
                        {/*                                    items={medicalItems}*/}
                        {/*                                    chip={false}*/}
                        {/*                                    resetValue={false}*/}
                        {/*                                    textInputProps={*/}
                        {/*                                        {*/}
                        {/*                                            placeholder: " جستجوی پزشک",*/}
                        {/*                                            underlineColorAndroid: "transparent",*/}
                        {/*                                            placeholderTextColor: '#23b9b9',*/}
                        {/*                                            style: {*/}
                        {/*                                                padding: 12,*/}
                        {/*                                                borderWidth: 1,*/}
                        {/*                                                borderColor: '#ccc',*/}
                        {/*                                                borderRadius: 5,*/}
                        {/*                                                width: '100%'*/}
                        {/*                                            },*/}
                        {/*                                            // onTextChange: text => alert(text)*/}
                        {/*                                        }*/}
                        {/*                                    }*/}
                        {/*                                    listProps={*/}
                        {/*                                        {*/}
                        {/*                                            nestedScrollEnabled: true,*/}
                        {/*                                        }*/}
                        {/*                                    }*/}
                        {/*                />*/}
                        {/*            </View>*/}
                        {/*        </View>*/}
                        {/*    </CardItem>*/}

                        {/*    <CardItem footer bordered style={{flexDirection: 'column'}}>*/}
                        {/*        <Button success*/}
                        {/*                style={{alignContent: 'center', justifyContent: 'center', alignSelf: 'center'}}>*/}
                        {/*            <Text>رزرو نوبت</Text>*/}
                        {/*        </Button>*/}
                        {/*    </CardItem>*/}
                        {/*</Card>*/}

                        {/* ----------------------StartDate Modal---------------------------- */}
                        <Modal
                            onTouchOutside={() => {
                                this.setState({startDateModalVisible: false});
                            }}
                            visible={this.state.startDateModalVisible}
                            modalTitle={<ModalTitle style={styles.modalTitle} textStyle={styles.modalTitleText}
                                                    title="انتخاب تاریخ شروع"/>}
                            modalAnimation={new SlideAnimation({
                                slideFrom: 'bottom'
                            })}
                            footer={
                                <ModalFooter style={styles.modalFooter}>
                                    <ModalButton
                                        style={styles.modalCancelButton}
                                        textStyle={styles.modalCancelButtonText}
                                        text="انصراف"
                                        onPress={() => this.setState({startDateModalVisible: false})}
                                    />
                                    <ModalButton
                                        style={styles.modalSuccessButton}
                                        textStyle={styles.modalSuccessButtonText}
                                        text="انتخاب"
                                        onPress={() => this.setState({startDateModalVisible: false})}
                                    />
                                </ModalFooter>
                            }
                        >
                            <ModalContent style={styles.dateModalContent}>
                                <View>
                                    <PersianCalendarPicker
                                        enableSwipe={false}
                                        initDate={this.state.minDate}
                                        minDate={this.state.minDate}
                                        maxDate={this.getMaxDate()}
                                        previousTitle={'ماه قبل'}
                                        nextTitle={'ماه بعد'}
                                        selectedDayColor={'#23b9b9'}
                                        selectedDayTextColor={'#fff'}
                                        todayBackgroundColor={'#e6e6e6'}
                                        textStyle={{color: '#000'}}
                                        onDateChange={this.onStartDateChange}
                                    />
                                </View>
                            </ModalContent>
                        </Modal>
                        {/* ----------------------EndDate Modal---------------------------- */}
                        <Modal
                            onTouchOutside={() => {
                                this.setState({endDateModalVisible: false});
                            }}
                            visible={this.state.endDateModalVisible}
                            modalTitle={<ModalTitle style={styles.modalTitle} textStyle={styles.modalTitleText}
                                                    title="انتخاب تاریخ پایان"/>}
                            modalAnimation={new SlideAnimation({
                                slideFrom: 'bottom'
                            })}
                            footer={
                                <ModalFooter style={styles.modalFooter}>
                                    <ModalButton
                                        style={styles.modalCancelButton}
                                        textStyle={styles.modalCancelButtonText}
                                        text="انصراف"
                                        onPress={() => this.setState({endDateModalVisible: false})}
                                    />
                                    <ModalButton
                                        style={styles.modalSuccessButton}
                                        textStyle={styles.modalSuccessButtonText}
                                        text="انتخاب"
                                        onPress={() => this.setState({endDateModalVisible: false})}
                                    />
                                </ModalFooter>
                            }
                        >
                            <ModalContent style={styles.dateModalContent}>
                                <View>
                                    <PersianCalendarPicker
                                        enableSwipe={false}
                                        initDate={this.state.minDate}
                                        minDate={this.state.minDate}
                                        maxDate={this.getMaxDate()}
                                        previousTitle={'ماه قبل'}
                                        nextTitle={'ماه بعد'}
                                        selectedDayColor={'#23b9b9'}
                                        selectedDayTextColor={'#fff'}
                                        todayBackgroundColor={'#e6e6e6'}
                                        textStyle={{color: '#000'}}
                                        onDateChange={this.onEndDateChange}
                                    />
                                </View>
                            </ModalContent>
                        </Modal>


                        <Modal style={{opacity: 0.7}}
                               width={300}
                               visible={this.state.progressModalVisible}
                               modalAnimation={new SlideAnimation({
                                   slideFrom: 'bottom'
                               })}
                        >
                            <ModalContent style={[styles.modalContent, {backgroundColor: 'rgba(47,246,246,0.02)'}]}>
                                <ActivityIndicator animating={true} size="small" color={"#23b9b9"}/>
                            </ModalContent>
                        </Modal>

                    </Content>
                </Root>
                <Footer style={styles.footer}>
                    <Button style={styles.button} onPress={() => {
                        alert('clicked')
                    }}>
                        <Text style={[{color: '#fff', fontSize: 15}]}>جستجو</Text>
                    </Button>
                </Footer>
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
        fontSize: 20,
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
    },
    footer: {
        backgroundColor: '#fff'
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        flex: 1,
        marginRight: 20,
        marginLeft: 20,
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 5,
        backgroundColor: '#23b9b9'
    },
    card: {
        flexDirection: 'column',
        // margin: 5,
        //  borderRadius: 5,
        //  borderColor: '#23b9b9',
        // borderWidth: 1,
        // shadowColor: '#d8d8d8',
        // shadowOffset: {width: 0, height: 2},
        // shadowRadius: 2,
        //  elevation: 8
    },
    row: {
        flexDirection: 'row',
        // margin: 5,
        paddingTop: 5,
        paddingLeft: 1,
        paddingRight: 1
    },
    label: {
        alignSelf: 'flex-end',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 1,
        flex: 1,
        height: '100%',
        fontSize: 13,
        fontWeight: 'bold',
        textAlign: 'right'
    },
    myInput: {
        width: '100%',
        margin: 1,
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: 3,
        borderColor: '#eeeeee',
        borderWidth: 1,
        flex: 3,
        alignSelf: 'flex-start',
        padding: 1,
        textAlign: 'right'
    },
    modalTitle: {
        backgroundColor: '#23b9b9'
    },
    modalTitleText: {
        color: '#fff'
    },
    modalFooter: {
        padding: 2,
        backgroundColor: 'rgba(47,246,246,0.06)'
    },
    modalCancelButton: {
        backgroundColor: '#fff',
        borderRadius: 3,
        borderColor: '#23b9b9',
        borderWidth: 1,
        padding: 2,
        margin: 5
    },
    modalSuccessButton: {
        backgroundColor: '#23b9b9',
        borderRadius: 3,
        padding: 2,
        margin: 5
    },
    modalSuccessButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15
    },
    modalCancelButtonText: {
        color: '#23b9b9',
        fontSize: 15
    },
    dateModalContent: {
        backgroundColor: 'rgba(47,246,246,0.06)'
    },
    modalContent: {
        marginTop: 5,
        padding: 2,
        alignContent: 'center',
        backgroundColor: 'rgba(47,246,246,0.06)'
    },
    //--------------------------------------------------
    autocompletesContainer: {
        paddingTop: 0,
        zIndex: 1,
        width: "100%",
        paddingHorizontal: 8,
    },
    input: {maxHeight: 40},
    inputContainer: {
        display: "flex",
        flexShrink: 0,
        flexGrow: 0,
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: "#c7c6c1",
        paddingVertical: 13,
        paddingLeft: 12,
        paddingRight: "5%",
        width: "100%",
        justifyContent: "flex-start",
    },
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    plus: {
        position: "absolute",
        left: 15,
        top: 10,
    },
});
