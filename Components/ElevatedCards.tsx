import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function ElevatedCards() {
  return (
    <View>
      
      <Text style={styles.headText}>ElevatedCards</Text>
    <ScrollView horizontal={true} style={styles.container}>
        <View style={[styles.card, styles.cardElevated]}>
            <Text>Tap One</Text>
        </View>
        <View style={[styles.card, styles.cardElevated]}>
            <Text>Tap Two</Text>
        </View>
        <View style={[styles.card, styles.cardElevated]}>
            <Text>Tap Three</Text>
        </View>
        <View style={[styles.card, styles.cardElevated]}>
            <Text>Tap Four</Text>
        </View>
    </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({

    headText:{
        fontSize:24,
        fontWeight: 'bold',
        paddingHorizontal: 10
    
      },
      card:{
        width:200,
        height:100,
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        margin:8
        },
      cardElevated:{
        backgroundColor:'grey',
        elevation:5,
        shadowOffset: {
            width:1,
            height:1
        },
        shadowColor: 'white',
        shadowOpacity: 0.3,
        shadowRadius: 2
      },
      container:{
        padding:8
      }
})