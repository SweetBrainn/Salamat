import React, {Component} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {SearchableFlatList, SearchableSectionList} from "react-native-searchable-list";
import CheckAlert from "react-native-awesome-alert"
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


const STATES = ["منطقه 1", "منطقه 2", "منطقه 3", "منطقه 4", "انصراف"];
const DESTRUCTIVE_INDEX_STATE = 4;
const CANCEL_INDEX_STATE = 4;
const KINDS = ["طرف قرارداد", "آزاد", "انصراف"];
const DESTRUCTIVE_INDEX_KIND = 2;
const CANCEL_INDEX_KIND = 2;
export default class SearchMedicalCenter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedMedicalCenter: null,
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
            ignoreCase: true
        };


    }


    showActionState() {
        ActionSheet.show(
            {
                options: STATES,
                cancelButtonIndex: CANCEL_INDEX_STATE,
                destructiveButtonIndex: DESTRUCTIVE_INDEX_STATE,
                title: "انتخاب منطقه"
            },
            buttonIndex => {
                if (buttonIndex !== CANCEL_INDEX_STATE) {
                    this.setState({clicked: STATES[buttonIndex]});
                } else {
                    this.setState({clicked: ""});
                }
            }
        )
    }

    showActionKind() {
        ActionSheet.show(
            {
                options: KINDS,
                cancelButtonIndex: CANCEL_INDEX_KIND,
                destructiveButtonIndex: DESTRUCTIVE_INDEX_KIND,
                title: "انواع مراکز درمانی"
            },
            buttonIndex => {
                if (buttonIndex !== CANCEL_INDEX_KIND) {
                    this.setState({clickedKind: KINDS[buttonIndex]});
                } else {
                    this.setState({clickedKind: ""});
                }
            }
        )
    }

    renderList() {

        this.state.medicalCenters.map((value, index) => {
            if (value.name.includes(this.state.medicalCenterSelectedValue)) {
                return (
                    <View key={index}>
                        <Text>
                            value.name
                        </Text>
                    </View>
                )
            }
        })

    }

    goToMoreInfoScreen(value) {
        for (var i in this.state.data) {
            if (value === this.state.data[i].title) {
                this.setState({selectedMedicalCenter: this.state.data[i]}, () => {
                    this.props.navigation.navigate('DetailsScreen', {medicalCenter: this.props.selectedMedicalCenter})
                })
            }
        }
    }

    render() {
        return (
            <Container>
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
                        {/*<SearchableDropdown*/}

                        {/*    onItemSelect={(item) => {*/}
                        {/*        this.setState({medicalCenterSelectedValue: item.name}, () => {*/}
                        {/*            alert(item.name)*/}
                        {/*        })*/}
                        {/*    }}*/}
                        {/*    containerStyle={{padding: 5}}*/}
                        {/*    itemStyle={{*/}
                        {/*        padding: 10,*/}
                        {/*        marginTop: 2,*/}
                        {/*        backgroundColor: '#fafafa',*/}
                        {/*        borderBottomColor: '#23b9b9',*/}
                        {/*        borderTopColor: '#fafafa',*/}
                        {/*        borderRightColor: '#fafafa',*/}
                        {/*        borderLeftColor: '#fafafa',*/}
                        {/*        borderWidth: 0.5,*/}
                        {/*        borderRadius: 3,*/}
                        {/*        textAlign: 'right'*/}
                        {/*    }}*/}
                        {/*    itemTextStyle={{color: '#222', textAlign: 'right'}}*/}
                        {/*    itemsContainerStyle={{maxHeight: 140}}*/}
                        {/*    items={this.state.medicalCenters}*/}
                        {/*    defaultIndex={0}*/}
                        {/*    resetValue={false}*/}
                        {/*    chip={true}*/}
                        {/*    textInputProps={*/}
                        {/*        {*/}
                        {/*            value: this.state.medicalCenterSelectedValue,*/}
                        {/*            placeholder: "نام،خدمات،منطقه و ...",*/}
                        {/*            underlineColorAndroid: "transparent",*/}
                        {/*            style: {*/}
                        {/*                padding: 12,*/}
                        {/*                textAlign: 'right',*/}
                        {/*                borderWidth: 1,*/}
                        {/*                borderColor: '#ccc',*/}
                        {/*                borderRadius: 5,*/}
                        {/*            },*/}

                        {/*        }*/}
                        {/*    }*/}
                        {/*    onTextChange={(text) => (*/}
                        {/*        this.setState({medicalCenterSelectedValue: text}, () => {*/}
                        {/*            this.renderList()*/}
                        {/*        })*/}
                        {/*    )}*/}
                        {/*    listProps={*/}
                        {/*        {*/}
                        {/*            nestedScrollEnabled: true,*/}
                        {/*        }*/}
                        {/*    }*/}
                        {/*/>*/}
                        {/*<View style={styles.row}>*/}
                        {/*    <List>*/}
                        {/*        {*/}
                        {/*            this.state.medicalCenterSearchResult.map((value, index) => {*/}
                        {/*                return (*/}
                        {/*                    <View key={index}>*/}
                        {/*                        <ListItem>*/}
                        {/*                            <Text>{value.name}</Text>*/}
                        {/*                        </ListItem>*/}
                        {/*                    </View>*/}
                        {/*                )*/}
                        {/*            })*/}
                        {/*        }*/}
                        {/*    </List>*/}
                        {/*</View>*/}
                        <Item regular>
                            <Input placeholder='جستجوی نام مرکز،خدمات،منطقه و ...'
                                   placeholderTextColor={'#d0d0d0'}
                                   style={{textAlign: 'right', fontSize: 13}}
                                   value={this.state.searchTerm}
                                   onChangeText={(searchTerm) => (this.setState({searchTerm: searchTerm}))}
                            />
                        </Item>
                        {/*<Item style={{alignContent:'flex-end',margin:2}}>*/}
                        <View style={styles.row}>
                            <Button transparent style={{alignSelf: 'flex-start', margin: 2, padding: 2}}
                                    onPress={() => this.props.navigation.navigate('MedicalCenterAdvancedSearchScreen')}>
                                <Text style={{textAlign: 'right', fontSize: 13, color: '#23b9b9'}}>جستجوی پیشرفته</Text>
                            </Button>
                        </View>
                        {/*//</Item>*/}
                        <SearchableSectionList
                            style={{marginTop: 15}}
                            sections={this.state.data} searchTerm={this.state.searchTerm}
                            searchByTitle={false}
                            ignoreCase={false}
                            renderSectionHeader={({section: {title}}) => (
                                <ListItem
                                    style={{width: '100%', height: 50, alignSelf: 'center', padding: 2, marginTop: 2}}
                                    onPress={() => {
                                        this.goToMoreInfoScreen(title)
                                    }}
                                >
                                    <Body>
                                        <Text style={{
                                            color: '#000',
                                            width: '100%',
                                            height: '100%',
                                            textAlign: 'right',
                                            fontSize: 15,
                                            padding: 2
                                        }}>{title}</Text>
                                    </Body>
                                </ListItem>
                            )}
                            renderItem={({item}) => (
                                <Text style={{width: 0, height: 0}}>s</Text>
                            )}
                            keyExtractor={item => item}
                        />

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
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    }
});
