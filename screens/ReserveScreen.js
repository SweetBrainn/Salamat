import React, {Component} from 'react';
import {StyleSheet, View, Platform, StatusBar} from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';
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
    Card
} from 'native-base';

const medicalItems = [
    {
        id: 1,
        name: 'مرکز شماره 1',
    },
    {
        id: 2,
        name: 'مرکز شماره 2',
    },
    {
        id: 3,
        name: 'مرکز شماره 3',
    },
    {
        id: 4,
        name: 'بیمارستان میلاد',
    },
    {
        id: 5,
        name: 'بیمارستان امام خمینی',
    },
    {
        id: 6,
        name: 'درمانگاه مرکزی شهرداری',
    },
    {
        id: 7,
        name: 'بیمارستان شماره 4',
    },
    {
        id: 8,
        name: 'بیمارستان امام حسین',
    },
];
const Doctors = []
export default class ReserveScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedItems: [
                {
                    id: 7,
                    name: 'Go',
                },
            ]
        }
    }

    search(text) {
        if (text.length > 3) {
            alert(text)
        }
    }

    render() {
        return (
            <Container>
                <Header hasTabs style={{backgroundColor: '#23b9b9'}}>
                    <Left>
                        <Button transparent style={styles.headerMenuIcon}>
                            <Icon style={styles.headerIcon} type='FontAwesome' name='h-square'/>
                            <Text style={styles.headerText}>مرکز درمانی</Text>
                        </Button>
                        {/*<Button transparent style={styles.headerMenuIcon}*/}
                        {/*        onPress={() => this.props.navigation.openDrawer()}>*/}
                        {/*    <Icon style={styles.headerMenuIcon} name='menu'*/}
                        {/*          onPress={() => this.props.navigation.openDrawer()}/>*/}
                        {/*</Button>*/}
                    </Left>
                    <Right>
                        {/*<Text style={styles.headerText}>نوبت دهی</Text>*/}
                        <Button transparent style={styles.headerMenuIcon}>
                        <Icon style={styles.headerIcon} type='FontAwesome' name='search'/>
                        <Text style={styles.headerText}>تخصص</Text>
                        </Button>
                    </Right>
                </Header>
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
        paddingTop:5,
        paddingBottom:5,
        fontSize: 15,
        color:'#fff'
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
