import { Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';

const { width, height } = Dimensions.get('window');

const AddDevice = () => {
  return (
    <View style={styles.container}>
        <View style={styles.titleContainer}>
            <Text style={styles.title}>Manage Device</Text>
        </View>
            <TouchableOpacity style={[styles.buttonContainer, styles.elevatedLogo]}>
                <Text style={[styles.buttonText, styles.elevatedText]}>Add Device</Text>
                <Icon style={styles.icon} name="plus" />
            </TouchableOpacity>
        <View style={styles.subTitleContainer}>
                <Text style={styles.subTitle}>Please move closer to your device</Text>
        </View>
        <Image source={require('../Assets/connectDevice-shadow.png')}
         style={styles.cardImage}
         />

    </View>
  )
}

export default AddDevice

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#E3FEF7",
        padding: width * 0.05,
    },
    titleContainer:{
        height: height * 0.3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title:{
        color: '#135D66',
        fontWeight: '600',
        fontSize: width * 0.12,
    },
    buttonContainer:{
        backgroundColor: 'rgba(119, 176, 170, 0.9)',
        height: height * 0.08,
        width: width * 0.85,
        flexDirection:'row',
        borderRadius: 28,
        alignSelf:'center',
        padding:'4%',
        paddingHorizontal:'6%',
        opacity:0.8
    },
    buttonText:{
        fontSize: width * 0.052,
        fontWeight: '500',
        textAlign:'left',
        color: '#003C43',

    },
    icon:{
        fontSize: width * 0.045,
        color: '#003C43',
        alignSelf:'center',
        marginLeft:width*0.45,   
    },
    subTitleContainer:{
        height: height * 0.14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    subTitle:{
        color: '#135D66',
        fontSize: width * 0.054,
        fontWeight: '600',
    },
    cardImage:{
        height:height*0.34,
        width:width*0.96,
        alignSelf:'center',
        marginRight:width*0.06,
        opacity:0.96


        
       
    },


    elevatedText: {
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: { width: 1, height: 3 },
        textShadowRadius: 10,
    },
    elevatedLogo: {
        shadowColor: 'black',
        shadowOffset: {
            width: 3,
            height: 8,
        },
        shadowOpacity: 0.85,
        shadowRadius: 6,
        elevation: 10,
    },
})