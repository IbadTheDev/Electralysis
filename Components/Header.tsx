import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
const { width, height } = Dimensions.get('window');
const Header = () => {
  return (
    <>
      <View style={styles.headContainer}>
                <View style={styles.titleContainer}>
                    <Text style={[styles.headText, styles.elevatedText]}>Electralysis</Text>
                </View>
                <View style={styles.profileContainer}>
                    <TouchableOpacity>
                    <Icon name="bell" style={[styles.iconBell, styles.elevatedText]} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                    <Image source={require('../Assets/ibad.png')} style={[styles.profileImage, styles.elevatedLogo]} />
                    </TouchableOpacity>
                </View>
            </View>
    </>
  )
}

export default Header

const styles = StyleSheet.create({
    headContainer: {
        flexDirection: "row",
        marginTop: height*0.03,
        borderBottomWidth:0.2,
        borderColor:'lightgrey',
        paddingBottom:height*0.02,
        marginHorizontal:width*0.03
        
    },
    titleContainer: {
        width: '50%',
        paddingLeft: 20
    },
    headText: {
        color: '#135D66',
        textAlign: 'left',
        fontWeight: '600',
        fontSize: 20,
    },
    profileContainer: {
        flexDirection: "row",
        width: '50%',
        alignContent: 'space-evenly',
        justifyContent: 'flex-end',
        paddingRight: width*0.03
    },
    iconBell: {
        color: '#135D66',
        fontWeight: '600',
        fontSize: height*0.03,
        paddingRight: width*0.04
    },
    profileImage: {
        height: height*0.04,
        width: width*0.08,
        borderRadius: 22
    },
    elevatedText: {
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: { width: 1, height: 2 },
        textShadowRadius: 10,
    },
    elevatedLogo: {
        shadowColor: 'black',
        shadowOffset: {
            width: 30,
            height: 20,
        },
        shadowOpacity: 0.8,
        shadowRadius: 15,
        elevation: 20,
    },
})