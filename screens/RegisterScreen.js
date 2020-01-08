import React, {Component} from 'react';
import {StyleSheet, View, Text, StatusBar, TextInput, Keyboard} from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button'
import ScrollPicker from "react-native-wheel-scroll-picker";

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
    Title,
    Card, Tab, Accordion
} from 'native-base';
import Modal, {ModalButton, ModalContent, ModalFooter, ModalTitle, SlideAnimation} from "react-native-modals";
import PersianCalendarPicker from "react-native-persian-calendar-picker";


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
            selectedStartDate: null,
            minDate: new Date(),
            startDateModalVisible: false,
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

    render() {
        return (
            <Container>
                <StatusBar translucent backgroundColor={"#219e9e"} barStyle={"light-content"}/>
                <Header span style={{backgroundColor: '#23b9b9'}}>
                    <Right>
                        <Text style={styles.headerText}>ثبت نام</Text>
                    </Right>
                </Header>
                <Content padder style={styles.content}>
                    <View style={styles.body}>
                        <View style={styles.card}>
                            <Card>
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
                                    <Text style={styles.label}>موبایل</Text>
                                    <TextInput
                                        keyboardType={'numeric'}
                                        value={this.state.cellPhone}
                                        onChangeText={(text) => this.setState({cellPhone: text})}
                                        style={[styles.textInput]}
                                        multiline={false}
                                    />
                                </CardItem>


                                <CardItem style={styles.row}>
                                    <Text style={styles.label}>تاریخ تولد</Text>
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
                                    <Text style={styles.label}>توضیحات</Text>
                                    <TextInput
                                        value={this.state.description}
                                        onChangeText={(text) => this.setState({description: text})}
                                        style={[styles.textInput]}
                                        multiline={false}
                                    />
                                </CardItem>
                                <CardItem style={styles.row}>
                                    <Text style={styles.label}>آدرس</Text>
                                    <TextInput
                                        value={this.state.address}
                                        onChangeText={(text) => this.setState({address: text})}
                                        style={[styles.textInput]}
                                        multiline={false}
                                    />
                                </CardItem>
                            </Card>
                            <Modal
                                onTouchOutside={() => {
                                    this.setState({startDateModalVisible: false});
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
                                            onPress={() => this.setState({startDateModalVisible: false})}
                                        />
                                        <ModalButton
                                            style={styles.modalSuccessButton}
                                            textStyle={styles.modalSuccessButtonText}
                                            text="تایید"
                                            onPress={() => this.setState({startDateModalVisible: false})}
                                        />
                                    </ModalFooter>
                                }
                            >
                                <ModalContent style={styles.dateModalContent}>
                                    <View>
                                        {/*<PersianCalendarPicker*/}

                                        {/*    initDate={this.state.minDate}*/}
                                        {/*    minDate={new Date('1900-01-01T00:00:00')}*/}
                                        {/*    maxDate={this.getMaxDate()}*/}
                                        {/*    previousTitle={'ماه قبل'}*/}
                                        {/*    nextTitle={'ماه بعد'}*/}
                                        {/*    selectedDayColor={'#23b9b9'}*/}
                                        {/*    selectedDayTextColor={'#fff'}*/}
                                        {/*    todayBackgroundColor={'#e6e6e6'}*/}
                                        {/*    textStyle={{color: '#000'}}*/}
                                        {/*    onDateChange={this.onStartDateChange}*/}
                                        {/*/>*/}
                                        <ScrollPicker
                                            ref={(sp) => {this.sp = sp}}
                                            dataSource={[
                                                'a',
                                                'b',
                                                'c',
                                                'd',
                                            ]}
                                            selectedIndex={0}
                                            itemHeight={50}
                                            wrapperHeight={250}
                                            wrapperColor="#fafafa"
                                            highlightColor="#d8d8d8"
                                            renderItem={(data, index, isSelected) => {
                                                return(
                                                    <View>
                                                        <Text >{data}</Text>
                                                    </View>
                                                )
                                            }}
                                            onValueChange={(data, selectedIndex) => {
                                                //
                                            }}
                                        />
                                    </View>
                                </ModalContent>
                            </Modal>

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
        borderColor: '#eeeeee',
        borderWidth: 1,
    },
    label: {
        alignSelf: 'flex-end',
        alignContent: 'center',
        justifyContent: 'center',
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
});
