import React from 'react';
import { StyleSheet, Text, View ,FlatList,ScrollView} from 'react-native';
import {SearchBar,Header} from 'react-native-elements';
import db from '../config'

export default class ReadStoryScreen extends React.Component {
  constructor(){
    super();
    this.state ={
      allStories:[],
      dataSource:[],
      search : ''
    }
  }
  componentDidMount(){
    this.fetchStories()
  }

  updateSearch = search => {
    this.setState({ search: search });
  };


  fetchStories=()=>{
    try {
      var allStories= [];
      var stories = db.collection("Stories").get()
      .then((querySnapshot)=> {
          querySnapshot.forEach((doc)=> {
              allStories.push(doc.data())
          })
          this.setState({allStories: allStories})
        })
    }
    catch (error) {
      console.log(error);
    }
  };


  SearchFilterFunction(text) {
    const newData = this.state.allStories.filter((story)=> {

      const storyData = story.TitleoftheStory ? story.TitleoftheStory.toUpperCase() 
      : ''.toUpperCase();
      const data = story.AuthoroftheStory ? story.AuthoroftheStory.toUpperCase() 
      : ''.toUpperCase();
      const textData = text.toUpperCase();
      return storyData.indexOf(textData) > -1;
    });
    this.setState({
      dataSource: newData,
      search: text,
    });
  }

    render(){
      return(
        <View>
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
          <View styles ={{height:20,width:'100%'}}>
              <SearchBar
                  placeholder="Search for any story title"
                  onChangeText={text => this.SearchFilterFunction(text)}
                  onClear={text => this.SearchFilterFunction('')}
                  value={this.state.search}
                  backgroundColor = "white"
            />
          </View>
          
          <FlatList
                data={this.state.search === "" ?  this.state.allStories: this.state.dataSource}
                removeClippedSubviews={false}
                renderItem={({ item }) => (
                  <View style={styles.itemContainer}>
                    <Text style={styles.title}>  Title: {item.TitleoftheStory}</Text>
                    <Text style={styles.title}>  Author : {item.AuthoroftheStory}</Text>
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
          />

        </View>  
      );      
    }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 25,
  },
  itemContainer: {
    height: 100,
    width:'95%',
    borderWidth: 2,
    borderColor: 'red',
    justifyContent:'center',
    alignSelf: 'center',
    backgroundColor: "#FFE4B5",
    padding:23,
    marginVertical: 10,
    marginHorizontal: 25,
  }
});
