import React, { Component } from 'react';
import {View,SafeAreaView,StyleSheet, TextInput,FlatList, Dimensions} from 'react-native';
import { Container, Content,Input,Item, Header,Card,ListItem, Left, Body, Right, Button,Text, Icon, Title, CardItem } from 'native-base';
import Splashscreen from 'react-native-splash-screen';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
export default class Asteroid extends Component {
    constructor(props){
        super(props);
        Splashscreen.hide();
        this.state={
            AsteroidID:"",
            Asteroid_ID_List:[],
            showId:true,
            AsteroidDetails:{},
            isFoused:false,
            IsDisabled:true,
            errorMsg:""
        }
    }
    setAsteroidID(id){
        this.state.AsteroidID=id;
    }
    
    async getAsteroidInfo(){
       await fetch("https://api.nasa.gov/neo/rest/v1/neo/"+this.state.AsteroidID+"?api_key="+"cWdrRBLq0C6fZ9frx2gQvxq32VFpv4dU5a2AzTfu")
        .then(async resp=>{
            if(resp.status===404){
                this.setState({errorMsg:'Server Not Found'})
                return null;
            }else{
                return resp.json()
            }
        }).then(async respJson=>{
            let asteroid_data=[];
            if(this.state.errorMsg===""){
              //  alert(JSON.stringify(respJson))
               this.setState({AsteroidDetails:respJson,Asteroid_ID_List:null, showId:false});
            }
        }).catch(error=>{ this.setState({errorMsg:error.message});})
    }
    async getRandomAsteroidId(){
        await fetch("https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=cWdrRBLq0C6fZ9frx2gQvxq32VFpv4dU5a2AzTfu")
        .then(async resp=>{
            if(resp.status===404){
                this.setState({errorMsg:'Server Not Found'})
                return null;
            }else{
                return resp.json()
            }
        }).then(async respJson=>{
                if(this.state.errorMsg===""){
                alert(respJson.near_earth_objects[0].id)
               this.setState({Asteroid_ID_List:[...respJson.near_earth_objects],showId:true});
            }
        }).catch(error=>{ this.setState({errorMsg:error.message});})
    }
    renderAsteroidInfo(){
        return(
            <View>
                <ListItem>
                    <Text>name : <Text>{this.state.AsteroidDetails.name}</Text></Text>
                </ListItem>
                <ListItem>
                    <Text>nasa_jpl_url : <Text>{this.state.AsteroidDetails.nasa_jpl_url}</Text></Text>
                </ListItem>
                <ListItem>
                    <Text>is_potentially_hazardous_asteroid : <Text>{this.state.AsteroidDetails.is_potentially_hazardous_asteroid}</Text></Text>
                </ListItem>     
            </View> 
         )
    }
   renderAsteroidId(){
       return(
          <View style={{flex:1}}>
              <FlatList
               data={this.state.Asteroid_ID_List}
               renderItem={({item})=>
                <View>
                    <ListItem>
                    <Text>{item.id}</Text>
                </ListItem> 
                </View> 
                
               }
               keyExtractor={(item, index) => index.toString()}
              />
          </View>
       )
   }
   renderItem=({item})=>{
    return(
        <View>
            <ListItem>
    <Text style={{textAlign:'center'}}>{item.id}</Text>
</ListItem> 
            </View>
    )
   }

   
  render() {
    return (
        <View style={{flex:1,marginHorizontal:5}}>
            <Card style={{flex:1}}>
                <CardItem>
                    <Item>
                    <Input placeholder="Enter Asteroid_ID"  
                onChangeText={(id)=>this.setAsteroidID(id)}/>
                        </Item>

                    </CardItem>
                    <CardItem>
                        <Button block style={[styles.buttonStyle]}
                        onPress={()=>this.getAsteroidInfo()}><Text>Submit</Text></Button>
                    </CardItem>
                    <CardItem>
                        <Button block style={[styles.buttonStyle]}
                        onPress={()=>this.getRandomAsteroidId()}><Text>Random Asteroid</Text></Button>
                    </CardItem>
            </Card>
            <Card style={{flex:1.5}}>
                {
                    !this.state.showId && this.renderAsteroidInfo()
                }

              {
                  this.state.showId && <View>         
                  <FlatList
                      style={styles.listContainer}
                      data={this.state.Asteroid_ID_List}
                      // extraData={this.state.RadioSelectId}
                      renderItem={this.renderItem}
                      keyExtractor={(item, index) => index.toString()}
                      //onEndReached={this.handleMore.bind(this)}
                     // onEndReachedThreshold={0.5}
                      //onRefresh={this.lazyLoad}
                     // refreshing={this.state.isLoading}
                  // ListFooterComponent={this.listFooter}
                  />
              </View>
              }

            </Card>
            
        </View>
    );
  }
}

const styles = StyleSheet.create({  
    buttonStyle:{
        flex:1,
        marginVertical:5,
        backgroundColor:'#0000ff'
    },
    listContainer: {
        padding: 3
    },
})
