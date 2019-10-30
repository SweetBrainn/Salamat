import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
    ActionSheet,
    Button,
    Card,
    Container,
    Content,
    Footer,
    Header,
    Icon,
    Left,
    Right,
    Root,
    List,
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
            active: true,
            medicalCenterSelectedValue: null,
            selectedState: '',
            clickedKind: '',
            selected_id: 0,
            medicalCenters: [
                {name: 'مرکز درمانی 1'},
                {name: 'مرکز درمانی 2'},
                {name: 'مرکز درمانی 3'},
                {name: 'مرکز درمانی 4'},
                {name: 'بیمارستان امام رضا'},
                {name: 'درمانگاه امام حسن'},
            ]
        }
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
        return (
            this.state.medicalCenters.map((value, index) => {
                if(value.name.include(this.state.medicalCenterSelectedValue)){
                    <View key={index}>
                        <Text>
                            value.name
                        </Text>
                    </View>
                }
            })
        )
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
                        <SearchableDropdown

                            onItemSelect={(item) => {
                                this.setState({medicalCenterSelectedValue: item.name}, () => {
                                    alert(item.name)
                                })
                            }}
                            containerStyle={{padding: 5}}
                            itemStyle={{
                                padding: 10,
                                marginTop: 2,
                                backgroundColor: '#fafafa',
                                borderBottomColor: '#23b9b9',
                                borderTopColor: '#fafafa',
                                borderRightColor: '#fafafa',
                                borderLeftColor: '#fafafa',
                                borderWidth: 0.5,
                                borderRadius: 3,
                                textAlign: 'right'
                            }}
                            itemTextStyle={{color: '#222', textAlign: 'right'}}
                            itemsContainerStyle={{maxHeight: 140}}
                            items={this.state.medicalCenters}
                            defaultIndex={0}
                            resetValue={false}
                            chip={true}
                            textInputProps={
                                {
                                    value: this.state.medicalCenterSelectedValue,
                                    placeholder: "نام،خدمات،منطقه و ...",
                                    underlineColorAndroid: "transparent",
                                    style: {
                                        padding: 12,
                                        textAlign: 'right',
                                        borderWidth: 1,
                                        borderColor: '#ccc',
                                        borderRadius: 5,
                                    },

                                }
                            }
                            onTextChange={(text) => (
                                this.setState({medicalCenterSelectedValue: text}, () => {
                                    this.renderList()
                                })
                            )}
                            listProps={
                                {
                                    nestedScrollEnabled: true,
                                }
                            }
                        />
                    </Content>
                </Root>
                <Footer>
                    <Button style={{
                        backgroundColor: '#23b9b9',
                        width: '80%',
                        height: '80%',
                        marginBottom: 5,
                        marginTop: 5,
                        marginRight: 10,
                        marginLeft: 10,
                        alignContent: 'center',
                        justifyContent: 'center'
                    }}>
                        <Text style={{color: '#fff'}}>جستجو</Text>
                    </Button>
                </Footer>
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
        flexDirection: 'row'
    }
});
