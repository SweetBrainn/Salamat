import React, {Component} from 'react';
import {StatusBar, StyleSheet, Text, TextInput, View} from 'react-native';
import {SearchableFlatList, SearchableSectionList} from "react-native-searchable-list";
import {Alert} from 'react-native'
import Autocomplete from 'react-native-autocomplete-input';
import Dialog from "react-native-dialog";
import {
    ActionSheet,
    Button,
    Body,
    Container,
    Content,
    Item,
    Header,
    Icon,
    Left,
    Right,
    Root,
    Input,
    ListItem
} from 'native-base';
import SearchableDropdown from 'react-native-searchable-dropdown';
import Modal, {ModalButton, ModalContent, ModalFooter, ModalTitle, SlideAnimation} from "react-native-modals";
import PersianCalendarPicker from "react-native-persian-calendar-picker";


export default class SearchMedicalCenter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedMedicalCenter: {id: 0, title: "", data: []},
            title: '',
            description: '',
            visible: false,
            medicalCenterTitle: '',
            mainData: [
                {
                    id: 0,
                    title: "مرکز درمانی 1",
                    data: ["دندان پزشکی", "جراحی فک", "فیزیوتراپی", 'منطقه 1', 'مرکز درمانی 1']
                },
                {id: 1, title: "مرکز درمانی 2", data: ['مرکز درمانی 2', "چشم پزشکی", "منطقه 10"]},
                {id: 2, title: "بیمارستان امام سجاد", data: ['بیمارستان امام رضا 2', "منطقه 9", "خدمات فک و صورت"]},
                {id: 3, title: "درمانگاه امام حسن", data: ['درمانگاه امام حسن', "منطقه 10", "آزمایشگاه"]},
                {id: 4, title: "بیمارستان امام رضا", data: ['بیمارستان امام رضا', "منطقه 11"]},
            ],
            data: [{
                id: 0,
                title: "مرکز درمانی 1",
                data: ["دندان پزشکی", "جراحی فک", "فیزیوتراپی", 'منطقه 1', 'مرکز درمانی 1']
            },
                {id: 1, title: "مرکز درمانی 2", data: ['مرکز درمانی 2', "چشم پزشکی", "منطقه 10"]},
                {id: 2, title: "بیمارستان امام سجاد", data: ['بیمارستان امام رضا 2', "منطقه 9", "خدمات فک و صورت"]},
                {id: 3, title: "درمانگاه امام حسن", data: ['درمانگاه امام حسن', "منطقه 10", "آزمایشگاه"]},
                {id: 4, title: "بیمارستان امام رضا", data: ['بیمارستان امام رضا', "منطقه 11"]},

            ],

            searchTerm: "",
            searchAttribute: 'data.data',
            searchByTitle: false,
            ignoreCase: true,
            titleOfAlert: '',
            messageOfAlert: '',

        };


    }


    filterData(value) {
        let filteredList = [];
        for (let item of this.state.mainData) {
            if (item.title.includes(value) || item.data.includes(value)) {
                filteredList.push(item);
            }
        }
        this.setState({data: filteredList})
    }

    goToDetailsScreen(value) {
        for (let i of this.state.data) {
            if (value === i.title) {
                this.setState({selectedMedicalCenter: i}, () => {
                    this.props.navigation.navigate('DetailsScreen', {medicalCenter: i, doctor: null})
                })
                break
            }
        }
    }

    showAlert(value) {
        for (let item of this.state.data) {
            if (item.title === value) {
                let result = '';
                for (let text of item.data) {
                    if (text !== value) {
                        result = ' ' + result + text + ' ';
                    }
                }
                return result;
                //this.setState({messageOfAlert: result, titleOfAlert: value})
                break
            }
        }
    }


    render() {
        return (
            <Container>
                <StatusBar hidden translucent backgroundColor="transparent"/>
                <Header style={styles.header}>
                    <Left>
                        <Button transparent style={styles.headerMenuIcon}
                                onPress={() => this.props.navigation.openDrawer()}>
                            <Icon style={styles.headerMenuIcon} name='menu'
                                  onPress={() => this.props.navigation.openDrawer()}/>
                        </Button>
                    </Left>
                    <Right>
                        <Text style={styles.headerText}>جستجوی مرکز درمانی</Text>
                    </Right>
                </Header>
                <Root>
                    <Content padder style={styles.content}>
                        <Item regular>
                            <Input placeholder='جستجوی نام مرکز،خدمات،منطقه و ...'
                                   placeholderTextColor={'#d0d0d0'}
                                   style={{textAlign: 'right', fontSize: 13}}
                                   value={this.state.searchTerm}
                                   onChangeText={(searchTerm) => (this.setState({searchTerm: searchTerm}))}
                            />
                        </Item>
                        <View style={styles.row}>
                            <Button transparent style={{alignSelf: 'flex-start', margin: 2, padding: 2}}
                                    onPress={() => this.props.navigation.navigate('AdvanceSearchScreen', {
                                        medicalCenter: true,
                                        doctor: false
                                    })}>
                                <Text style={{textAlign: 'right', fontSize: 13, color: '#23b9b9'}}>جستجوی پیشرفته</Text>
                            </Button>
                        </View>
                        <SearchableSectionList
                            style={{marginTop: 15}}
                            sections={this.state.data} searchTerm={this.state.searchTerm}
                            searchByTitle={false}
                            ignoreCase={false}
                            renderSectionHeader={({section: {title}}) => (
                                <ListItem
                                    style={{width: '100%', height: 50, alignSelf: 'center', padding: 1, marginTop: 2}}
                                    onPress={() => {
                                        // Alert.alert(
                                        //     title,
                                        //     this.showAlert(title)
                                        //     ,
                                        //     [
                                        //         {text: 'انصراف'},
                                        //         {
                                        //             text: 'جستجوی پزشک',
                                        //             onPress: () => this.props.navigation.navigate('SearchDoctorScreen',
                                        //                 {medicalCenter: (title)}),
                                        //             style: 'cancel',
                                        //         },
                                        //         {text: 'اطلاعات بیشتر', onPress: () => this.goToDetailsScreen(title)},
                                        //     ],
                                        //     {cancelable: true},
                                        // );
                                        this.setState({medicalCenterTitle: title, visible: true})
                                    }
                                    }

                                >
                                    <Body>
                                        <Text style={{
                                            color: '#000',
                                            width: '100%',
                                            height: '100%',
                                            textAlign: 'right',
                                            fontSize: 15,
                                        }}>{title}</Text>
                                    </Body>
                                </ListItem>
                            )}
                            renderItem={({item}) => (
                                <Text style={{width: 0, height: 0}}>s</Text>
                            )}
                            keyExtractor={item => item}
                        />


                        <Modal
                            width={300}
                            onTouchOutside={() => {
                                this.setState({visible: false});
                            }}
                            visible={this.state.visible}
                            modalTitle={<ModalTitle style={styles.modalTitle} textStyle={styles.modalTitleText}
                                                    title={this.state.medicalCenterTitle}/>}
                            modalAnimation={new SlideAnimation({
                                slideFrom: 'bottom'
                            })}
                            footer={
                                <ModalFooter style={styles.modalFooter}>
                                    <ModalButton
                                        style={[styles.modalCancelButton]}
                                        textStyle={styles.modalCancelButtonText}
                                        text="جستجوی پزشک"
                                        onPress={() => {
                                            this.setState({visible: false})
                                            this.props.navigation.navigate('SearchDoctorScreen',
                                                {medicalCenter: (this.state.medicalCenterTitle)})
                                        }}
                                    />
                                    <ModalButton
                                        style={[styles.modalSuccessButton]}
                                        textStyle={[styles.modalSuccessButtonText]}
                                        text="اطلاعات بیشتر"
                                        onPress={() => {
                                            this.setState({visible: false})
                                            this.goToDetailsScreen(this.state.medicalCenterTitle)
                                        }
                                        }
                                    />
                                </ModalFooter>
                            }
                        >
                            <ModalContent style={styles.modalContent}>
                                <View>
                                    <Text style={[styles.modalCancelButtonText, {fontSize: 13}]}>{this.showAlert(
                                        this.state.medicalCenterTitle)}</Text>
                                </View>
                            </ModalContent>
                        </Modal>

                    </Content>
                </Root>
            </Container>
        );


    }
}
SearchMedicalCenter.navigationOptions = {
    header: null,
    title: 'جستجوی مرکز درمانی',
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
        borderColor: '#23b9b9',
        borderWidth: 1,
        margin: 5,
        padding: 5,
        flexDirection: 'column'
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
    header: {
        backgroundColor: '#23b9b9'
    },
    footer: {
        backgroundColor: '#23b9b9'
    },
    viewStyle: {
        width: '100%',
        height: '100%',
        backgroundColor: 'red',
        flexDirection: 'column',
    },
    row: {
        width: '100%',
        flex: 1,
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    modalTitle: {
        backgroundColor: '#23b9b9',
    },
    modalTitleText: {
        color: '#fff',
        textAlign: 'right'
    },
    modalFooter: {
        padding: 2,
        backgroundColor: 'rgba(47,246,246,0.06)'
    },
    modalCancelButton: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 3,
        borderColor: '#23b9b9',
        borderWidth: 1,
        padding: 2,
        margin: 5
    },
    modalSuccessButton: {
        flex: 1,
        backgroundColor: '#23b9b9',
        borderRadius: 3,
        padding: 2,
        margin: 5
    },
    modalSuccessButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 12,
        textAlign: 'right'
    },
    modalCancelButtonText: {
        color: '#23b9b9',
        fontSize: 12,
        textAlign: 'right'
    },
    modalContent: {
        marginTop: 5,
        padding: 2,
        alignContent: 'center',
        backgroundColor: 'rgba(47,246,246,0.06)'
    }
});
