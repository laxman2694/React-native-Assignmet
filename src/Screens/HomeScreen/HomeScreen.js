import React from 'react';
import {Text, View, ActivityIndicator, StyleSheet,TextInput,TouchableOpacity} from 'react-native';
import {Item, Input, Button, Toast, Title,Container,Header,Left,Right,Body} from 'native-base';
import axios from 'axios';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataDetails: null,
      loader: false,
      textInput: '',
      errorMsg:""
    };
  }

  //changes on input
  onchangeInput = text => {
    this.setState({textInput: text});
  };

  showIssue = () => {
    Toast.show({
      text: 'No Records to display',
      position: 'bottom',
    });
  };

  fetchCountryDetails = async data => {
    this.setState({loader: true});
      

      await fetch("https://restcountries.eu/rest/v2/name/"+data)
      .then((resp)=> 
      resp.json())
      .then((response)=> {
        alert(JSON.stringify(response.data))
        if (response.length > 0) {
          // alert(JSON.stringify(response.data))
           this.props.navigation.navigate('Details', {
             details: response.data,
           });
         } else {
          this.setState({textInput: '', loader: false},this.showIssue());
          
         }
      })
      .catch((error)=>{
        alert("error"+error.message);
        this.setState({textInput: '', loader: false});
      });

      // let response = await axios.get(
      //   `https://restcountries.eu/rest/v2/name/${data}`,
      // );



  

    this.setState({textInput: '', loader: false});
  };

  onSubmit = () => {
    this.fetchCountryDetails(this.state.textInput);
  };

  remderOverLayIndicator = () => (
    <View style={styles.loader}>
      <ActivityIndicator color={'blue'} size={80} />
    </View>
  );

  render() {
    return (
    
      <View style={styles.container}>
        <View style={styles.formField}>
         
          <View style={{ height: 60,width:'80%' }}>
                            <TextInput
                                style={styles.textInput}
                                underlineColorAndroid={'transparent'}
                                editable
                                returnKeyType='search'
                                blurOnSubmit={false}
                                placeholder={'Enter country'}
                                placeholderTextColor={"#777777"}
                                value={this.state.textInput}
                                onChangeText={this.onchangeInput}
                                selectionColor={"#777777"}
                            />
                        </View>
                        
          {this.state.textInput.length <= 2 ? (
            <View>
              <Text style={styles.warText}>Enter Minimum 3 Charachters</Text>
            </View>
          ) : null}

          <Button
            onPress={this.onSubmit}
            disabled={this.state.textInput.length <= 2 ? true : false}
            style={styles.buttonStyle}>
            <Text style={styles.buttonText}>SUBMIT</Text>
          </Button>
          
        </View>
        <TouchableOpacity
            onPress={()=>this.props.navigation.navigate('Posts')}
       >
            <Text style={styles.buttonText}>POSTS</Text>
          </TouchableOpacity>
        {this.state.loader ? this.remderOverLayIndicator() : null}
      </View>

    );
  }
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center',    backgroundColor:'#fff'
},
  buttonStyle: {
    width: '60%',
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor:'#3A6ADB'
  },
  textInput: {
    paddingHorizontal: 5,
    flex: 0.8,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 10,
    color: "#000",
    height: 60,
    fontSize: 16,

},
  buttonText: {
    color: '#000',
    fontSize: 18,
    textAlign: 'center',
  },
  warText: {
    color: 'red',
    fontSize: 15,
    marginVertical: 15,
    fontWeight: '700',
  },
  loader: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    elevation: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
    opacity: 0.4,
  },
  formField: {
    height: 300,
    width: '100%',
    borderWidth: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputPlate: {
    backgroundColor: '#fff',
    width: '90%',
    borderColor:'#696969',
    borderWidth:1,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
  },
});
