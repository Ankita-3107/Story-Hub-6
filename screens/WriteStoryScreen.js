import * as React from 'react';
import { Text, ToastAndroid, TextInput, StyleSheet, KeyboardAvoidingView, Image } from 'react-native';
import { Header } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import db from "../config";
import firebase from 'firebase';

export default class WriteStoryScreen extends React.Component {
  constructor(){
    super();
    this.state = {
      title: "",
      author: "",
      story: "",
    }
  }

  submitStory=()=>{
    if(this.state.title.trim()===""){
      alert("Please enter a title");
     this.setState({author: "Not available"});
    }
    else if(this.state.story.trim()===""){
      alert("Please type in your story!");
    }
    else if(this.state.title.trim()==="" && this.state.story.trim()===""){
      alert("Please enter a title and type in your story!");
     this.setState({author: "Not available"});
    }
    else {
      db.collection("Stories").add({
        "TitleoftheStory": this.state.title,
        "AuthoroftheStory": this.state.author,
        "Story": this.state.story,
      })
      this.setState({
        title: "",
        author: "",
        story: "",
      })
    }
  }
  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="margin" enabled>
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
        <TextInput
          style={styles.inputBox}
          placeholder="Title of the Story"
          onChangeText={(text) => {
            this.setState({ title: text });
          }}
          value={this.state.title}></TextInput>
        <TextInput
          style={styles.inputBox}
          placeholder="Author of the Story"
          onChangeText={(text) => {
            this.setState({ author: text });
          }}
          value={this.state.author}></TextInput>
        <TextInput
          style={styles.content}
          placeholder="Write your Story here"
          multiline={true}
          onChangeText={(text) => {
            this.setState({ story: text });
          }}
          value={this.state.story}></TextInput>

        <TouchableOpacity style={styles.submitButton} onPress={()=>{
          this.submitStory();
          ToastAndroid.show("Yay!! Your story has been submitted!",ToastAndroid.SHORT,ToastAndroid.CENTER);
        }}>
          
          <Text style={styles.buttonText}>SUBMIT</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  submitButton: {
    backgroundColor: '#DF3A01',
    marginTop: 15,
    width: 150,
    height: 50,
    borderWidth: 1.5,
    borderColor: '#FF0000',
    marginBottom: 10,
    borderRadius: 15,
    alignSelf: 'center',
  },
  container: {
    backgroundColor: '#F5BCA9',
    flex: 1,
    alignItems: "center"
  },
  buttonText: {
    fontSize: 25,
    textAlign: 'center',
    marginTop: 7,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  inputBox: {
    width: '80%',
    height: '10%',
    borderWidth: 2,
    fontSize: 20,
    marginTop: 15,
    textAlign: 'center',
    backgroundColor: 'white',
    fontWeight: 'bold',
    color: '#DF3A01',
  },
  content: {
    backgroundColor: 'white',
    marginTop: 20,
    width: '80%',
    fontWeight: 'bold',
    color: '#DF3A01',
    height: "50%",
    borderWidth: 2,
    textAlign: 'center',
    fontSize: 20,
  },
});
