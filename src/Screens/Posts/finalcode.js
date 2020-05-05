import React, { Component } from 'react';
import { TextInput, View, Modal, StyleSheet, Dimensions, TouchableOpacity, Text, FlatList, ActivityIndicator } from 'react-native';
import { Container, Card, CardItem, Content, ListItem, Header, Left, Body, Right, Title, Button, Icon, Fab } from 'native-base';
import Splashscreen from 'react-native-splash-screen';
import Feather from 'react-native-vector-icons/Feather';
const { height, width } = Dimensions.get('window');
const arraySort = require('array-sort');
const deviceWidth = width;
const deviceHeight = height;

export default class HeaderTitleExample extends Component {
    constructor() {
        super();
        Splashscreen.hide();
        this.state = {
            isModalVisible: false,
            postsData: [],
            page: 0,
            isLoading: false,
            showcheckmark: false,
            RadioSelectId: "",
            searchtxt:""
        }
        // this.page = 1;
    }
    componentDidMount() {
        // setInterval(()=>{
        //     this.setState({ isLoading: true }, this.getDataByPage);
        // },10000)
        this.setState({ isLoading: true }, this.getDataByPage)
        //;
    }
    getDataByPage = async () => {
        //https://hn.algolia.com/api/v1/search_by_date?tags=story&page=1 responsejson.hits[0].title
        //https://jsonplaceholder.typicode.com/photos?_limit=10&_page=
        const url = 'https://hn.algolia.com/api/v1/search_by_date?tags=story&page=' + this.state.page;
        fetch(url).then((response) => response.json())
            .then((responsejson) => {
                // alert("data"+responsejson)
                this.setState({ postsData: [...this.state.postsData, ...responsejson.hits], isLoading: false })
            })
    }
    settext(value) {

        this.setState({ RadioSelectId: value, showcheckmark: true });

    }
    listFooter = () => {

        return (
            this.state.isLoading ? <View style={styles.loader}>
                <ActivityIndicator size='large' />
            </View> : null
        )
    }
    listRefresh = () => {
        this.setState({isLoading:true});
        setTimeout(()=>{
           this.setState({isLoading:false});
        },1000).bind(this);
       
    }
    renderRow = ({ item }) => {
        return (
            <View>
                {/* <Image style={styles.itemImage}
                    source={{ uri: item.url }} />
                <Text style={styles.itemText}>{item.id}</Text> */}
                {/* <TouchableOpacity style={{
           borderRadius:6,
           shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.30,
shadowRadius: 1.65,

elevation: 4}}>

           
              <Text>Title:{item.title}</Text>
                <Text>URL:{item.url}</Text>
                <Text>Created At:{item.created_at}</Text>
                <Text>Author: {item.author}</Text>
             
    
     
            
                
             
           </TouchableOpacity> */}


                <View style={styles.card}>
                    <View style={styles.cardContent}>
                        {/* <View style={{flexDirection:'row'}}>
           <Text style={{color:'#343434'}}></Text>
           <Text>{item.title}</Text>
           </View>
           <View  style={{flexDirection:'row'}}>
           <Text style={{color:'#343434',marginVertical:4}}> URL: </Text >
           <Text >{item.url}</Text>

               </View>
               <View  style={{flexDirection:'row'}}>
               <Text style={{color:'#343434',marginBottom:4}}>Created At: </Text>
               <Text>{item.created_at}</Text>
               </View>
               <View  style={{flexDirection:'row'}}>
               <Text style={{color:'#343434'}}>Author: </Text>
               <Text>{item.author}</Text>
               </View> */}
                        <Text style={{ fontSize: 16, color: '#4A4A4A' }}>Title: <Text style={{ fontSize: 16, color: '#060606', fontWeight: 'bold' }}>{item.title}</Text></Text>
                        <Text style={{ fontSize: 16, color: '#4A4A4A', marginVertical: 4 }}> URL: <Text style={{ fontSize: 16, color: '#060606', fontWeight: 'bold' }}>{item.url}</Text></Text>
                        <Text style={{ fontSize: 16, color: '#4A4A4A', marginBottom: 4 }}>Created At: <Text style={{ fontSize: 16, color: '#060606', fontWeight: 'bold' }}>{item.created_at}</Text></Text>
                        <Text style={{ fontSize: 16, color: '#4A4A4A' }}>Author: <Text style={{ fontSize: 16, color: '#060606', fontWeight: 'bold' }}>{item.author}</Text></Text>
                    </View>
                </View>

                {/* <ListItem
                    button
                    style={{ height: 90 }}
                    onPress={() => this.settext(item.title)}
                >
                    <Body>
                        <Text style={{ color: "#000" }}>
                            {item.title}
                        </Text>
                        <Text style={{ color: "#777" }}>
                            {item.url}
                        </Text>
                    </Body>
                    <Right>
                       
                    </Right>
                </ListItem> */}
            </View>
        )
    }
    handleMore = async () => {
        //  this.page = this.page + 1;
        if (this.state.page <= 7) {
            this.setState({ isLoading: true, page: this.state.page + 1 }, this.getDataByPage);
        } else {
            this.setState({
                isLoading: false
            });
        }
    }


compare= (a,b)=>{
    a=a.toLowerCase();
    b=b.toLowerCase();
  // return a.title.length-b.title.length
return a.title.localeCompare(b.title)
}
    searchPosts(posts,text){
    //alert(text)
//     let tempPosts=[];
//     if(text.length>=3){  
//         this.state.postsData=[];
//         for(let i=0;i<posts.length;i++){
//             //if(posts[i].author.toLowerCase().search(text)>=0){
//                 let str = posts[i].author.toLowerCase();
//                 if(posts[i].author.toLowerCase()===text.toLowerCase()||str.search(text.toLowerCase())>=0){
//                 alert(posts[i]);
//                 tempPosts.push(posts[i]); 
//                 this.setState({postsData:[...tempPosts]});
//             }
//         }
        

// }

//sort
this.state.postsData.sort(this.compare);
this.setState({postsData:[...this.state.postsData]})
    
    }

