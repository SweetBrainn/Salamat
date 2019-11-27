import React, {Component} from 'react';
import {StyleSheet, TextInput, View, Platform, StatusBar, Image, ActivityIndicator} from 'react-native';
import {Table, Row, Rows} from 'react-native-table-component';
import {
    Container,
    Header,
    Title,
    Content,
    Accordion,
    FooterTab,
    Button,
    Card,
    Left,
    CardItem,
    Thumbnail,
    Right,
    Body,
    Icon,
    Text,
    Fab
} from 'native-base';
import Drawer from "react-native-drawer";
import SideMenu from "../Menu/SideMenu";


export default class ProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeFab: true,
            TextInputEditable: false,
            TextInputColor: '#7a7a7a',
            animated: true,
            username: 'M.Hoseini',
            name: ' محمد ',
            family: ' حسینی ',
            nationalCode: '0021578953',
            birthDate: '1370/1/2',
            gender: 'مرد',
            FabIcon: 'edit',
            FabColor: '#23b9b9',
            headerText: 'حساب کاربری',
            headers: ["شرکت بیمه", "نوع بیمه", "کد بیمه", "سریال بیمه"],
            rows: [
                ["تامین اجتماعی", "تکمیلی", "1055396", "7071468"],
                ["تامین اجتماعی", "پایه", "884680", "1564334"],
                ["تامین اجتماعی", "تکمیلی", "6889413", "4148430"],
            ],
            insurances: [
                {
                    insurance: "تامین اجتماعی",
                    code: "11111111111",
                    serial: "69969555555",
                    insuranceType: "تکمیلی"
                },
                {
                    insurance: "تامین اجتماعی",
                    code: "8798765656",
                    serial: "152045045698",
                    insuranceType: "پایه"
                },
                {
                    insurance: "تامین اجتماعی",
                    code: "8798765656",
                    serial: "152045045698",
                    insuranceType: "پایه"
                }
            ],
            insurancesForShow:
                [{title: "First Element", content: "Lorem ipsum dolor sit amet"},
                    {title: "Second Element", content: "Lorem ipsum dolor sit amet"},
                    {title: "Third Element", content: "Lorem ipsum dolor sit amet"}
                ]
        }

    }


    getContent() {
        let data = null;
        let array = [];
        for (let item of this.state.insurances) {
            let insuranceForShow = {
                title: item.insurance,
                content: " بیمه " + item.insuranceType + " با شماره " + item.serial + " و کد " + item.code
            }
            array.push(insuranceForShow)
        }
        this.setState({insurancesForShow: array})
    }

    FabClicked() {
        if (!this.state.TextInputEditable) {
            this.setState({
                TextInputEditable: true,
                TextInputColor: '#000',
                FabColor: '#68d14c',
                FabIcon: 'check',
                headerText: 'ویرایش حساب کاربری'
            })
        } else {
            this.setState({
                TextInputEditable: false,
                TextInputColor: '#7a7a7a',
                FabColor: '#23b9b9',
                FabIcon: 'edit',
                headerText: ' حساب کاربری'
            })
        }
    }

    componentWillMount(): void {
        this.getContent()
    }

    componentDidMount(): void {
        this.getContent()
    }

    render() {
        return (
            <Container>
                <StatusBar hidden translucent backgroundColor="transparent"/>
                <Header style={{
                    backgroundColor: '#23b9b9', shadowOffset: {height: 0, width: 0},
                    shadowOpacity: 0, shadowColor: '#23b9b9'
                }}>
                    <Left>
                        <Button transparent style={styles.headerMenuIcon}
                                onPress={() => this.props.navigation.openDrawer()}>
                            <Icon style={styles.headerMenuIcon} name="menu"
                                  onPress={() => this.props.navigation.openDrawer()}/>
                        </Button>
                    </Left>
                    <Right>
                        <Text style={styles.headerText}>{this.state.headerText}</Text>
                    </Right>
                </Header>
                <Content scrollEnabled={true} style={[styles.content]}>
                    <View style={styles.container}>
                        <View style={styles.header}></View>
                        <Image style={styles.avatar}
                               onLoadEnd={() => {
                                   this.setState({animated: !this.state.animated})
                               }}
                               source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
                        <ActivityIndicator size={'small'} color={'gray'} animating={this.state.animated}/>
                        <View style={styles.body}>
                            <View style={styles.card}>
                                <View style={styles.row}>
                                    <TextInput
                                        style={[styles.textInput, {color: this.state.TextInputColor}]}
                                        value={this.state.username}
                                        onChangeText={(text) => {
                                            this.setState({username: text})
                                        }}
                                        multiline={false}
                                        editable={this.state.TextInputEditable}/>
                                    <Text style={styles.label}>نام کاربری</Text>
                                </View>
                                <View style={styles.row}>
                                    <TextInput style={[styles.textInput, {color: this.state.TextInputColor}]}
                                               value={this.state.name}
                                               onChangeText={(text) => {
                                                   this.setState({name: text})
                                               }}
                                               multiline={false}
                                               editable={this.state.TextInputEditable}/>
                                    <Text style={styles.label}>نام</Text>
                                </View>
                                <View style={styles.row}>
                                    <TextInput style={[styles.textInput, {color: this.state.TextInputColor,}]}
                                               value={this.state.family}
                                               multiline={false}
                                               onChangeText={(text) => {
                                                   this.setState({family: text})
                                               }}
                                               multiline={false}
                                               editable={this.state.TextInputEditable}/>
                                    <Text style={styles.label}>نام خانوادگی</Text>
                                </View>
                                <View style={styles.row}>
                                    <TextInput style={[styles.textInput, {color: this.state.TextInputColor}]}
                                               value={this.state.nationalCode}
                                               onChangeText={(text) => {
                                                   this.setState({nationalCode: text})
                                               }}
                                               multiline={false}
                                               editable={this.state.TextInputEditable}/>
                                    <Text style={styles.label}>کد ملی</Text>
                                </View>
                                <View style={styles.row}>
                                    <TextInput style={[styles.textInput, {color: this.state.TextInputColor}]}
                                               value={this.state.birthDate}
                                               onChangeText={(text) => {
                                                   this.setState({birthDate: text})
                                               }}
                                               multiline={false}
                                               editable={this.state.TextInputEditable}/>
                                    <Text style={styles.label}>تاریخ تولد</Text>
                                </View>
                                <View style={[styles.row, {
                                    borderWidth: 0,
                                    borderColor: '#fff',
                                    borderBottomWidth: 0,
                                    borderBottomColor: '#fff'
                                }]}>
                                    <TextInput style={[styles.textInput]}
                                               value={this.state.gender}
                                               multiline={false}
                                               editable={false}/>
                                    <Text style={styles.label}>جنسیت</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>
                                        بیمه های من :
                                    </Text>
                                </View>
                                {/*<View style={{padding: 5, margin: 5, marginTop: 10}}>*/}
                                {false && <Table
                                    borderStyle={{
                                        borderWidth: 1,
                                        borderRadius: 2,
                                        margin: 2,
                                        padding: 2,
                                        borderColor: '#23b9b9'
                                    }}>
                                    <Row data={this.state.headers} flexArr={[2, 1, 1, 1]} style={{
                                        alignContent: 'center',
                                        justifyContent: 'center',
                                    }}
                                         textStyle={{
                                             textAlign: 'center',
                                             fontSize: 13,
                                             fontWeight: 'bold'
                                         }}/>
                                    <Rows data={this.state.rows} flexArr={[2, 1, 1, 1]} style={{
                                        alignContent: 'center',
                                        justifyContent: 'center',
                                    }}
                                          textStyle={{
                                              textAlign: 'center',
                                              fontSize: 13
                                          }}/>
                                </Table>}
                                <Accordion style={{margin:5,flexDirection: 'column-reverse', flex: 1}}
                                           dataArray={this.state.insurancesForShow}
                                           headerStyle={{
                                               backgroundColor: "rgba(35,185,185,0.72)",
                                               flexDirection: 'row-reverse'
                                           }}
                                           contentStyle={{
                                               backgroundColor: "rgba(49,255,255,0)",
                                               flexDirection: 'row-reverse',
                                               alignContent: 'flex-start',
                                               backfaceVisibility:'hidden',
                                               alignItems:'flex-start',
                                               borderColor:'#23b9b9',
                                               borderWidth:1

                                           }}
                                           iconStyle={{color: "white"}}
                                           expandedIconStyle={{color: "white"}}
                                />
                                {/*</View>*/}
                            </View>
                        </View>
                    </View>
                </Content>
                {/*<Footer style={styles.footer}>*/}
                {/*    <View style={{flex: 1, backgroundColor: '#fff'}}>*/}
                {/*        <Fab*/}
                {/*            active={this.state.active}*/}
                {/*            direction="up"*/}
                {/*            style={{backgroundColor: this.state.FabColor}}*/}
                {/*            position="bottomRight"*/}
                {/*            onPress={() => this.FabClicked()}>*/}
                {/*            <Icon type='FontAwesome' name={this.state.FabIcon}/>*/}
                {/*        </Fab>*/}
                {/*    </View>*/}
                {/*</Footer>*/}
            </Container>
        );
    }

}

