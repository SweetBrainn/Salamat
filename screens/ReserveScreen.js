import React, {Component} from 'react';
import {StyleSheet, View, Text, StatusBar, TextInput} from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';
import SearchMedicalCenter from "./SearchMedicalCenter";
import SearchDoctorScreen from "./SearchDoctorScreen";
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
    ActionSheet, Body
} from 'native-base';
import MedicalFilesScreen from "./MedicalFilesScreen";
import ShowReservesScreen from "./ShowReservesScreen";
import InboxScreen from "./InboxScreen";


const CANCEL_TEXT = 'انصراف';
export default class ReserveScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            initialPage: 1,
            doctorActive: false,
            reserveActive: false,
            medicalCenterActive: true,
            selectedSkill: {id: -100, value: ' انتخاب تخصص'},
            selectedState: {id: -100, value: 'انتخاب منطقه'},
            selectedGender: {id: -100, value: ' انتخاب جنسیت'},
            selectedYear: {id: -100, value: ' انتخاب سال'},
            selectedMonth: {id: -100, value: ' انتخاب ماه'},
            selectedDay: {id: -100, value: ' انتخاب روز'},
            selectedDate: {id: -100, value: ' انتخاب زمان'},
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
            ]
        }
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
                        <Text style={styles.headerText}>نوبت دهی</Text>
                    </Right>
                </Header>
                <Root>
                    <Content padder style={styles.content}>

                        <Card style={styles.card}>
                            <View style={styles.row}>
                                <TextInput style={styles.input}/>
                                <Text style={styles.label}>نام مرکز درمانی</Text>
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
                                                cancelButtonIndex: this.getCancelButtonIndex(this.getOptions(this.state.skills)),
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
                                                cancelButtonIndex: this.getCancelButtonIndex(this.getOptions(this.state.genders)),
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
                                                cancelButtonIndex: this.getCancelButtonIndex(this.getOptions(this.state.states)),
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
                                        ActionSheet.show(
                                            {
                                                options: this.getOptions(this.state.years),
                                                cancelButtonIndex: this.getCancelButtonIndex(this.getOptions(this.state.years)),
                                                title: "انتخاب سال"
                                            },
                                            buttonIndex => {
                                                if (buttonIndex <= this.state.years.length - 1)
                                                    this.setState({selectedYear: this.state.years[buttonIndex]});
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

                                    }}>{this.state.selectedYear.value}</Text>
                                </Button>
                                <Text style={styles.label}>سال</Text>
                            </View>
                            <View style={styles.row}>
                                <Button
                                    onPress={() => {
                                        ActionSheet.show(
                                            {
                                                options: this.getOptions(this.state.month),
                                                cancelButtonIndex: this.getCancelButtonIndex(this.getOptions(this.state.month)),
                                                title: "انتخاب ماه"
                                            },
                                            buttonIndex => {
                                                if (buttonIndex <= this.state.month.length - 1)
                                                    this.setState({selectedMonth: this.state.month[buttonIndex]});
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

                                    }}>{this.state.selectedMonth.value}</Text>
                                </Button>
                                <Text style={styles.label}>ماه</Text>
                            </View>
                            <View style={styles.row}>
                                <Button
                                    onPress={() => {
                                        ActionSheet.show(
                                            {
                                                options: this.getOptions(this.state.days),
                                                cancelButtonIndex: this.getCancelButtonIndex(this.getOptions(this.state.days)),
                                                title: "انتخاب روز"
                                            },
                                            buttonIndex => {
                                                if (buttonIndex <= this.state.days.length - 1)
                                                    this.setState({selectedDay: this.state.days[buttonIndex]});
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

                                    }}>{this.state.selectedDay.value}</Text>
                                </Button>
                                <Text style={styles.label}>روز</Text>
                            </View>
                            <View style={styles.row}>
                                <Button
                                    onPress={() => {
                                        ActionSheet.show(
                                            {
                                                options: this.getOptions(this.state.dates),
                                                cancelButtonIndex: this.getCancelButtonIndex(this.getOptions(this.state.dates)),
                                                title: "انتخاب ساعت"
                                            },
                                            buttonIndex => {
                                                if (buttonIndex <= this.state.dates.length - 1)
                                                    this.setState({selectedDate: this.state.dates[buttonIndex]});
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

                                    }}>{this.state.selectedDate.value}</Text>
                                </Button>
                                <Text style={styles.label}>ساعت</Text>
                            </View>
                        </Card>

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
                    </Content>
                </Root>
                <Footer style={styles.footer}>
                    <Button style={styles.button} onPress={() => {
                        alert('clicked')
                    }}>
                        <Text style={[{color: '#fff', fontSize: 15}]}>رزرو نوبت</Text>
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
        margin: 5,
        borderRadius: 5,
        borderColor: '#23b9b9',
        borderWidth: 1,
        shadowColor: '#d8d8d8',
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 2,
        elevation: 8
    },
    row: {
        flexDirection: 'row',
        margin: 5,
        padding: 1
    },
    label: {
        alignSelf: 'flex-end',
        padding: 1,
        flex: 1,
        margin: 1,
        marginBottom: 5,
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'right'
    },
    input: {
        margin: 1,
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: 3,
        borderColor: '#eeeeee',
        borderWidth: 1,
        flex: 3,
        alignSelf: 'flex-start',
        padding: 1,
        fontSize: 15,
        textAlign: 'right'

    }
});