    handleSearch = (text)=> {
        this.setState({searchtxt:text});
    }
    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };

    render() {
        return (
            <Container>
                <Header style={{ backgroundColor: '#fff' }}>
                    <Left><Title style={{ color: '#000' }}>Posts</Title></Left>
                    <Body>
                    </Body>
                    <Right>
                    </Right>
                </Header>
                <Modal animationType={"fade"} transparent={true} visible={this.state.isModalVisible} 
                onRequestClose={() => { console.log("Modal has been closed.") }}>           
                 {/*All views of Modal*/}                
                 <View style={styles.modal}>                
                 <Text style={styles.text}>Modal is open!</Text>                
                 <Button onPress={() => { this.setState({ isModalVisible: !this.state.isModalVisible }) }} >
                 <Text>Click To Close Modal</Text></Button>            
                 </View>         
                  </Modal>
                <View style={{
                    position: 'absolute', flex: 1, top: deviceHeight / 12, height: deviceHeight / 5.5,
                    width: deviceWidth
                }}>
                    <View style={{ flex: 3, marginHorizontal: 10, flexDirection: "row", alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ flex: 3 }}>
                            <TextInput
                                style={styles.textInput}
                                underlineColorAndroid={'transparent'}
                                editable
                                returnKeyType='search'
                                blurOnSubmit={false}
                                placeholder={'Search by Url or Author'}
                                placeholderTextColor={"#777777"}
                                onChangeText={(text)=>this.setState({searchtxt:text})}
                                selectionColor={"#777777"}
                            />
                        </View>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            {/* <Button primary onPress={()=>this.searchPosts(this.state.postsData,this.state.searchtxt)}><Text style={{ color: '#fff' }}> SEARCH </Text></Button> */}
                            <TouchableOpacity style={styles.buttonStyle}
			onPress={() => this.searchPosts(this.state.postsData,this.state.searchtxt)}
		  >
			 <Text style={styles.textStyle}>SEARCH</Text>
		  </TouchableOpacity>
                        </View>

                    </View>
                    <View style={{ flex: 1 }} />
                    <View style={{ flex: 0.1, top: 3, height: 5, bottom: 3, alignItems: 'center', justifyContent: 'center' }}>
                        <Button primary onPress={()=>{
                            this.setState({page:0,postsData:""},this.getDataByPage)
                        }} ><Text style={{ color: '#fff' }}> REFERESH </Text></Button>
                    </View>
                    <View style={{ flex: 1 }} />
                </View>
                <View style={{ marginTop: deviceHeight / 5 }}>

                    <FlatList
                        style={styles.listContainer}
                        data={this.state.postsData}
                        // extraData={this.state.RadioSelectId}
                        renderItem={this.renderRow}
                        keyExtractor={(item, index) => index.toString()}
                        onEndReached={this.handleMore.bind(this)}
                        onEndReachedThreshold={0.5}
                    ListFooterComponent={this.listFooter}
                    />
                </View>
                {/* <View style={{ flex: 1 }}>
                        <FlatList
                        style={styles.listContainer}
                        data={this.state.postsData}
                       // extraData={this.state.RadioSelectId}
                        renderItem={this.renderRow}
                        keyExtractor={(item, index) => index.toString()}
                        onEndReached={this.handleMore.bind(this)}
                        onEndReachedThreshold={0.5}
                        ListFooterComponent={this.listFooter}
                    />                    
                    </View> */}

                <Fab
                    //active={this.state.active}
                    //direction="up"
                    containerStyle={{}}
                    style={{ backgroundColor: '#5067FF' }}
                    position="bottomRight"
                    onPress={() => this.setState({ isModalVisible: !this.state.isModalVisible })}>
                    <Feather name="filter" />
                </Fab>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 23
    },
    listContainer: {
        //  backgroundColor:'#fff',
        padding: 3
    },
    loader: {
        marginTop: 10,
        alignItems: 'center'
    },
    textInput: {
        paddingHorizontal: 5,
        flex: 0.8,
        borderColor: '#000',
        borderWidth: 0.5,
        borderRadius: 8,
        color: "#000",
        height: 10,
        fontSize: 16,

    },
    textStyle: {
        fontSize:20,
        color: '#ffffff',
        textAlign: 'center'
      },
      
      buttonStyle: {
        padding:10,
        backgroundColor: '#202646',
        borderRadius:5
      },
    card: {
        borderRadius: 8,
        elevation: 3,
        backgroundColor: '#fff',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 4,
        marginVertical: 6,
    },
    cardContent: {
        marginHorizontal: 18,
        marginVertical: 20,
    },
    input: {
        margin: 15,
        height: 40,
        borderColor: '#7a42f4',
        borderWidth: 1
    },

    submitButton: {
        backgroundColor: '#7a42f4',
        padding: 10,
        margin: 15,
        height: 40,
    },
    submitButtonText: {
        color: 'white'
    },
    modal: {    justifyContent: 'center',    alignItems: 'center',     
     height: 300 ,    
    width: deviceWidth,
    backgroundColor:'#efefef',  
    bottom:0,   
      marginTop: deviceHeight/2,    
       
       },

})