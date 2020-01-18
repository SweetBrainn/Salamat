import React, {Component} from 'react';
import {StyleSheet, View, Text, StatusBar, TextInput, Keyboard} from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button'
import DatePicker from 'react-native-jalaali-date-picker'

let moment = require('moment')
import {
    Container,
    Header,
    Thumbnail,
    Content,
    CardItem,
    Textarea,
    Button,
    Footer,
    Right,
    Tabs,
    Icon,
    Title,
    Card, Tab, Accordion
} from 'native-base';
import Modal, {ModalButton, ModalContent, ModalFooter, ModalTitle, SlideAnimation} from "react-native-modals";


const options = {
    title: 'Select Avatar',
    customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

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
            patientPassword: '',
            selectedStartDate: null,
            red: '#db1c09',
            green: '#00b452',
            phoneNumberValidation: null,
            phoneNumberBackgroundColor: 'rgba(255,255,255,0)',
            minDate: new Date(),
            startDateModalVisible: false,
            imageFromDevice: null,
            radioProps: [
                {label: 'مرد', value: 11},
                {label: 'زن', value: 12}
            ]


        };
        (this).onStartDateChange = this.onStartDateChange.bind(this);
    }

    onStartDateChange(date) {
        this.setState({selectedStartDate: date});
    }

    getMaxDate() {
        let date = new Date();
        date.setMonth(this.state.minDate.getUTCMonth() + 3)
        return date;
    }

    phoneNumberValidation(value) {
        const regex = RegExp('^(\\+98|0)?9\\d{9}$');
        let phone = new String(value)
        let status = regex.test(phone);
        if (status) {
            this.setState({phoneNumberValidation: true, phoneNumberBackgroundColor: this.state.green})
            return status;
        } else {
            this.setState({phoneNumberValidation: false, phoneNumberBackgroundColor: this.state.red})
            return status;
        }
    }


    render() {


        return (
            <Container>
                <StatusBar translucent backgroundColor={"#219e9e"} barStyle={"light-content"}/>
                <Header style={{backgroundColor: '#23b9b9'}}>
                    <Right>
                        <Text style={styles.headerText}>ثبت نام</Text>
                    </Right>
                </Header>
                <Content padder style={styles.content}>
                    <View style={styles.body}>
                        <View style={styles.card}>
                            <Card style={{
                                backgroundColor: 'rgba(234,234,234,0.21)',
                                borderWidth: 1,
                                borderBottomColor: '#1a8787'
                            }}>
                                <CardItem bordered style={[styles.row,
                                    {
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignContent: 'center',
                                        backgroundColor: '#23b9b9',
                                        borderBottomColor: '#fff',
                                        borderBottomWidth: '#fff'
                                    }]}>
                                    {this.state.imageFromDevice != null ?
                                        <Thumbnail large source={{uri: this.state.imageFromDevice}}/> :
                                        <Button style={{
                                            backgroundColor: 'rgba(195,195,195,0.4)',
                                            width: 75,
                                            height: 75,
                                            borderRadius: 75 / 2,
                                            justifyContent: 'center'
                                        }}
                                                onPress={() => {
                                                    // imagePicker.default.open({
                                                    //     cancelTitle: 'انصراف',
                                                    //     takePhoto: {
                                                    //         title: 'تصویر جدید',
                                                    //         config: { /* Config object to ImagePickerIOS.openCameraDialog() */}
                                                    //     },
                                                    //     chooseFromLibrary: {
                                                    //         title: 'انتخاب از آلبوم تصاویر',
                                                    //         config: { /* Config object to ImagePickerIOS.openSelectDialog() */}
                                                    //     }
                                                    // });

                                                }
                                                }
                                        >
                                            <Icon name={"camera"} type={"FontAwesome5"} color={'#949494'}/>
                                        </Button>
                                    }
                                </CardItem>
                                <CardItem style={styles.row}>
                                    <Text style={styles.label}>نام</Text>
                                    <TextInput
                                        value={this.state.firstName}
                                        onChangeText={(text) => this.setState({firstName: text})}
                                        style={[styles.textInput]}
                                        multiline={false}
                                    />
                                </CardItem>
                                <CardItem style={styles.row}>
                                    <Text style={styles.label}>نام خانوادگی</Text>
                                    <TextInput
                                        value={this.state.lastName}
                                        onChangeText={(text) => this.setState({lastName: text})}
                                        style={[styles.textInput]}
                                        multiline={false}
                                    />
                                </CardItem>
                                <CardItem style={styles.row}>
                                    <Text style={styles.label}>کد ملی</Text>
                                    <TextInput
                                        keyboardType={'numeric'}
                                        value={this.state.nationalCode}
                                        onChangeText={(text) => this.setState({nationalCode: text})}
                                        style={[styles.textInput]}
                                        multiline={false}
                                    />
                                </CardItem>

                                <CardItem style={styles.row}>
                                    <Text style={styles.label}>نام کاربری</Text>
                                    <TextInput
                                        value={this.state.patientUsername}
                                        onChangeText={(text) => this.setState({patientUsername: text})}
                                        style={[styles.textInput]}
                                        multiline={false}
                                    />
                                </CardItem>
                                <CardItem style={styles.row}>
                                    <Text style={styles.label}>رمز عبور</Text>
                                    <TextInput
                                        secureTextEntry={true}
                                        value={this.state.patientPassword}
                                        onChangeText={(text) => this.setState({patientPassword: text})}
                                        style={[styles.textInput]}
                                        multiline={false}
                                    />
                                </CardItem>
                                <CardItem style={styles.row}>
                                    <Text style={styles.label}>موبایل</Text>
                                    <TextInput
                                        keyboardType={'numeric'}
                                        value={this.state.cellPhone}
                                        onChangeText={(text) => this.setState({cellPhone: text}, () => {
                                            this.phoneNumberValidation(text)
                                        })}
                                        style={[styles.textInput,
                                            {backgroundColor: this.state.phoneNumberBackgroundColor, color: '#fff'}]}
                                        multiline={false}
                                    />
                                </CardItem>
                                <CardItem style={[styles.row]}>
                                    <Text style={[styles.label, {}]}>تاریخ تولد</Text>
                                    <Button
                                        bordered
                                        onPress={async () => {
                                            Keyboard.dismiss()
                                            await this.setState({startDateModalVisible: true})
                                        }}

                                        style={{
                                            textAlign: 'center',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            borderRadius: 2,
                                            flex: 3,
                                            borderWidth: 0,
                                            backgroundColor: 'rgba(255,255,255,0)',
                                            borderColor: 'rgba(255,255,255,0)'
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
                                </CardItem>
                                <CardItem style={styles.row}>
                                    <Text style={styles.label}>جنسیت</Text>
                                    <RadioForm
                                        style={{
                                            margin: 2,
                                            padding: 2
                                        }}
                                        selectedButtonColor={'#1f9292'}
                                        radio_props={this.state.radioProps}
                                        initial={11}
                                        formHorizontal={true}
                                        labelHorizontal={true}
                                        buttonColor={'#23b9b9'}
                                        animation={true}
                                        labelStyle={{marginRight: 5}}
                                        onPress={(value) => {
                                            this.setState({gender: value})
                                        }}
                                    />
                                </CardItem>
                                <CardItem style={styles.row}>
                                    <Textarea style={{padding: 2, margin: 2, flex: 1, textAlign: 'right'}} rowSpan={3}
                                              bordered
                                              placeholder="آدرس"/>
                                    {/*<Text style={styles.label}>توضیحات</Text>*/}
                                    {/*<TextInput*/}
                                    {/*    value={this.state.description}*/}
                                    {/*    onChangeText={(text) => this.setState({description: text})}*/}
                                    {/*    style={[styles.textInput]}*/}
                                    {/*    multiline={false}*/}
                                    {/*/>*/}
                                </CardItem>
                                <CardItem style={styles.row}>
                                    <Textarea style={{padding: 5, margin: 2, flex: 1, textAlign: 'right'}} rowSpan={3}
                                              bordered
                                              placeholder="توضیحات"/>
                                    {/*<Text style={styles.label}>آدرس</Text>*/}
                                    {/*<TextInput*/}
                                    {/*    value={this.state.address}*/}
                                    {/*    onChangeText={(text) => this.setState({address: text})}*/}
                                    {/*    style={[styles.textInput]}*/}
                                    {/*    multiline={false}*/}
                                    {/*/>*/}
                                </CardItem>
                            </Card>

                            <Modal
                                onTouchOutside={async () => {
                                    await this.setState({startDateModalVisible: false});
                                }}
                                visible={this.state.startDateModalVisible}
                                modalTitle={<ModalTitle style={styles.modalTitle} textStyle={styles.modalTitleText}
                                                        title="انتخاب تاریخ"/>}
                                modalAnimation={new SlideAnimation({
                                    slideFrom: 'bottom'
                                })}
                                footer={
                                    <ModalFooter style={styles.modalFooter}>
                                        <ModalButton
                                            style={styles.modalCancelButton}
                                            textStyle={styles.modalCancelButtonText}
                                            text="انصراف"
                                            onPress={async () => await this.setState({startDateModalVisible: false})}
                                        />
                                        <ModalButton
                                            style={styles.modalSuccessButton}
                                            textStyle={styles.modalSuccessButtonText}
                                            text="تایید"
                                            onPress={async () => await this.setState({startDateModalVisible: false})}
                                        />
                                    </ModalFooter>
                                }
                            >
                                <ModalContent style={styles.dateModalContent}>
                                    <View>
                                        <DatePicker
                                            defDateString={this.state.selectedStartDate != null ?
                                                this.state.selectedStartDate : moment([1950, 2, 21])}
                                            refDate={moment([1921, 3, 21])}
                                            style={{marginTop: 5}}
                                            btnUnderlayColor={'#23b9b9'}
                                            TitleDateStyle={{backgroundColor: '#23b9b9'}}
                                            onChangeDate={(date) => {
                                                this.setState({selectedStartDate: date, birthDate: date})
                                            }}
                                        />
                                    </View>
                                </ModalContent>
                            </Modal>

                        </View>
                    </View>
                </Content>
                <Footer style={styles.footer}>
                    <Button style={styles.button} onPress={() => {

                        if (
                            this.state.patientUsername === '' ||
                            this.state.nationalCode === '' ||
                            this.state.cellPhone === '' ||
                            this.state.firstName === '' ||
                            this.state.lastName === '' ||
                            this.state.birthDate === '' ||
                            this.state.gender === '' ||
                            this.state.patientPassword === '' ||
                            this.state.selectedStartDate === null
                        ) {
                            alert('لطفا اطلاعات خود را به درستی وارد کنید')
                        } else {
                            //myString.replace(/\D/g,'');
                            let body = {
                                patientUsername: this.state.patientUsername,
                                nationalCode: this.state.nationalCode,
                                cellPhone: this.state.cellPhone,
                                firstName: this.state.firstName,
                                lastName: this.state.lastName,
                                birthDate: this.state.selectedStartDate.format("YYYY/MM/DD"),
                                gender: this.state.gender,
                                description: this.state.description,
                                address: this.state.address,
                                zipCode: ''
                            }
                            console.log(JSON.stringify(body))
                        }

                    }}>
                        <Text style={[{color: '#fff', fontSize: 15}]}>ثبت نام</Text>
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
        marginTop: 5,
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
        backgroundColor: 'rgba(255,255,255,0)',
        width: '100%',
        flex: 1,
        marginBottom: 5,
        alignSelf: 'center',
        flexDirection: 'row-reverse'
    },
    textInput: {
        textAlign: 'center',
        flex: 2,
        fontSize: 13,
        padding: 3,
        margin: 2,
        marginRight: 10,
        marginLeft: 10,
        borderRadius: 3,
        // borderColor: '#eeeeee',
        // borderWidth: 1,
        color: '#23b9b9',
        borderWidth: 1,
        borderColor: '#23b9b9',
    },
    label: {
        padding: 1,
        flex: 1,
        margin: 1,
        fontSize: 15,
        fontWeight: 'bold',
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
});
