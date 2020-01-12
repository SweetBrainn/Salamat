import React, {Component} from 'react';
import {StyleSheet, View, Text, StatusBar, Image} from 'react-native';
import {Button, Input, Item, Container, Content, Card, Icon} from 'native-base'

export default class GetVerificationCodeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            valid: false,
            red: '#db1c09',
            green: '#00b452',
            color: '#db1c09',
            icon: 'close-circle',
            check: 'checkmark-circle',
            error: 'close-circle'
        }
    }


    phoneNumberValidation(value) {
        const regex = RegExp('^(\\+98|0)?9\\d{9}$');
        let phone = new String(value)
        let status = regex.test(phone);
        if (status) {
            this.setState({valid: status, color: this.state.green, icon: this.state.check})
            return status;
        } else {
            this.setState({valid: status, color: this.state.red, icon: this.state.error})
            return status;
        }
    }


    render() {
        return (
            <Container>
                <Content scrollEnabled={false} contentContainerStyle={{flex: 1}}
                         style={{flex: 1, width: '100%', height: '100%'}}>
                    <StatusBar hidden translucent backgroundColor="transparent" barStyle={"light-content"}/>
                    <View style={{width: '100%', height: '50%'}}>
                        <Image
                            style={styles.container}
                            source={require('D:\\E\\react native projects\\salamat\\assets\\images\\splash.png')}>
                        </Image>
                    </View>
                    <View style={[styles.main, {width: '100%', height: '50%'}]}>
                        <Card style={styles.myCard}>
                            <Item
                                style={[styles.itemStyle, {borderBottomColor: this.state.color, borderBottomWidth: 1}]}>
                                <Input placeholder='شماره تلفن خود را وارد کنید' placeholderTextColor={'gray'}
                                       style={[styles.inputStyle]}
                                       keyboardType={'numeric'}
                                       onChangeText={(text) => {
                                           this.setState({phone: text});
                                           this.phoneNumberValidation(text);

                                       }}/>
                                <Icon name={this.state.icon} style={{color: this.state.color}}/>
                            </Item>
                            <Button light style={styles.buttonStyle} onPress={() => {
                                if (this.phoneNumberValidation(this.state.phone)) {
                                    // alert('Sent')
                                    this.props.navigation.navigate('VerifyScreen');
                                } else {
                                    alert('لطفا شماره تلفن خود را وارد کنید')
                                }
                            }}>
                                <Text style={styles.textStyle}>دریافت کد فعال سازی</Text>
                            </Button>
                        </Card>
                    </View>
                </Content>
            </Container>
        );
    }

}

GetVerificationCodeScreen.navigationOptions = {
    header: null
};

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        backgroundColor: '#fff',
        width: '100%',
        height: '100%'
    },
    main: {
        backgroundColor: '#23b9b9',
        flex: 1,
        padding: 10,
        borderColor: '#fff'
    },
    itemStyle: {
        marginTop: 15,
        marginRight: 20,
        marginLeft: 20,
        padding: 2,
        alignSelf: 'center'
    },
    inputStyle: {
        textAlign: 'center',
        color: '#23b9b9',
        padding: 2
    },
    buttonStyle: {
        alignSelf: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        marginTop: 25,
        backgroundColor: '#23b9b9'
    },
    textStyle: {
        textAlign: 'center',
        color: '#fff',
        padding: 5
    },
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
    myCard: {
        borderWidth: 2,
        borderColor: '#23b9b9',
        elevation: 8,
        margin: 10,
        padding: 1,
        height: '90%',
        flexDirection: 'column'
    }
});
