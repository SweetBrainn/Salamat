import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    StatusBar,
    AsyncStorage, Keyboard,
} from 'react-native';
import {
    Container,
    Header,
    Content,
    CardItem,
    Button,
    Left,
    Card,
    Right,
    Body,
    Icon,
    Text,
    Thumbnail,
    Badge,
    Root, ListItem, ActionSheet,
} from 'native-base';
import Modal, {ModalButton, ModalContent, ModalFooter, ModalTitle, SlideAnimation} from "react-native-modals";

const GETNOTICES = '/api/GetNotices';
const GETSERVICEPLANDETAIL = '/api/SearchServicePlanDetail';
const CANCEL_TEXT = 'انصراف';

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animate: props.animate,
        }
    }

    render() {
        if (this.state.showForPatient) {
            return (

                <Card style={[styles.post]}>
                    <CardItem header>
                        <Body>
                            {/*<Image*/}
                            {/*    onLoadEnd={() => {*/}
                            {/*        this.setState({animate: !this.state.animate})*/}
                            {/*    }}*/}
                            {/*    style={[styles.postImage]}*/}
                            {/*    source={{uri: this.state.postContentImage}}/>*/}
                        </Body>
                    </CardItem>
                    <CardItem footer>
                        <Body>
                            <Text style={styles.postText}>{this.state.postContentText}</Text>
                        </Body>
                    </CardItem>
                    {/*<CardItem>*/}
                    {/*    <Left>*/}
                    {/*        <Button transparent>*/}
                    {/*            <Icon type='FontAwesome' name="heart" style={{color: '#ba150b'}}/>*/}
                    {/*            <Text style={{color: '#ba150b'}}>{props.likes} نفر پسندیده اند</Text>*/}
                    {/*        </Button>*/}
                    {/*    </Left>*/}
                    {/*</CardItem>*/}
                </Card>
            );
        }

    }
}


export default class ServicePlanResult extends Component {

    constructor(props) {


        super(props);
        this.state = {
            animate: true,
            progressModalVisible: false,
            token: null,
            baseUrl: null,
            notices: null,
            result: [],
            medicalCenterSearchWord: null,
            doctorSearchWord: null,
            skill: null,
            gender: null,
            startDate: null,
            endDate: null,
            selectedServicePlan: {},
            visible: false,
            modalContent: {},
            medicalCanters: [],
            days: [],
            times: [],
            selectedMedicalCenter: {Id: -100, Value: ' انتخاب مرکز درمانی'},
            selectedDay: {id: -100, value: ' انتخاب روز'},
            selectedTime: {id: -100, value: 'انتخاب ساعت'}
        }
    }

    async componentWillMount(): void {
        var token = await AsyncStorage.getItem('token');
        var baseUrl = await AsyncStorage.getItem('baseUrl');
        var result = await this.props.navigation.getParam('result');
        console.log(JSON.stringify(result));
        var medicalCenterSearchWord = await this.props.navigation.getParam('medicalCenterSearchWord')
        var doctorSearchWord = await this.props.navigation.getParam('doctorSearchWord')
        var skill = await this.props.navigation.getParam('skill')
        var gender = await this.props.navigation.getParam('gender')
        var startDate = await this.props.navigation.getParam('startDate')
        var endDate = await this.props.navigation.getParam('endDate')
        this.setState({
            baseUrl: baseUrl,
            token: token,
            result: result,
            medicalCenterSearchWord: medicalCenterSearchWord,
            doctorSearchWord: doctorSearchWord,
            skill: skill,
            gender: gender,
            startDate: startDate,
            endDate: endDate
        }, () => {
            // this.getNotices()
        })

    }

    getMedicalCenterOptions(array) {
        let options = [];
        for (let item of array) {
            options.push(item.Value)
        }
        options.push(CANCEL_TEXT)
        return options;
    }

    getDayOptions(array) {
        let options = [];
        for (let item of array) {
            options.push(item.Value)
        }
        options.push(CANCEL_TEXT)
        return options;
    }

    getMedicalCenterOptions(array) {
        let options = [];
        for (let item of array) {
            options.push(item.Value)
        }
        options.push(CANCEL_TEXT)
        return options;
    }

    getCancelButtonIndex(array) {
        return array.indexOf(CANCEL_TEXT)
    }

