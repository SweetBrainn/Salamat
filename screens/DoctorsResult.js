import React, {Component} from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
    Text,
    Keyboard,
    View,
    SafeAreaView, ScrollView
} from 'react-native';
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
    CardItem,
    ListItem,
    Card,
    Badge, List, Thumbnail
} from 'native-base';
import SearchableDropdown from 'react-native-searchable-dropdown';
import Modal, {ModalButton, ModalContent, ModalFooter, ModalTitle, SlideAnimation} from "react-native-modals";
import PersianCalendarPicker from "react-native-persian-calendar-picker";


export default class DoctorsResult extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedDoctor: {},
            result: null,
            visible: false,
            Gender: null,
            Skill: null,
            Certificate: null,
        };


    }

    generateTitle(doctor) {
        if (doctor != null) {
            let title = doctor.FirstName + ' ' + doctor.LastName;
            return title;
        }
    }

    goToDetailsScreen(value) {
        this.props.navigation.navigate('DetailsScreen', {doctor: value, medicalCenter: null})

    }


    async componentWillMount(): void {
        var token = await AsyncStorage.getItem('token');
        var baseUrl = await AsyncStorage.getItem('baseUrl')
        var result = await this.props.navigation.getParam('result')
        var Gender = await this.props.navigation.getParam('Gender')
        var Skill = await this.props.navigation.getParam('Skill')
        var Certificate = await this.props.navigation.getParam('Certificate')
        await this.setState({
            baseUrl: baseUrl,
            token: token,
            result: result,
            Gender: Gender,
            Skill: Skill,
            Certificate: Certificate,
        }, () => {
            // alert(JSON.stringify(this.state.filters))
        })

    }

    render() {
        return (
            <Container>
                <StatusBar  translucent backgroundColor={"#219e9e"} barStyle={"light-content"}/>
                <Header style={styles.header}>
                    <Left>
                        <Button transparent style={styles.headerMenuIcon}
                                onPress={() => {
                                    Keyboard.dismiss();
                                    if (typeof this.props.navigation.getParam('medicalCenter') !== 'undefined' ||
                                        typeof this.props.navigation.getParam('medicalCenter') != null) {

                                        this.props.navigation.navigate('SearchDoctorScreen',
                                            {medicalCenter: typeof this.props.navigation.getParam('medicalCenter')})
                                    } else {
                                        this.props.navigation.navigate('SearchDoctorScreen')
                                    }
                                }}>
                            <Icon style={styles.headerMenuIcon} name='arrow-back'
                                  onPress={() => {
                                      Keyboard.dismiss();
                                      if (typeof this.props.navigation.getParam('medicalCenter') !== 'undefined' ||
                                          typeof this.props.navigation.getParam('medicalCenter') != null) {

                                          this.props.navigation.navigate('SearchDoctorScreen',
                                              {medicalCenter: typeof this.props.navigation.getParam('medicalCenter')})
                                      } else {
                                          this.props.navigation.navigate('SearchDoctorScreen')
                                      }
                                  }}/>
                        </Button>
                    </Left>
                    <Right>
                        <Text style={[styles.headerText,
                            {
                                fontSize: 20
                            }]}>

                            نتایج جستجو
                        </Text>
                    </Right>
                </Header>
                <Root>
                    <Content scrollEnabled={false} padder style={styles.content}>



                        {
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
                                    flexWrap: 'wrap'
                                }}>


                                    {this.state.Gender != null && <Badge style={styles.badgeStyle}>
                                        <Text style={styles.badgeText}>{this.state.Gender}</Text>
                                    </Badge>}
                                    {this.state.Skill != null && <Badge style={styles.badgeStyle}>
                                        <Text style={styles.badgeText}>{this.state.Skill}</Text>
                                    </Badge>}
                                    {this.state.Certificate != null && <Badge style={styles.badgeStyle}>
                                        <Text style={styles.badgeText}>{this.state.Certificate}</Text>
                                    </Badge>}

                                </CardItem>
                            </Card>
                        }
                        <ScrollView style={{flex: 1, width: '100%', height: '100%'}}>
                            {(this.state.result != null) ? this.state.result.map((item, key) => (

                                <View key={key} style={{borderBottomColor: '#e9e9e9', borderBottomWidth: 1}}>
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
                                              onPress={() => {
                                                  Keyboard.dismiss()
                                                  this.setState({selectedDoctor: item, visible: true})
                                              }
                                              }

                                    >
                                        <Body style={{height: '100%', marginRight: 5, alignSelf: 'center'}}>
                                            <Text style={{
                                                color: '#000',
                                                textAlign: 'right',
                                                fontSize: 15,
                                            }}>{this.generateTitle(item)}</Text>
                                            <Text style={{
                                                color: '#a9a9a9',
                                                textAlign: 'right',
                                                fontSize: 12,
                                                marginTop: 5,
                                                marginRight: 1
                                            }}>{item.Description}</Text>
                                        </Body>
                                        <Right>
                                            <Thumbnail circular
                                                       source={{uri: 'http://shahresalem.tehran.ir/Portals/0/Image/1397/%D8%AE%D8%A8%D8%B1/hamayesh/roze%20pezeshk/3.JPG'}}/>
                                        </Right>
                                    </ListItem>
                                </View>
                            )) : null}
                        </ScrollView>

                        <Modal
                            width={300}
                            onTouchOutside={() => {
                                this.setState({visible: false});
                            }}
                            visible={this.state.visible}
                            modalTitle={<ModalTitle style={styles.modalTitle} textStyle={styles.modalTitleText}
                                                    title={this.generateTitle(this.state.selectedDoctor)}/>}
                            modalAnimation={new SlideAnimation({
                                slideFrom: 'bottom'
                            })}
                            footer={
                                <ModalFooter style={styles.modalFooter}>
                                    <ModalButton
                                        style={[styles.modalCancelButton]}
                                        textStyle={styles.modalCancelButtonText}
                                        text="رزرو نوبت"
                                        onPress={() => {
                                            alert('clicked')
                                        }}
                                    />
                                    <ModalButton
                                        style={[styles.modalSuccessButton]}
                                        textStyle={[styles.modalSuccessButtonText]}
                                        text="اطلاعات بیشتر"
                                        onPress={() => {
                                            this.setState({visible: false})
                                            this.goToDetailsScreen(this.state.selectedDoctor)
                                        }
                                        }
                                    />
                                </ModalFooter>
                            }
                        >
                            <ModalContent style={styles.modalContent}>
                                <View>
                                    {this.state.selectedDoctor &&
                                    <View>
                                        <Text style={[styles.modalCancelButtonText,
                                            {
                                                fontSize: 13,
                                                fontWeight: 'bold',
                                                margin: 1,
                                                marginTop: 2,
                                                padding: 1
                                            }]}>{(this.state.selectedDoctor.Description != null &&
                                            this.state.selectedDoctor.Description !== '') ?
                                            this.state.selectedDoctor.Description : ''}</Text>
                                        <Text style={[styles.modalCancelButtonText,
                                            {
                                                margin: 1,
                                                marginTop: 2,
                                                padding: 1,
                                                fontSize: 13,
                                                fontWeight: 'bold'
                                            }]}>{(this.state.selectedDoctor.LastCertificate != null &&
                                            this.state.selectedDoctor.LastCertificate !== '') ?
                                            this.state.selectedDoctor.LastCertificate : ''}</Text>
                                        <Text style={[styles.modalCancelButtonText,
                                            {
                                                fontSize: 13, fontWeight: 'bold', margin: 1,
                                                marginTop: 2,
                                                padding: 1
                                            }]}>{(this.state.selectedDoctor.Skill !=
                                            null &&
                                            this.state.selectedDoctor.Skill !== '') ?
                                            this.state.selectedDoctor.Skill : ''}</Text>
                                    </View>
                                    }
                                </View>
                            </ModalContent>
                        </Modal>
                    </Content>
                </Root>
            </Container>
        );


    }
}
DoctorsResult.navigationOptions = {
    gesturesEnabled: false,
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
        margin: 5,
        padding: 5,
        paddingTop: 1,
        paddingBottom: 1,
        flexDirection: 'column',
        borderWidth: 1,
        borderColor: '#e2e2e2'
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
    },
    filterText: {
        color: 'gray',
        textAlign: 'right',
        fontWeight: 'bold'
    },
    badgeStyle: {
        backgroundColor: '#23b9b9',
        elevation: 3,
        padding: 1,
        margin: 1

    },
    badgeText: {
        color: '#fff',
    },
    titleStyle: {
        color: '#1f9292',
        fontSize: 13,
        textAlign: 'right'
    },
    rightIconStyle: {
        color: '#1f9292',
        fontSize: 15
    },
    items: {
        padding: 2,
        margin: 2,
    },
    card: {
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#23a5a5',
        borderRadius: 1,
        elevation: 8,
        margin: 2,
    },
    cardHeader: {
        borderWidth: 1,
        borderBottomColor: '#1f9292',
        borderColor: '#fff'
    },
    body: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center'
    }
});