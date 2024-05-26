import { StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'



function StateChange(): JSX.Element {

 const [inputValue, setinputValue] = useState('')
  const [color, setColor] = useState('#ffffff')


  const changeColor = (color: string) => {
    setColor(color)
  }

  const handleInputChange = (inputValue: string) => {
    setinputValue(inputValue)
  }

  const handleSubmit =() => {
    changeColor(inputValue)
  }

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <View >
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.text}>{inputValue}</Text>
        </TouchableOpacity>
        
      </View>

      <View>
        <TextInput 
        value={inputValue}
        onChangeText={handleInputChange}
        placeholder='enter a color'
        style={styles.input}/>

      
      </View>

    </View>
  )
}

export default StateChange

const styles = StyleSheet.create({

    container:{
        flex:1,
        alignItems:'center',
        flexDirection:'column',
    },
    button:{
        borderRadius:10,
        alignContent:'center',
        borderWidth:2,
        height: 60,
        width: 100,
        margin:10
    },
    text:{
      color: 'black',
      fontSize:22,
      textAlign:'center',
      
    },
    input:{
      borderRadius:10,
      alignContent:'center',
      borderWidth:2,
      height: 60,
      width: 200,
      margin:10,
      fontSize:22,

    },


})