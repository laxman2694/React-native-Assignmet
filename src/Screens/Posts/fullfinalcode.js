import React, { Component } from 'react';
import { TextInput, View, AppState, Modal, StyleSheet, Dimensions, TouchableOpacity, Text, FlatList, ActivityIndicator } from 'react-native';
import { Container, Card, CardItem, Content, ListItem, Header, Left, Body, Right, Title, Button, Icon, Fab } from 'native-base';
import Splashscreen from 'react-native-splash-screen';
import Feather from 'react-native-vector-icons/Feather';
const { height, width } = Dimensions.get('window');
const arraySort = require('array-sort');
const deviceWidth = width;
const deviceHeight = height;

export default class HeaderTitleExample extends Component {
    constructor(props) {
        super(props);
        Splashscreen.hide();
        this.state = {
            isModalVisible: false,
            postsData: [],
            page: 0,
            isLoading: false,
            showcheckmark: false,
            RadioSelectId: "",
            searchtxt: "",
            searchlabel: "SEARCH",
            appState: AppState.currentState,
        }
    }
    componentDidMount() {
      //  alert(JSON.stringify(this.props));
        var that = this;
        setInterval(function () {
            that.setState({ isLoading: true, page: that.state.page + 1 }, that.getDataByPage);
        }, 10000);

        AppState.addEventListener('change', this._handleAppStateChange);
        this.setState({ isLoading: true }, this.getDataByPage)
        //;
    }
    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
    }

    _handleAppStateChange = (nextAppState) => {
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
            console.log('App has come to the foreground!')
        }
        this.setState({ appState: nextAppState });
    }
    getDataByPage = async () => {
        //https://hn.algolia.com/api/v1/search_by_date?tags=story&page=1 responsejson.hits[0].title
        //https://jsonplaceholder.typicode.com/photos?_limit=10&_page=
        const url = 'https://hn.algolia.com/api/v1/search_by_date?tags=story&page=' + this.state.page;
        fetch(url).then((response) => response.json())
            .then((responsejson) => {
                this.setState({ postsData: [...this.state.postsData, ...responsejson.hits], isLoading: false })
            })
    }
    settext(value) {

        this.setState({ RadioSelectId: value, showcheckmark: true });

    }
    listRefresh = () => {
        this.setState({ isLoading: true });
        setTimeout(() => {
            this.setState({ isLoading: false });
        }, 1000).bind(this);

    }
    renderRow = ({ item }) => {
        return (
            <View>
                <View style={styles.card}>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('JsonData',{post:item})} style={styles.cardContent}>
                        <Text style={{ fontSize: 16, color: '#4A4A4A' }}>Title: <Text style={{ fontSize: 16, color: '#060606', fontWeight: 'bold' }}>{item.title}</Text></Text>
                        <Text style={{ fontSize: 16, color: '#4A4A4A', marginVertical: 4 }}> URL: <Text style={{ fontSize: 16, color: '#060606', fontWeight: 'bold' }}>{item.url}</Text></Text>
                        <Text style={{ fontSize: 16, color: '#4A4A4A', marginBottom: 4 }}>Created At: <Text style={{ fontSize: 16, color: '#060606', fontWeight: 'bold' }}>{item.created_at}</Text></Text>
                        <Text style={{ fontSize: 16, color: '#4A4A4A' }}>Author: <Text style={{ fontSize: 16, color: '#060606', fontWeight: 'bold' }}>{item.author}</Text></Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    handleMore = async () => {

        if (!this.state.isLoading) {
            this.setState({ isLoading: true, page: this.state.page + 1 }, this.getDataByPage);
        } else {
            this.setState({
                isLoading: false
            });
        }
    }


    compareTitle = (a, b) => {
        a = a.title.toLowerCase();
        b = b.title.toLowerCase();
        return a.localeCompare(b)
    }

    compareDate = (a, b) => {
        return new Date(a.created_at) - new Date(b.created_at);
    }

    handleFilter = (flag) => {
        if (flag === 'title') {
            this.state.postsData.sort(this.compareTitle);
            this.setState({ postsData: [...this.state.postsData], isModalVisible: !this.state.isModalVisible })
        } else if (flag === 'createdat') {
            this.state.postsData.sort(this.compareDate);
            this.setState({ postsData: [...this.state.postsData], isModalVisible: !this.state.isModalVisible })
        } else {
            this.setState({ isLoading: true, isModalVisible: !this.state.isModalVisible }, this.getDataByPage)
        }


    }
    searchPosts(posts, text) {
        let tempPosts = [];
        if (this.state.searchlabel === 'SEARCH') {
            if (text.length >= 3) {
                this.state.postsData = [];
                for (let i = 0; i < posts.length; i++) {
                    let str = posts[i].author.toLowerCase();
                    if (posts[i].author.toLowerCase() === text.toLowerCase() || str.search(text.toLowerCase()) >= 0) {
                        alert(posts[i]);
                        tempPosts.push(posts[i]);
                        let labeltxt = this.state.searchlabel === ''
                        this.setState({ postsData: [...tempPosts], searchlabel: 'CLEAR' });
                    }
                }


            }
        } else {
            this.setState({ searchlabel: 'SEARCH', searchtxt: "" }, this.getDataByPage);
        }

    }

    handleSearch = (text) => {
        this.setState({ searchtxt: text });
    }
    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };

    handleRefresh = () => {
        var that = this;

        that.setState({ isLoading: true, page: 0, postsData: [] }, that.getDataByPage);



    }


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
                    <TouchableOpacity onPress={() => { this.setState({ isModalVisible: !this.state.isModalVisible }) }} style={styles.modal}>
                        <View style={{ flex: 2, height: deviceHeight / 2.2 }}>
                        </View>
                        <View style={{ flex: 1, paddingHorizontal: 10, width: deviceWidth, backgroundColor: '#fff' }}>

                            <Text style={[styles.modaltext, { color: '#9C9C9C' }]}>Select filter to apply</Text>
                            <TouchableOpacity onPress={() => { this.handleFilter('title') }}><Text style={[styles.modaltext]}>Filter by title</Text></TouchableOpacity>
                            <TouchableOpacity onPress={() => { this.handleFilter('createdat') }}><Text style={[styles.modaltext]}>Filter by created at</Text></TouchableOpacity>
                            <TouchableOpacity onPress={() => { this.handleFilter('reset') }}><Text style={[styles.modaltext]}>Reset</Text></TouchableOpacity>

                        </View>
                    </TouchableOpacity>
                </Modal>
                <View style={{
                    position: 'absolute', flex: 1, top: deviceHeight / 12, height: deviceHeight / 5.5,
                    width: deviceWidth
                }}>
                    <View style={{ flex: 3, marginHorizontal: 10, flexDirection: "row", alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ flex: 3.5, height: 60 }}>
                            <TextInput
                                style={styles.textInput}
                                underlineColorAndroid={'transparent'}
                                editable
                                returnKeyType='search'
                                blurOnSubmit={false}
                                placeholder={'Search by Url or Author'}
                                placeholderTextColor={"#777777"}
                                value={this.state.searchtxt}
                                onChangeText={(text) => this.setState({ searchtxt: text })}
                                selectionColor={"#777777"}
                            />
                        </View>
                        <View style={{ flex: 1, height: 50, paddingVertical: 5,marginBottom:7,
                         backgroundColor: '#4D4DFF', alignItems: 'center', 
                         justifyContent: 'center', borderRadius: 8, elevation: 3 }}>

                            <TouchableOpacity style={[styles.buttonStyle]}
                                onPress={() => this.searchPosts(this.state.postsData, this.state.searchtxt)}
                            >
                                <Text style={[styles.textStyle, {marginTop:10}]}>{this.state.searchlabel}</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                    <View style={{ flex: 0.1 }} />
                    <View style={{ flex: 1.6, height: 50, alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity style={[styles.buttonStyle, { height: 40, backgroundColor: '#4D4DFF', padding: 10 }]}
                            onPress={() => this.handleRefresh()}
                        >
                            <Text style={styles.textStyle}>REFRESH</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flex: 0.4 }} />
                </View>
                <View style={{ marginTop: deviceHeight / 5 }}>
                    {
                        this.state.isLoading ? <View style={styles.loader}>
                            <ActivityIndicator size='large' />
                        </View> : null
                    }
                    <FlatList
                        style={styles.listContainer}
                        data={this.state.postsData}
                        // extraData={this.state.RadioSelectId}
                        renderItem={this.renderRow}
                        keyExtractor={(item, index) => index.toString()}
                        onEndReached={this.handleMore.bind(this)}
                        onEndReachedThreshold={0.5}
                    // ListFooterComponent={this.listFooter}
                    />
                </View>
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
        borderWidth: 1,
        borderRadius: 8,
        color: "#000",
        height: 60,
        fontSize: 16,

    },
    textStyle: {
        fontSize: 14,
        color: '#ffffff',
        textAlign: 'center',
       
    },

    buttonStyle: {
        flex: 1,
        height: 40,
       
        borderRadius: 5
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
    modaltext: {
        fontSize: 18,
        color: '#000',
        marginVertical: 5
        // textAlign:'left'
    },
    modal: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center',
        // height: 300 , 
        width: deviceWidth,
        // backgroundColor:'#efefef',  
        bottom: 0,
        //marginTop: deviceHeight/2, 

    },

})