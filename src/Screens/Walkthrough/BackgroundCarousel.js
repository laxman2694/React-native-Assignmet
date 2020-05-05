import * as React from 'react';
import {Text, StyleSheet, View, ScrollView, Dimensions, Image } from 'react-native';

const DEVICE_WIDTH = Dimensions.get("window").width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
export default class BackgroundCarousel extends React.Component {
    scrollRef = React.createRef();
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 0,
            slowguntxt:""
        }
    }

    componentDidMount = () => {
        setInterval(() => {
            this.setState(prev => ({ selectedIndex: prev.selectedIndex === this.props.images.length - 1 ? 0 : prev.selectedIndex + 1 }),
                () => {
                    this.scrollRef.current.scrollTo({
                        animated: true,
                        y: 0,
                        x: DEVICE_WIDTH * this.state.selectedIndex
                    })
                })
        }, 3000)
    }
    setSelectedIndex = event => {
        //width of the view szie
        const viewSize = event.nativeEvent.layoutMeasurement.width;
        //get current position of the view
        const contentOffset = event.nativeEvent.contentOffset.x;

        const selectedIndex = Math.floor(contentOffset / viewSize);
        this.setState({ selectedIndex });
    }

    render() {
        const { images } = this.props;
        const { selectedIndex } = this.state;
        return (
            <View style={{ height: '100%', width: '100%' }}>
                <ScrollView horizontal pagingEnabled onMomentumScrollEnd={this.setSelectedIndex} ref={this.scrollRef}>
                    {
                        images.map(image => (
                            <Image
                                key={image}
                                source={ image.slidingimage }
                                style={styles.backgroundImage}
                            />
                        ))
                    }
                </ScrollView>
                <View style={styles.bottomContainer}>
                        <Image style={styles.topLogo} source={require('../../Assets/Images/Group-21.png')}/>
                    <View style={styles.slowGunTxt}>
                        <Text style={styles.slowGun}>{this.props.images[this.state.selectedIndex].slowgun}</Text>
                    </View>
                    <View style={styles.circleDiv}>
                        {
                            images.map((image, index) => (
                                <View>
                                    <View
                                        key={image}
                                        style={[
                                            styles.whiteCircle,
                                            { opacity: index === selectedIndex ? 1 : 0.5 }
                                        ]}

                                    />
                                </View>
                            ))
                        }
                    </View>
                    <View style={styles.skipView}>
                        <Text style={styles.skipTxt}>Skip</Text>
                    </View>
                    <View style={styles.bottomlineView}>
                        <View style={styles.bottomLine}>

                        </View>
                    </View>
                </View>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        height: '100%',
        width: DEVICE_WIDTH,
        resizeMode: 'cover',
    },
    circleDiv: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 14
    },
    whiteCircle: {
        height: 10,
        width: 10,
        borderRadius: 5,
        margin: 5,
        backgroundColor: '#fff'
    },
    topLogoView:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15
    },
    topLogo:{
    alignSelf: 'center',
    height:130,
    width: 130,
    marginBottom: 150
    },
    slowGun: {
        fontFamily:'Foundation',
        fontSize: 20,
        textAlign: "center",
        color: "#fff",
        padding: 5,
    },
    slowGunTxt:{
    height: 10,
     padding: 5,
     marginBottom: 185,
    },
    skipTxt: {
        fontFamily:'Foundation',
        fontSize: 14,
        textAlign: "center",
        color: "#fff",
        marginBottom:5,
        padding: 5,
    },
    skipView:{
     padding: 5,
    },
    bottomlineView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomLine: {
        width: 130,
        height: 4,
        backgroundColor: '#fff',
        borderRadius: 4,
    },
    bottomContainer: {
        position: 'absolute',
        width: '100%',
        top: 50,
    }
});