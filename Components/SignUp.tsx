import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import CheckBox from '@react-native-community/checkbox';
import React , {useState} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'

export default function SignUp() {
    const [isSelected, setSelection] = useState(false);
  return (

<View style={styles.container}>
    <View style={styles.topTextContainer}>
      <Text style={styles.topText}>Sign Up</Text>
    </View>
    <View style={styles.subTextContainer}>
        <Text style={styles.subText}>Welcome to Electralysis</Text>
    </View>
    <View style={styles.inputContainer}>
        <Icon style={styles.icon} name="user"></Icon>
        <TextInput placeholder='Full Name' placeholderTextColor={'#a9a9a9'} style={styles.inputBox}/>
    </View>
    <View style={styles.inputContainer}>
        <Icon style={styles.icon} name="lock"></Icon>
        <TextInput placeholder='Password' placeholderTextColor={'#a9a9a9'} style={styles.inputBox}/>
    </View>
    <View style={styles.inputContainer}>
        <Icon style={styles.icon} name="lock"></Icon>
        <TextInput placeholder='Confirm Password' placeholderTextColor={'#a9a9a9'} style={styles.inputBox}/>
    </View>
    <View style={styles.inputContainer}>
        <Icon style={styles.icon} name="lock"></Icon>
        <TextInput placeholder='Email/Mobile No.' placeholderTextColor={'#a9a9a9'} style={styles.inputBox}/>
    </View>
    <View style={styles.checkBoxContainer}>
    <CheckBox
    value={isSelected}
    onValueChange={setSelection}
    style={styles.checkBox}
    disabled={false}
    tintColors={{ true: '#003C43', false: '#003C43' }}
    />
    <View style={styles.termsContainer}>
        <Text style={styles.preTermsText}>I agree to</Text>
        <TouchableOpacity >
             <Text style={[styles.termsText, styles.elevatedText]}>Terms & Conditions</Text>
        </TouchableOpacity>
    </View>
    </View>
    <View style={[styles.footerContainer, styles.elevatedLogo]}>
        <TouchableOpacity >
             <Text style={[styles.buttonText, styles.elevatedText]}>Sign Up</Text>
        </TouchableOpacity>
    </View>
   
    <View style={styles.noAccountContainer}>
        <Text style={styles.noAccountText}>Already have an account?</Text>
        <TouchableOpacity >
             <Text style={[styles.signInText, styles.elevatedText]}>Sign In</Text>
        </TouchableOpacity>
    </View>
</View>
  )
}

const styles = StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:"#E3FEF7"
    },
    topTextContainer:{
        height: 75,
        marginTop: 70
    },
    topText:{
        color:'#135D66',
        textAlign:'center',
        fontWeight:'600',
        fontSize: 48
       
    },
    subTextContainer:{
        height:30,
    },
    subText:{
        textAlign:'center',
        color:'#135D66',
        fontSize: 16,
        fontWeight:'600'
    },
    inputContainer:{
        height:60,
        width:320,
        marginLeft:40,
        marginVertical: 10,
        backgroundColor:'#ffff',
        borderRadius:25,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 8, 
        flexDirection:'row'
    },
    inputBox:{
       marginLeft:6,
       marginTop:1,
       fontSize: 16,
    
    },
    icon:{
        fontSize: 24,
        color:'#135D66',
        marginLeft:30,
        marginTop: 18
    },

    buttonText:{
        fontSize:24,
        fontWeight: '500',
        textAlign: 'center',
        paddingTop: 14,
        color:'#003C43'
       },
       elevatedText: {
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: { width: 1, height: 3 },
        textShadowRadius: 10,
      },
    elevatedLogo:{
        shadowColor: 'black',
        shadowOffset: {
          width: 3,
          height: 6,
        },
        shadowOpacity: 0.85,
        shadowRadius: 6,
        elevation: 8,
      },
      footerContainer:{
        marginBottom:54,
        backgroundColor: '#77B0AA',
        height: 65,
        width: 230,
        borderRadius: 28,
        marginTop: 30,
        marginLeft: 80
       },
       checkBoxContainer:{
        flexDirection:'row',
        marginLeft: 65,
        alignItems:'center'
       },
       checkBox:{
        alignSelf:'auto'
       },
       checkBoxText:{
        textAlign: 'center',
        color: '#135D66',
        fontSize: 14,
        fontWeight:'600',
       },
       termsContainer:{
        flexDirection:'row',
        marginLeft: 4,
        alignItems:'center'
       },
        preTermsText:{
        color: '#135D66',
        fontSize: 16,
        fontWeight:'600'
    },
        termsText:{
            textAlign: 'center',
            color: '#003C43',
            fontSize: 16,
            fontWeight:'600',
            marginLeft:3
        },
        noAccountContainer:{
        flexDirection:'row',
        alignSelf:'center',
        borderTopWidth:1,
        borderTopColor:'grey',
        paddingTop: 20,
        marginTop: 20,
        width:300,
       
       },
       noAccountText:{
        textAlign: 'center',
        color: '#135D66',
        fontSize: 16,
        fontWeight:'800',
        paddingLeft:25,
        paddingTop:2

       },
       signInText:{
        textAlign: 'center',
        paddingLeft:4,
        color: '#003C43',
        fontSize: 18,
        fontWeight:'700',
        
       },


})