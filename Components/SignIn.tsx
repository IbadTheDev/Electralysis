import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import CheckBox from '@react-native-community/checkbox';
import React , {useState} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'

export default function SignIn() {
    const [isSelected, setSelection] = useState(false);
  return (

<View style={styles.container}>
    <View style={styles.topTextContainer}>
      <Text style={styles.topText}>Sign In</Text>
    </View>
    <View style={styles.subTextContainer}>
        <Text style={styles.subText}>Login to Existing account</Text>
    </View>
    <View style={styles.inputContainer}>
        <Icon style={styles.icon} name="user"></Icon>
        <TextInput placeholder='Email or Mobile No.' placeholderTextColor={'#a9a9a9'} style={styles.inputBox}/>
    </View>
    <View style={styles.inputContainer}>
        <Icon style={styles.icon} name="lock"></Icon>
        <TextInput placeholder='Password' placeholderTextColor={'#a9a9a9'} style={styles.inputBox}/>
    </View>
    <View>
        <Text style={styles.forgotPasswordText}>Forgot Your Password?</Text>
    </View>
    <View style={[styles.footerContainer, styles.elevatedLogo]}>
        <TouchableOpacity >
             <Text style={[styles.buttonText, styles.elevatedText]}>Sign In</Text>
        </TouchableOpacity>
    </View>
    <View style={styles.checkBoxContainer}>
    <CheckBox
    value={isSelected}
    onValueChange={setSelection}
    style={styles.checkBox}
    disabled={false}
    tintColors={{ true: '#003C43', false: '#003C43' }}
    />
    <Text style={styles.checkBoxText}>Remember Me</Text>
    </View>
    <View style={styles.noAccountContainer}>
        <Text style={styles.noAccountText}>Don't have an account?</Text>
        <TouchableOpacity >
             <Text style={[styles.signUpText, styles.elevatedText]}>Sign Up</Text>
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
        marginTop: 100
    },
    topText:{
        color:'#135D66',
        textAlign:'center',
        fontWeight:'600',
        fontSize: 48
       
    },
    subTextContainer:{
        height:50,
        margin: 4
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
    forgotPasswordText:{
        textAlign: 'right',
        color: '#135D66',
        fontSize: 14,
        fontWeight:'600',
        paddingRight: 30,
        paddingTop:10
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
        marginBottom:100,
        backgroundColor: '#77B0AA',
        height: 65,
        width: 230,
        borderRadius: 28,
        marginTop: 50,
        marginLeft: 80
       },
       checkBoxContainer:{
        flexDirection:'row',
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        marginBottom: 10,
        marginLeft:-30,
        marginTop:-165
        
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
       noAccountContainer:{
        flexDirection:'row',
        alignSelf:'center',
        paddingBottom:50,
        borderTopWidth:1,
        borderTopColor:'grey',
        paddingTop:18,
        width:300,
       
       },
       noAccountText:{
        textAlign: 'center',
        color: '#135D66',
        fontSize: 16,
        fontWeight:'600',
        marginTop:4,
        paddingLeft:30,

       },
       signUpText:{
        textAlign: 'center',
        paddingLeft:6,
        color: '#003C43',
        fontSize: 18,
        fontWeight:'700',
        
       },


})