ProfileScreen.navigationOptions = {
    header: null,
    title: 'حساب کاربری',
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
        color: '#fff',
    },
    headerText: {
        fontSize: 20,
        padding: 5,
        color: '#fff',
    },
    container: {

        flex: 1
    },
    header: {
        width: '100%',
        backgroundColor: "#23b9b9",
        height: 180,
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom: 10,
        alignSelf: 'center',
        position: 'absolute',
        marginTop: 60
    },
    body: {
        flex: 1,
        width: '100%',
        height: '100%',
        marginTop: 5,
        backgroundColor: 'rgba(47,246,246,0.02)',
    },
    label: {
        textAlign: 'right',
        color: '#000',
        fontSize: 15,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        margin: 2,
        flex: 1,
        padding: 3,
    },
    textInput: {
        textAlign: 'right',
        fontSize: 15,
        padding: 3,
        alignSelf: 'flex-end',
        margin: 2,
        flex: 2,
    },
    card: {
        flex: 1,
        padding: 5,
        flexDirection: 'column',
        marginTop: 5,
        marginBottom: 5,
        marginRight: 10,
        marginLeft: 10,
        borderRadius: 5,
        borderColor: '#d8d8d8',
        borderWidth: 1,
        elevation: 8
    },
    row: {
        flexDirection: 'row',
        marginRight: 5,
        marginLeft: 5,
        marginTop: 15,
        marginBottom: 3
    },
    footer: {
        backgroundColor: '#fff'
    }
});