    async getServicePlanDetail(doctorId, medicalCenterId, startDate, endDate) {
        let body = {
            DoctorId: doctorId,
            MedicalCenterId: medicalCenterId,
            StartDate: startDate,
            EndDate: endDate
        }
        console.log(JSON.stringify(body))
        this.setState({progressModalVisible: true})
        await fetch(this.state.baseUrl + GETSERVICEPLANDETAIL, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                Accept: 'application/json',
                'Authorization': 'Bearer ' + new String(this.state.token)
            },
            body: JSON.stringify(body),
        }).then((response) => response.json())
            .then((responseData) => {
                if (responseData['StatusCode'] === 200) {
                    if (responseData['Data'] != null) {
                        let data = responseData['Data'];
                        if (data.length <= 0) {
                            alert("روز خالی جهت نوبت دهی در این درمانگاه وجود ندهرد")
                        } else {
                            this.setState({progressModalVisible: false}, () => {
                                this.setState({days: data})
                                console.log(JSON.stringify(this.state.days))
                            })
                        }
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


    render() {
        return (
            <Container>
                <StatusBar backgroundColor={"#219e9e"} barStyle={"light-content"}/>
                <Header style={{backgroundColor: '#23b9b9'}}>
                    <Left>
                        <Button transparent style={styles.headerMenuIcon}
                                onPress={() => this.props.navigation.openDrawer()}>
                            <Icon style={styles.headerMenuIcon} name='menu'
                                  onPress={() => this.props.navigation.openDrawer()}/>
                        </Button>
                    </Left>
                    <Right>
                        <Text style={styles.headerText}>نتایج جستجو</Text>
                    </Right>
                </Header>
                <Root>
                    <Content scrollEnabled={false} padder style={styles.content}>

                        <Card>
                            <CardItem style={{flexDirection: 'row-reverse', justifyContent: 'flex-start'}}>
                                <Right style={{flexDirection: 'row-reverse', justifyContent: 'flex-start'}}>
                                    <Text style={styles.filterText}>
                                        فیلتر ها
                                    </Text>
                                </Right>
                            </CardItem>
                            <CardItem style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignContent: 'stretch',
                                flexWrap: 'wrap',
                            }}>

                                {this.state.medicalCenterSearchWord != null && <Badge style={styles.badgeStyle}>
                                    <Text style={styles.badgeText}>{this.state.medicalCenterSearchWord}</Text>
                                </Badge>}
                                {this.state.doctorSearchWord != null && <Badge style={styles.badgeStyle}>
                                    <Text style={styles.badgeText}>{this.state.doctorSearchWord}</Text>
                                </Badge>}
                                {this.state.skill != null && <Badge style={styles.badgeStyle}>
                                    <Text style={styles.badgeText}>{this.state.skill}</Text>
                                </Badge>}
                                {this.state.gender != null && <Badge style={styles.badgeStyle}>
                                    <Text style={styles.badgeText}>{this.state.gender}</Text>
                                </Badge>}
                                {this.state.startDate != null && <Badge style={styles.badgeStyle}>
                                    <Text style={styles.badgeText}>{this.state.startDate}</Text>
                                </Badge>}
                                {this.state.endDate != null && <Badge style={styles.badgeStyle}>
                                    <Text style={styles.badgeText}>{this.state.endDate}</Text>
                                </Badge>}

                            </CardItem>
                        </Card>

                        {false && <ScrollView style={{flex: 1, width: '100%', height: '100%'}}>
                            {this.state.result.map((item, key) => (
                                <TouchableOpacity key={key}
                                                  onPress={() => this.setState({selectedServicePlan: item},
                                                      async () => {
                                                          await this.generateModal()
                                                      })}>
                                    <View>
                                        <Card
                                            style={{padding: 5, borderColor: '#23b9b9', elevation: 8, borderWidth: 1}}>
                                            {<CardItem style={{marginTop: 5, flexDirection: 'row-reverse'}}>
                                                <Body style={{flexDirection: 'row-reverse'}}>
                                                    <Text style={{
                                                        textAlign: 'right',
                                                        alignSelf: 'flex-start',
                                                        fontSize: 20,
                                                        fontWeight: 'bold',
                                                        padding: 1
                                                    }}>{item.Doctor}</Text>
                                                </Body>
                                                <Left style={{alignSelf: 'flex-end'}}>
                                                    <Thumbnail
                                                        circular
                                                        source={{uri: 'http://shahresalem.tehran.ir/Portals/0/Image/1397/%D8%AE%D8%A8%D8%B1/hamayesh/roze%20pezeshk/3.JPG'}}/>
                                                </Left>
                                            </CardItem>}

                                            {<CardItem style={{marginTop: 5}}>
                                                <Left>
                                                    <Text style={{
                                                        flex: 1,
                                                        justifyContent: 'flex-start',
                                                        textAlign: 'right',
                                                        flexDirection: 'row-reverse',
                                                        fontSize: 13,
                                                        color: '#000',
                                                        padding: 1
                                                    }}>
                                                        {item.MedicalCenter}
                                                    </Text>
                                                </Left>
                                            </CardItem>}

                                            {<CardItem style={{marginTop: 5}}>
                                                <Body>
                                                    <Text style={{
                                                        textAlign: 'right',
                                                        alignSelf: 'flex-end',
                                                        fontSize: 12,
                                                        color: '#a7a7a7',
                                                        padding: 1
                                                    }}> جنسیت : {item.Gender}</Text>
                                                </Body>
                                            </CardItem>}

                                            {false && <CardItem style={{marginTop: 5}}>
                                                <Body style={{flexDirection: 'row-reverse'}}>
                                                    <Text style={{
                                                        textAlign: 'right',
                                                        alignSelf: 'flex-end',
                                                        fontSize: 12,
                                                        color: '#a7a7a7',
                                                        padding: 1
                                                    }}>از تاریخ : {item.StartDate}</Text>
                                                    <Text style={{
                                                        textAlign: 'right',
                                                        alignSelf: 'flex-end',
                                                        fontSize: 12,
                                                        color: '#a7a7a7',
                                                        padding: 1,
                                                        marginRight: 20,
                                                        marginLeft: 2
                                                    }}>تا تاریخ : {item.EndDate}</Text>
                                                </Body>
                                            </CardItem>}
                                        </Card>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>}


                        <ScrollView style={{flex: 1, width: '100%', height: '100%'}}>

                            {(this.state.result != null) ? this.state.result.map((item, key) => (
                                <View key={key} style={{borderBottomColor: '#e9e9e9', borderBottomWidth: 1}}>
                                    <TouchableOpacity>
                                        <ListItem avatar noBorder
                                                  style={{
                                                      width: '100%',
                                                      alignSelf: 'center',
                                                      padding: 1,
                                                      marginTop: 2,
                                                      borderColor: '#fff',
                                                      justifyContent: 'center',
                                                      alignContent: 'center',
                                                      alignItems: 'center',
                                                  }}
                                                  onPress={async () => {
                                                      Keyboard.dismiss()
                                                      await this.setState({
                                                          selectedServicePlan: item,
                                                          medicalCanters: item.MedicalCenters,
                                                          visible: true
                                                      })
                                                  }
                                                  }

                                        >
                                            <Body
                                                style={{height: '100%', marginRight: 5, alignSelf: 'center', flex: 1}}>
                                                <Text style={{
                                                    color: '#000',
                                                    textAlign: 'right',
                                                    fontSize: 15,
                                                    marginRight: 1,
                                                    marginTop: 5,

                                                }}>{item.Doctor}</Text>
                                                {false && <Text style={{
                                                    color: '#a9a9a9',
                                                    textAlign: 'right',
                                                    fontSize: 12,
                                                    marginTop: 5,
                                                    marginRight: 1
                                                }}>{item.Description}</Text>}
                                            </Body>
                                            <Right>
                                                <Thumbnail circular
                                                           source={{uri: 'http://shahresalem.tehran.ir/Portals/0/Image/1397/%D8%AE%D8%A8%D8%B1/hamayesh/roze%20pezeshk/3.JPG'}}/>
                                            </Right>
                                        </ListItem>
                                    </TouchableOpacity>
                                </View>
                            )) : null}

                        </ScrollView>


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

                        <Modal
                            width={300}
                            onTouchOutside={() => {
                                this.setState({visible: false});
                            }}
                            visible={this.state.visible}
                            modalTitle={
                                <ModalTitle style={styles.modalTitle} textStyle={styles.modalTitleText}
                                            title={this.state.selectedServicePlan.Doctor != null ?
                                                this.state.selectedServicePlan.Doctor : null}/>}
                            modalAnimation={new SlideAnimation({
                                slideFrom: 'bottom'
                            })}
                            footer={
                                <ModalFooter style={styles.modalFooter}>
                                    <ModalButton
                                        style={[styles.modalCancelButton]}
                                        textStyle={[styles.modalCancelButtonText]}
                                        text="انصراف"
                                        onPress={async () => {
                                            await this.setState({visible: false})
                                        }
                                        }
                                    />
                                    <ModalButton
                                        style={[styles.modalSuccessButton]}
                                        textStyle={styles.modalSuccessButtonText}
                                        text="انتخاب"
                                        onPress={async () => {
                                            this.setState({visible: false})
                                            alert('clicked')
                                        }}
                                    />
                                </ModalFooter>
                            }
                        >
                            <ModalContent style={styles.modalContent}>
                                {this.state.medicalCanters.length > 0 && <View style={{minHeight: 60, maxHeight: 65}}>
                                    <Button
                                        onPress={() => {
                                            Keyboard.dismiss()
                                            ActionSheet.show(
                                                {
                                                    options: this.getMedicalCenterOptions(this.state.medicalCanters),
                                                    cancelButtonIndex: this.getCancelButtonIndex(
                                                        this.getMedicalCenterOptions(this.state.medicalCanters)),
                                                    title: "انتخاب مرکز درمانی"
                                                },
                                                buttonIndex => {
                                                    if (this.state.medicalCanters.length > 0) {
                                                        if (buttonIndex <= this.state.medicalCanters.length - 1)
                                                            this.setState(
                                                                {selectedMedicalCenter: this.state.medicalCanters[buttonIndex]},
                                                                async () => {
                                                                    await this.getServicePlanDetail(
                                                                        this.state.selectedServicePlan.DoctorId,
                                                                        this.state.selectedMedicalCenter.Id,
                                                                        this.state.startDate,
                                                                        this.state.endDate
                                                                    )
                                                                });
                                                    }
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

                                        }}>{this.state.selectedMedicalCenter.Value}</Text>
                                    </Button>
                                </View>}
                                {this.state.selectedMedicalCenter.Id != -100 && this.state.days.length > 0 &&
                                <View style={{minHeight: 60, maxHeight: 65}}>
                                    <Button
                                        onPress={() => {
                                            Keyboard.dismiss()
                                            ActionSheet.show(
                                                {
                                                    options: this.getMedicalCenterOptions(this.state.days),
                                                    cancelButtonIndex: this.getCancelButtonIndex(
                                                        this.getMedicalCenterOptions(this.state.days)),
                                                    title: "انتخاب روز"
                                                },
                                                buttonIndex => {
                                                    if (this.state.days.length > 0) {
                                                        if (buttonIndex <= this.state.days.length - 1)
                                                            this.setState(
                                                                {selectedDay: this.state.days[buttonIndex]});
                                                    }
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

                                        }}>{this.state.selectedDay.value}</Text>
                                    </Button>
                                </View>}
                                {this.state.selectedTime.id != 100 && this.state.times.length > 0 &&
                                <View style={{minHeight: 60, maxHeight: 65}}>
                                    <Button
                                        onPress={() => {
                                            Keyboard.dismiss()
                                            ActionSheet.show(
                                                {
                                                    options: this.getMedicalCenterOptions(this.state.times),
                                                    cancelButtonIndex: this.getCancelButtonIndex(
                                                        this.getMedicalCenterOptions(this.state.times)),
                                                    title: "انتخاب مرکز درمانی"
                                                },
                                                buttonIndex => {
                                                    if (this.state.times.length > 0) {
                                                        if (buttonIndex <= this.state.times.length - 1)
                                                            this.setState(
                                                                {selectedTime: this.state.times[buttonIndex]});
                                                    }
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

                                        }}>{this.state.selectedTime.value}</Text>
                                    </Button>
                                </View>}
                            </ModalContent>

                        </Modal>
                    </Content>
                </Root>
            </Container>
        );


    }


}

ServicePlanResult.navigationOptions = {
    header: null,
    title: 'اطلاع رسانی',
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
        backgroundColor: 'rgba(47,246,246,0.06)',
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
    text: {
        textAlign: 'right',
        fontSize: 15
    },
    card: {
        borderWidth: 1,
        borderColor: '#c7c7c7',
        borderRadius: 2,
        elevation: 8
    },
    postText: {
        textAlign: 'right',
        marginTop: 10,
        padding: 1,
        fontSize: 13,

    },
    post: {
        margin: 10,
        flex: 0,
        borderColor: '#23b9b9',
        borderWidth: 5,
        elevation: 8,

    },
    postImage: {
        height: 200,
        width: 300,
        flex: 1,
        alignSelf: 'center'
    },
    modalContent: {
        marginTop: 5,
        padding: 2,
        alignContent: 'center',
        backgroundColor: 'rgba(47,246,246,0.02)'
    },
    badgeStyle: {
        backgroundColor: '#23b9b9',
        elevation: 3,
        padding: 1,
        margin: 1
    },
    badgeText: {
        color: '#fff',
        fontSize: 13
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
});
