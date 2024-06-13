import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../src/App';

type SplashScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SplashScreen'>;

const SplashScreen: React.FC = () => {
    const navigation = useNavigation<SplashScreenNavigationProp>();

    useEffect(() => {
        setTimeout(() => {
          navigation.navigate('Router');
        }, 3000);
      }, [navigation]);
      
  return (
   
        <View style={styles.container} >
            <View style={[styles.logoContainer, styles.elevatedLogo]}>
            <Image source={require('../Assets/bolt-logo.png')}
                    style={styles.cardImage} >
                </Image>
                <Text style={[styles.title, styles.elevatedText]}>Electralysis</Text>
                <Text style={styles.subText}>Track and manage your Electricity with ease</Text>
                </View>
                <View style={[styles.footerContainer, styles.elevatedLogo]}>
                    <TouchableOpacity >
                        <Text style={[styles.buttonText, styles.elevatedText]}>Get Started</Text>
                    </TouchableOpacity>
                </View>
        </View>   
  )
}

const styles = StyleSheet.create({
    
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'space-between', 
        backgroundColor: '#E3FEF7' ,
        shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8, 
    },
    logoContainer:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        marginTop: 60
    },


    title:{
        fontSize: 42,
        fontWeight: 'bold',
        color:'#135D66',
        fontFamily:'Roboto'
    },
    elevatedText: {
        textShadowColor: 'rgba(0, 0, 0, 0.35)',
        textShadowOffset: { width: 1, height: 4 },
        textShadowRadius: 8,
      },

    subText:{
        color: '#135D66',
        fontSize:16,
        paddingTop: 30,
        fontWeight:'600'
    },

    cardImage:{
        height:120,
        resizeMode: 'contain',
       
    },
    elevatedLogo:{
        shadowColor: 'black',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.35,
        shadowRadius: 8,
        elevation: 4,
      },
   footerContainer:{
    marginBottom:100,
    backgroundColor: '#77B0AA',
    height: 65,
    width: 230,
    borderRadius: 28
   },

   buttonText:{
    fontSize:24,
    fontWeight: 'bold',
    paddingTop: 15,
    textAlign: 'center',
    color:'#003C43'
   }
    
})

export default SplashScreen;