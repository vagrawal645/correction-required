import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ImageBackground, TextInput, Dimensions, TouchableOpacity } from 'react-native';
//type Props = {};
import bgimage from '../Images/1.jpeg';
import { ScrollView } from 'react-native-gesture-handler';
const { width: WIDTH } = Dimensions.get('window');
export default class App extends Component {

    render() {
        return (

            <ImageBackground
                source={bgimage}
                style={styles.container}
                resizeMode="stretch"
            >
                <ScrollView>
                    <View style={styles.header}>
                        <Text style={styles.text}>
                            Create Quiz
        </Text>
                    </View>
                    <View>
                        <TextInput
                            style={styles.input1}
                            placeholder='Enter Question'
                            placeholderTextColor='white'
                            underlineColorAndroid='transparent'
                        />
                    </View>
                    <View>
                        <TextInput
                            style={styles.input2}
                            placeholder='Option 1'
                            placeholderTextColor='white'
                            underlineColorAndroid='transparent'
                        />
                    </View>
                    <View>
                        <TextInput
                            style={styles.input2}
                            placeholder='Option 2'
                            placeholderTextColor='white'
                            underlineColorAndroid='transparent'
                        />
                    </View>
                    <View>
                        <TextInput
                            style={styles.input2}
                            placeholder='Option 3'
                            placeholderTextColor='white'
                            underlineColorAndroid='transparent'
                        />
                    </View>
                    <View>
                        <TextInput
                            style={styles.input2}
                            placeholder='Option 4'
                            placeholderTextColor='white'
                            secureTextEntry={true}
                            underlineColorAndroid='transparent'
                        />
                    </View>
                    <TouchableOpacity style={styles.btn}>
                        <Text style={styles.text}>Submit</Text>
                    </TouchableOpacity>
                </ScrollView>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: null,
        height: null,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input1: {
        width: WIDTH - 25,
        height: 85,
        fontSize: 18,
        paddingLeft: 45,
        marginHorizontal: 25,
        backgroundColor: '#770A0A',
        color: 'white',
        marginTop: 120,
        justifyContent: 'center'
    },
    input2: {
        width: WIDTH - 25,
        height: 45,
        fontSize: 18,
        paddingLeft: 45,
        marginHorizontal: 25,
        backgroundColor: '#770A0A',
        color: 'white',
        marginTop: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btn: {
        width: WIDTH - 25,
        height: 45,
        justifyContent: 'center',
        marginTop: 20,
        backgroundColor: '#302E2E',
        alignItems: 'center'
    },
    text: {
        color: 'white',
        fontSize: 24,
        textAlign: 'center'
    },
});
