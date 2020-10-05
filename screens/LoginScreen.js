import * as React from 'react';
import { Text, View, TextInput, TouchableOpacity,
Image, KeyboardAvoidingView, Alert, StyleSheet} from 'react-native';
import {Header} from 'react-native-elements';
import db from '../config';
import firebase from 'firebase';
import { defined } from 'react-native-reanimated';

export default class LoginScreen extends React.Component {
    constructor(){
        super();
        this.state = {
            emailId: '',
            password: ''
        }
    }

    login=async(email, password)=>{
        if(email && password){
            try{
                const response = await firebase.auth().
                signInWithEmailAndPassword(email, password);
                if(response){
                    this.props.navigation.navigate("ReadStory");
                }
            }
            catch(error){
                switch(error.code){
                    case "auth/user-not-found":
                       Alert.alert("There is no user named" + this.state.emailId + "Please click the sign up button to create an account")
                    break;

                    case "auth/invalid-email":
                        Alert.alert("Incorrect email or password :( Please try again!")
                    break;
                }
            }
        }

        else {
            Alert.alert("Enter your email Id and Password to get started!!");
        }
    }

    signUp=(emailId, password)=>{
        firebase.auth().createUserWithEmailAndPassword(emailId, password)
        .then((response)=>{
            return ( 
                Alert.alert("User successfully added")
            )

            switch(response){
                case "email-empty":
                   Alert.alert("There is no user named" + this.state.emailId + "Please click the sign up button to create an account")
                break;

                case "auth/invalid-email":
                    Alert.alert("Incorrect email or password :( Please try again!")
                break;
            }
        })
    
    }

    render(){
        return(
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <View style={{backgroundColor: "#FFE4B5", alignItems: "center", justifyContent: "center" }}>
                <Header
                    backgroundColor={'#DF3A01'}
                    centerComponent={{
                        text: 'STORY HUB',
                        style: {
                        color: '#FFFFFF',
                        fontSize: 30,
                        fontWeight: 'bold',
                        },
                    }}
                />

                <Image source={require("../assets/logo.png")} style={{marginTop: 20}}/>

                <Text style={styles.title}>
                    Welcome to Story Hub, a place where people all 
                    around the world can share their ideas and talents!!
                </Text>
                               
                <View>
                    <TextInput style={styles.loginBox}
                    placeholder="Enter email address"
                    keyboardType="email-address"
                    onChangeText={(text)=>{
                        this.setState({emailId: text})
                    }}/>
                    <TextInput style={styles.loginBox}
                    placeholder="Enter Password"
                    secureTextEntry = {true}
                    onChangeText={(text)=>{
                        this.setState({password: text})
                    }}/>
                </View>

                <View style={{flex: 1}}>
                    <TouchableOpacity style={styles.button}
                    onPress={()=>{
                        this.login(this.state.emailId, this.state.password);
                    }}>
                        <Text style={styles.buttonText}>SIGN IN</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button}
                    onPress={()=>{
                        this.signUp(this.state.emailId, this.state.password);
                        this.props.navigation.navigate("ReadStory");
                    }}>
                        <Text style={styles.buttonText}>SIGN UP</Text>
                    </TouchableOpacity>
                </View>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create ({
    loginBox: {
        width: 300,
        height: 40,
        borderWidth: 3,
        fontSize: 20,
        margin: 10,
        paddingLeft: 10,
        color: "#df3a01",
        borderColor: "#df3a01"
    },
    title: {
        fontWeight: "bold",
        color: "#DF3A01",
        fontSize: 25,
        textAlign: "center",
        margin: 1
    },
    button : {
        height: '20%',
        backgroundColor: "#DF3A01",
        width: 160, 
        borderWidth: 1, 
        marginTop: 20, 
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 12,
    },
    buttonText: {
        textAlign: "center",
        fontSize: 20,
        color: "white",
    },
    container: {
        flex: 1,
        backgroundColor: '#FFE4B5',
        alignItems: "center"
    }

})