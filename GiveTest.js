import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ImageBackground, TextInput, Dimensions, TouchableOpacity } from 'react-native';
//type Props = {};
import bgimage from '../Images/bg2.jpeg';
import { ScrollView } from 'react-native-gesture-handler';
const { width: WIDTH } = Dimensions.get('window');
export default class GiveTest extends Component {

    constructor() {
        super();
        this.state = {
            name: null,
            testId: null,
            loaded: null,
            questionPaper: null,    //it is an object which has {name and paper}, paper is an array of objects [{},{},{}...]
            count: null,
            ans: null
        }
    }

    componentDidMount() {
        this.setState({
            loaded: false,
            count: 0
        })
    }

    handleTestId = (testId) => {
        this.setState({
            testId
        })
    }

    handleIdSubmit = () => {
        const { db } = this.props.navigation.state.params;
        var docRef = db.collection("Question-Papers").doc(this.state.testId);

        docRef.get().then(doc => { this.setState({ questionPaper: doc.data(), loaded: true, name: doc.data().name }) })
            .catch(function (error) {
                console.log("Error getting document:", error);
            });
    }

    handleAnswer = (ans) => {
        this.setState({
            ans
        })
    }

    handleAnswerPress = () => {
        let question = this.state.questionPaper.paper[this.state.count];
        if (this.state.ans.toLowerCase() === question.ans.toLowerCase()) {
            question.isCorrect = true;
        }
        // console.log(question);
        let count = this.state.count + 1;
        this.setState({
            count
        })
    }

    handleSubmit = () => {
        // console.log(this.state.questionPaper);
        // store questionPaper in users DB and revrt back to choice screen.

        const { db } = this.props.navigation.state.params;
        const { auth } = this.props.navigation.state.params;

        db.collection("Users").doc(auth.currentUser.uid).collection("Tests").doc(this.state.testId).set({
            result: this.state.questionPaper,
            name: this.state.name

        })
            .then(() => this.params.navigation.navigate("StudentLandingScreen"))
            .catch((e) => console.log("Error: " + e.message()));
    }

    render() {
        return (
            <ImageBackground
                source={bgimage}
                style={styles.container}
                resizeMode="stretch"
            >
                <TextInput
                    placeholder="Test ID"
                    onChangeText={this.handleTestId}
                    style={styles.text1}
                />
                <TouchableOpacity onPress={this.handleIdSubmit}>
                    <Text style={styles.text1}>Enter</Text>
                </TouchableOpacity>

                <ScrollView>
                    {this.state.loaded ? (
                        <ScrollView>
                            <Text>
                                {this.state.questionPaper.paper[this.state.count].question}
                            </Text>
                            <Text>
                                {this.state.questionPaper.paper[this.state.count].optionA}
                            </Text>
                            <Text>
                                {this.state.questionPaper.paper[this.state.count].optionB}
                            </Text>
                            <Text>
                                {this.state.questionPaper.paper[this.state.count].optionC}
                            </Text>
                            <Text>
                                {this.state.questionPaper.paper[this.state.count].optionD}
                            </Text>
                            <TextInput maxLength={1} onChangeText={this.handleAnswer} placeholder="Answer" style={{ borderWidth: 1, borderColor: 'yellow' }} />
                            {
                                this.state.count < (2 - 1) ? (
                                    <TouchableOpacity onPress={this.handleAnswerPress} >
                                        <Text>Answer</Text>
                                    </TouchableOpacity>
                                ) : (
                                        <TouchableOpacity onPress={this.handleSubmit} >
                                            <Text>Submit</Text>
                                        </TouchableOpacity>
                                    )
                            }
                        </ScrollView>
                    ) : (
                            <Text>
                                Please enter test ID
                        </Text>
                        )}
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
    text: {
        color: 'white',
        fontSize: 27,
        textAlign: 'center',
    },
    text1: {
        marginTop: 10,
        color: 'white',
        fontSize: 20,
        marginHorizontal: 6,
        position: 'relative',
        flexDirection: 'column',
        textAlign: 'center'
    },
    btn: {
        width: WIDTH - 200,
        height: 45,
        justifyContent: 'center',
        backgroundColor: '#302E2E',
        alignItems: 'center'
    },
    btnView: {
        flex: 1,
        height: 45,
        justifyContent: 'center',
        marginTop: 4,
        alignItems: 'center'
    },
    quiz: {
        flex: 4,
        alignItems: 'center',
        marginTop: 150,
        backgroundColor: '#302E2E',
        width: WIDTH - 25,
        height: 45,
    },
    question: {
        flex: 1,
        backgroundColor: '#380303',
        width: WIDTH - 25
    },
    options: {
        flex: 6,
        marginVertical: 12,
        backgroundColor: '#302E2E',
        width: WIDTH - 25,
        flexDirection: "row"
    },
    options1: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    },
    options2: {
        flex: 4,
        justifyContent: 'center',
        textAlign: 'center',
    },
    options3: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        textAlign: 'center'
    },
    options4: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#3d3b3b',
        marginVertical: 3,
        marginRight: 15,
        height: 50,
        justifyContent: 'center',
        textAlign: 'center'
    }
});