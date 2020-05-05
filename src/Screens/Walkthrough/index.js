import React, { Component } from "react";
import { Platform, StyleSheet, StatusBar, Text, View, Image, Dimensions } from "react-native";
import  Splashscreen   from 'react-native-splash-screen';
import BackgroundCarousel from './BackgroundCarousel';
const images = [
    // "https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    // "https://images.unsplash.com/photo-1485550409059-9afb054cada4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=701&q=80",
    // "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
    // "https://images.unsplash.com/photo-1429087969512-1e85aab2683d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
    // "https://images.unsplash.com/photo-1505678261036-a3fcc5e884ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
    // //wt1,wt2,wt3,wt4
    {slidingimage: require('../../Assets/Images/Walktrhough-1.png'),type:'walkthrough',slowgun: 'Improve Parental Engagement'},
    {slidingimage: require('../../Assets/Images/Walktrhough-2.png'),type:'walkthrough',slowgun: 'Improve School Brand Image'},
    {slidingimage: require('../../Assets/Images/Walktrhough-3.png'),type:'walkthrough',slowgun: 'Get Instance Notifications From Institute'},
    {slidingimage: require('../../Assets/Images/Walktrhough-4.png'),type:'walkthrough',slowgun: 'Stay Informed About Your Kid Grades And Attendance'},
];

export default class Carousel extends Component {

    componentDidMount(){
       Splashscreen.hide();
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="blue" barStyle="light-content" />
                <BackgroundCarousel images={images} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF"
    },
});