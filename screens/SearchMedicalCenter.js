import React, {Component} from 'react';
import {StyleSheet, View, Platform, TextInput, Text} from 'react-native';
import { Picker } from 'react-native-woodpicker'
import {
    Container,
    Header,
    Body,
    Title,
    Content,
    CardItem,
    Footer,
    Card,
    Button,
    Left,
    Right,
    Icon,
    ActionSheet,
    Root
} from 'native-base';
import Drawer from "react-native-drawer";
import SideMenu from "../Menu/SideMenu";

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
            selectedState: '',
            clickedKind: '',
            selected_id: 0
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
                        <Card>

                        </Card>
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
