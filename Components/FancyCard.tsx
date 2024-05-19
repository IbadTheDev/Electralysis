import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function FancyCard() {
  return (
    <View>
      <Text style={styles.headText}>Trending</Text>
      <View style={[styles.card, styles.cardElevated]}>
        <Image source={{
            uri: 'https://img.freepik.com/premium-vector/lightning-bolt-icon-design-flat-vector-illustration_1058532-19709.jpg?w=740'
        }}
        style={styles.cardImage}
        />
        <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>Electralysis</Text>
            <Text style={styles.cardLabel}>Electralysis originated in 2023</Text>
            <Text style={styles.cardDesc}>something about the startup</Text>
            <Text style={styles.cardFoot}>coming soon</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    headText:{
        fontSize:24,
        fontWeight: 'bold',
        padding: 8
    },
    card:{
        height: 350,
        width: 360,
        borderRadius: 6,
        marginVertical: 10,
        marginHorizontal: 15,
        borderTopLeftRadius:20,
        borderTopRightRadius: 20
    },
    cardElevated:{
        backgroundColor:'white',
        elevation: 3,
        shadowOffset:{
            width: 1,
            height: 1
        }

    },
    cardImage:{
        height: 200,
        borderTopLeftRadius:20,
        borderTopRightRadius: 20,
        marginBottom:8
    },
    cardBody:{
        flex: 1,
        flexGrow: 1,
        paddingHorizontal: 8
    },
    cardTitle:{ 
        color: 'black',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 2

    },
    cardLabel:{ color: 'black'},
    cardDesc:{ color: 'black'},
    cardFoot:{
         color: 'black',
         fontSize: 18,
         padding: 10,
         flex: 1,
         textAlign: 'center'
        
         


    }
})