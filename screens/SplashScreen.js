import React, {Component} from 'react';
import {StyleSheet, View, ImageBackground} from 'react-native';


export default class SplashScreen extends Component {
    performTimeConsumingTask = async () => {
        return new Promise((resolve) =>
            setTimeout(
                () => {
                    resolve('result')
                },
                2000
            )
        )
    }

    async componentDidMount() {
        const data = await this.performTimeConsumingTask();

        if (data !== null) {
            this.props.navigation.navigate('HomeScreen');
        }
    }

    render() {
        return (
            <ImageBackground style={styles.container}
                             source={require('D:\\E\\react native projects\\salamat\\assets\\images\\splash.png')}
                              onPress={()=>this.props.navigation.navigate('Home')}>
            </ImageBackground>
        );
    }

}

SplashScreen.navigationOptions = {
    header: null
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
