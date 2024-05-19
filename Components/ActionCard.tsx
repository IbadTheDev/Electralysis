import { Image, Linking, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

export default function ActionCard() {
    function openWebsite(websiteLink: string){
        Linking.openURL(websiteLink)
    }
  return (
    <View>
      <Text style={styles.headText}>Hyper CardText</Text>
      <View style={[styles.card, styles.elevatedCard]}>
        <View style={styles.headContainer}>
        <Text style={styles.headerText}>
            Learn more about Electralysis
        </Text>
        </View>
        <Image source={{
            uri:'https://img.freepik.com/premium-vector/lightning-bolt-icon-design-flat-vector-illustration_1058532-19709.jpg?w=740'

         }}
         style={styles.cardImage}
         />
         <View style={styles.bodyContainer}>
            <Text numberOfLines={3}>
                body container hereeeeeeeeeeeeeeee
            </Text>
         </View>
         <View style={styles.footerContainer}>
            <TouchableOpacity
            onPress={()=> {openWebsite('https://reactnative.dev')}}
            >
                <Text style={styles.socialLinks}>Follow me</Text>
            </TouchableOpacity>
         </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    headText:{
        fontSize: 22,
        fontWeight: 'bold',
        paddingHorizontal: 8
    },
    card:{
        width: 350,
        height: 360,
        borderRadius: 10,
        marginVertical: 12,
        marginHorizontal: 16,
       
        

    },
    elevatedCard:{
        backgroundColor: 'grey',
        elevation: 3,
        shadowOffset:{
            width: 1,
            height: 1
        },
        shadowColor: 'black',
        shadowOpacity: 0.4


    },
    headContainer:{
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerText:{
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold'
    },
    cardImage:{
        height: 200,
        borderTopLeftRadius:20,
        borderTopRightRadius: 20,
        marginBottom:8
    },
    bodyContainer:{
        padding: 10
    },
    footerContainer:{
        padding: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    socialLinks: {
        fontSize:16,
        color: 'black',
        backgroundColor: 'white',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 6
    }
})