import React, {Component} from 'react';
import {StyleSheet, View, Platform, StatusBar} from 'react-native';
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
    Card, Tab
} from 'native-base';
import MedicalFilesScreen from "./MedicalFilesScreen";
import ShowReservesScreen from "./ShowReservesScreen";
import InboxScreen from "./InboxScreen";


export default class ReserveScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            initialPage: 1,
        }
    }


    render() {
        return (
            <Container>
                <StatusBar  translucent backgroundColor={"#219e9e"} barStyle={"light-content"}/>
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
