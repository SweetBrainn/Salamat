import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    StatusBar,
    TextInput,
    AsyncStorage,
    ActivityIndicator,
    Keyboard
} from 'react-native';
import Modal, {ModalButton, ModalFooter, ModalTitle, SlideAnimation, ModalContent} from 'react-native-modals';
import PersianCalendarPicker from 'react-native-persian-calendar-picker';
import {
    Container,
    Header,
    Root,
    Content,
    Footer,
    Button,
    Left,
    Right,
    Icon,
    Card,
    ActionSheet, Body, Input
} from 'native-base';


//date.format('jYYYY-jM-jD [is] YYYY-M-D')

const CANCEL_TEXT = 'انصراف';
const GETSERVICES = '/api/GetServices';
const GETFACILITIES = '/api/GetFacilities';
const GETSERVICEDETAILS = '/api/GetServiceDetails';
const GETGENDERS = '/api/GetGenders';
const GETSKILLS = '/api/GetSkills';
const GETCERTIFICATES = '/api/GetCertificates';
export default class ReserveScreen extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            medicalCenterSearchWord: '',
            doctorSearchWord: '',
            //-----------------------Progress Modal States--------------------
            progressModalVisible: false,
            //-----------------------API States--------------------
            token: null,
            baseUrl: null,
            //-----------------------ActionSheets States--------------------
            selectedSkill: {id: -100, value: ' انتخاب تخصص'},
            selectedState: {id: -100, value: 'انتخاب منطقه'},
            selectedGender: {id: -100, value: ' انتخاب جنسیت'},
            //-----------------------Calendar Modal states---------------------------
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
            skills: [],
            genders: [],
        };
        (this: any).onStartDateChange = this.onStartDateChange.bind(this);
        (this: any).onEndDateChange = this.onEndDateChange.bind(this);
    }


    async componentWillMount(): void {
        var token = await AsyncStorage.getItem('token');
        var baseUrl = await AsyncStorage.getItem('baseUrl')
        await this.setState({baseUrl: baseUrl, token: token}, () => {
            this.getSkills();
        })

    }


    async getSkills() {
        await this.setState({progressModalVisible: true})
        await fetch(this.state.baseUrl + GETSKILLS, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                Accept: 'application/json',
                'Authorization': 'Bearer ' + new String(this.state.token)
            },
        }).then((response) => response.json())
            .then((responseData) => {
                if (responseData['StatusCode'] === 200) {
                    if (responseData['Data'] != null) {
                        let data = responseData['Data'];
                        this.setState({progressModalVisible: false}, () => {
                            this.setState({skills: data})
                            this.getGenders();
                        })
                    }
                } else {
                    this.setState({progressModalVisible: false}, () => {
                        alert('خطا در اتصال به سرویس')
                    })

                }
            })
            .catch((error) => {
                console.error(error)
                // alert(error)
            })
    }

    async getGenders() {
        await this.setState({progressModalVisible: true})
        await fetch(this.state.baseUrl + GETGENDERS, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                Accept: 'application/json',
                'Authorization': 'Bearer ' + new String(this.state.token)
            },
        }).then((response) => response.json())
            .then((responseData) => {
                if (responseData['StatusCode'] === 200) {
                    if (responseData['Data'] != null) {
                        let data = responseData['Data'];
                        this.setState({progressModalVisible: false}, () => {
                            this.setState({genders: data})
                            // this.getSkills();
                        })
                    }
                } else {
                    this.setState({progressModalVisible: false}, () => {
                        alert('خطا در اتصال به سرویس')
                    })

                }
            })
            .catch((error) => {
                console.error(error)
                // alert(error)
            })
    }

    async searchServicePlans() {
        let body = {
            medicalCenterSearchWord: this.state.medicalCenterSearchWord,
            doctorSearchWord: this.state.doctorSearchWord,
            state: this.state.selectedState.id.toString(),
            gender: this.state.selectedGender.id.toString(),
            startDate: this.state.selectedStartDate.format('YYYY-M-D'),
            endDate: this.state.selectedEndDate.format('YYYY-M-D')
        }
        alert(JSON.stringify(body))
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
                                onPress={() => {
                                    Keyboard.dismiss()
                                    this.props.navigation.openDrawer()
                                }}>
                            <Icon style={styles.headerMenuIcon} name='menu'
                                  onPress={() => {
                                      Keyboard.dismiss()
                                      this.props.navigation.openDrawer()
                                  }}/>
                        </Button>
                    </Left>
                    <Right>
                        <Text style={styles.headerText}>جستجوی نوبت</Text>
                    </Right>
                </Header>
                <Root>
                    <Content padder style={styles.content}>

                        <Card style={styles.card}>

                            <View style={styles.row}>
                                <TextInput placeholder={'نام مرکز،خدمات،منطقه و ...'}
                                           onChangeText={(text) => this.setState({medicalCenterSearchWord: text})}
                                           value={this.state.medicalCenterSearchWord} style={styles.Input}/>
                                <Text style={[styles.label, {marginBottom: 8}]}> مرکز درمانی</Text>
                            </View>
                            <View style={styles.row}>
                                <TextInput placeholder={'نام پزشک،تخصص و ...'}
                                           onChangeText={(text) => this.setState({doctorSearchWord: text})}
                                           value={this.state.doctorSearchWord} style={styles.Input}/>
                                <Text style={[styles.label, {marginBottom: 8}]}> پزشک</Text>
                            </View>

                            <View style={styles.row}>
                                <Button
                                    onPress={() => {
                                        Keyboard.dismiss()
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
                                    flex: 3,
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
                                        Keyboard.dismiss()
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
                                    flex: 3,
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
                                        Keyboard.dismiss()
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
                                    flex: 3,
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
                                        Keyboard.dismiss()
                                        this.setState({startDateModalVisible: true}, () => {

                                        })
                                    }}
                                    bordered style={{
                                    textAlign: 'center',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 2,
                                    margin: 1,
                                    flex: 3,
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
                                        Keyboard.dismiss()
                                        this.setState({endDateModalVisible: true}, () => {
                                            Keyboard.dismiss()
                                        })
                                    }}
                                    bordered style={{
                                    textAlign: 'center',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 2,
                                    margin: 1,
                                    flex: 3,
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

                        </Card>

                        <Modal style={{opacity: 0.7}}
                               width={300}
                               visible={this.state.progressModalVisible}
                               modalAnimation={new SlideAnimation({
                                   slideFrom: 'bottom'
                               })}
                        >
                            <ModalContent style={styles.modalContent}>
                                <ActivityIndicator animating={true} size="small" color={"#23b9b9"}/>
                            </ModalContent>
                        </Modal>


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
                        this.searchServicePlans()
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
        margin: 5,
        padding: 1
    },
    label: {

        alignSelf: 'flex-end',
        alignContent: 'center',
        justifyContent: 'center',
        padding: 1,
        flex: 1,
        marginBottom: 13,
        margin: 1,
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'right'
    },
    Input: {
        margin: 1,
        marginRight: 2,
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: 3,
        borderColor: '#eeeeee',
        borderWidth: 1,
        flex: 3,
        alignSelf: 'flex-start',
        padding: 5,
        fontSize: 15,
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

});
