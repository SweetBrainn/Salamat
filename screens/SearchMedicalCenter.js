import React, {Component} from 'react';
import {ActivityIndicator, AsyncStorage, StatusBar, StyleSheet, Text, TextInput, View} from 'react-native';
import {SearchableFlatList, SearchableSectionList} from "react-native-searchable-list";
import {Alert} from 'react-native'
import Autocomplete from 'react-native-autocomplete-input';
import AbortController from "abort-controller/dist/abort-controller";
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

const GETMEDICALCENTERBYID = '/api/GetMedicalCenterById';
const SEARCHMEDICALCENTERALLFIELD = '/api/SearchMedicalCenterAllField'
export default class SearchMedicalCenter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedMedicalCenter: {},
            title: '',
            description: '',
            visible: false,
            medicalCenterTitle: '',
            data: [],
            searchTerm: '',
            titleOfAlert: '',
            messageOfAlert: '',
            progressModalVisible: false,
            previousLength: -1,

        };


    }


    async goToDetailsScreen(value) {
        var body = '{ title: ' + value.Title + ',id: ' + value.id + '}'
        await this.setState({progressModalVisible: true})
        await fetch(this.state.baseUrl + GETMEDICALCENTERBYID, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                Accept: 'application/json',
                'Authorization': 'Bearer ' + new String(this.state.token)
            },
            body: JSON.stringify({title: value.Title, id: value.id})
        }).then((response) => response.json())
            .then((responseData) => {
                if (responseData['StatusCode'] === 200) {
                    if (responseData['Data'] != null) {
                        let data = responseData['Data'];
                        alert(JSON.stringify(data))
                    }
                } else {
                    this.setState({progressModalVisible: false}, () => {
                        alert(JSON.stringify(responseData))
                    })

                }
            })
            .catch((error) => {
                console.error(error)
                // alert(error)
            })
        // this.props.navigation.navigate('DetailsForMedicalCenterScreen', {medicalCenter: value, doctor: null})

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

    async componentWillMount(): void {
        var token = await AsyncStorage.getItem('token');
        var baseUrl = await AsyncStorage.getItem('baseUrl')
        await this.setState({baseUrl: baseUrl, token: token})
    }


    async search(text) {
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
                            this.setState({data: data})
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
                        <Text onPress={() => alert(JSON.stringify(this.state.data))} style={styles.headerText}>جستجوی
                            مرکز درمانی</Text>
                    </Right>
                </Header>
                <Root>
                    <Content padder style={styles.content}>
                        <Item regular>
                            <Input placeholder='جستجوی نام مرکز،خدمات،منطقه و ...'
                                   placeholderTextColor={'#d0d0d0'}
                                   style={{textAlign: 'right', fontSize: 13}}
                                   value={this.state.searchTerm}
                                   onChangeText={(searchTerm) => {
                                       if (searchTerm.length > this.state.previousLength) {
                                           (this.setState({searchTerm: searchTerm, previousLength: searchTerm.length},
                                               async () => {

                                                   if (searchTerm.length === 0) {
                                                       await this.setState({data: []})
                                                   } else {
                                                       if (searchTerm.length >= 3) {
                                                           await this.search(searchTerm)
                                                       }
                                                   }

                                               }))
                                       } else {
                                           this.setState({searchTerm: searchTerm, previousLength: searchTerm.length})
                                       }
                                   }}

                            />
                        </Item>
                        <View style={[styles.row, {flexDirection: this.state.flexDirection}]}>
                            <Button transparent style={{alignSelf: 'flex-start', margin: 2, padding: 2}}
                                    onPress={() => this.props.navigation.navigate('AdvanceSearchScreen', {
                                        medicalCenter: true,
                                        doctor: false
                                    })}>
                                <Text style={{textAlign: 'right', fontSize: 13, color: '#23b9b9'}}>جستجوی پیشرفته</Text>
                            </Button>
                        </View>

                        {(this.state.data != null && this.state.data.length >= 1) ? this.state.data.map((item, key) => (
                                <View key={key}>
                                    <ListItem
                                        style={{width: '100%', height: 50, alignSelf: 'center', padding: 1, marginTop: 2}}
                                        onPress={() => {
                                            this.setState({selectedMedicalCenter: item, visible: true})
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
                                            }}>{item.Title}</Text>
                                        </Body>
                                    </ListItem>
                                </View>
                            )) :
                            this.state.data.length === 0 ? <View style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Text style={{color: 'gray'}}>موردی یافت نشد</Text>
                                </View>
                                : null}

                        <Modal
                            width={300}
                            onTouchOutside={() => {
                                this.setState({visible: false});
                            }}
                            visible={this.state.visible}
                            modalTitle={<ModalTitle style={styles.modalTitle} textStyle={styles.modalTitleText}
                                                    title={this.state.selectedMedicalCenter.Title}/>}
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
                                        onPress={async () => {
                                            await this.setState({visible: false})
                                            await this.goToDetailsScreen(this.state.selectedMedicalCenter)
                                        }
                                        }
                                    />
                                </ModalFooter>
                            }
                        >
                            <ModalContent style={styles.modalContent}>
                                <View>
                                    <Text style={[styles.modalCancelButtonText,
                                        {fontSize: 13}]}>{this.state.selectedMedicalCenter.Description}</Text>
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