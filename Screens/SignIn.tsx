import { StyleSheet, Text, TextInput, View, TouchableOpacity, Dimensions, Alert } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import React, { useContext, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {signInUser} from '../Apis/SignInApi'; 


//Navigation
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import {AuthStackParamList} from '../src/types/navigation';
import { RouteProp } from '@react-navigation/native';

//appwrite Session
import { Context } from '../src/appwrite/Context';
import Snackbar from 'react-native-snackbar';

type LoginScreenProps = NativeStackScreenProps<AuthStackParamList, 'SignIn'>;

const { width, height } = Dimensions.get('window');

const SignIn: React.FC<LoginScreenProps> = ({ navigation }) => {
    const [isSelected, setSelection] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState<string>('');
    const {appwrite, setIsLoggedIn} = useContext(Context);


    const handleSignIn = async () => {
        if (email.length <1 || password.length <1){
            setError('All firleds are required')
        } else {
        const userData = {
          email:email, 
          password: password,
        };
        const user = {
            email,
            password,
        }
        appwrite
        .login(user)
        .then(
            (response) => {
                if (response){
                    setIsLoggedIn(true);
                    Snackbar.show({
                        text: 'Logged in',
                        duration: Snackbar.LENGTH_SHORT
                    })
                }
            }
        )
        .catch(e=> {
            console.log(e)
            setError('Incoorect email or password')
        })

        try {
            const response = await signInUser(userData);
            console.log('Sign in successful:', response);
            Alert.alert('Sign In Successful')
  
          } catch (error) {
              console.error('Error signing in');
              Alert.alert(`Sign in failed:`);
            }
        };
    }
      
        

    return (
        <View style={styles.container}>
            <View style={styles.topTextContainer}>
                <Text style={styles.topText}>Sign In</Text>
            </View>
            <View style={styles.subTextContainer}>
                <Text style={styles.subText}>Login to Existing account</Text>
            </View>
            <View style={styles.inputContainer}>
                <Icon style={styles.icon} name="user" />
                <TextInput
                    placeholder='Email.'
                    placeholderTextColor={'#a9a9a9'}
                    style={styles.inputBox}
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Icon style={styles.icon} name="lock" />
                <TextInput
                    placeholder='Password'
                    placeholderTextColor={'#a9a9a9'}
                    style={styles.inputBox}
                    value={password}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry
                />
            </View>
            <View>
                <Text style={styles.forgotPasswordText}>Forgot Your Password?</Text>
            </View>
            <View style={[styles.footerContainer, styles.elevatedLogo]}>
                <TouchableOpacity onPress={handleSignIn}>
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
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                    <Text style={[styles.signUpText, styles.elevatedText]}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E3FEF7",
        padding: width * 0.05,
    },
    topTextContainer: {
        height: height * 0.2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    topText: {
        color: '#135D66',
        fontWeight: '600',
        fontSize: width * 0.12,
    },
    subTextContainer: {
        height: height * 0.08,
        justifyContent: 'center',
        alignItems: 'center',
    },
    subText: {
        color: '#135D66',
        fontSize: width * 0.04,
        fontWeight: '600',
    },
    inputContainer: {
        height: height * 0.08,
        width: '100%',
        marginVertical: height * 0.02,
        backgroundColor: '#ffff',
        borderRadius: 25,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 8,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: width * 0.05,
    },
    inputBox: {
        marginLeft: width * 0.02,
        fontSize: width * 0.04,
        flex: 1,
    },
    icon: {
        fontSize: width * 0.06,
        color: '#135D66',
    },
    forgotPasswordText: {
        textAlign: 'right',
        color: '#135D66',
        fontSize: width * 0.035,
        fontWeight: '600',
        paddingRight: width * 0.05,
        paddingTop: height * 0.01,
    },
    buttonText: {
        fontSize: width * 0.06,
        fontWeight: '500',
        textAlign: 'center',
        color: '#003C43',
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
            height: 6,
        },
        shadowOpacity: 0.85,
        shadowRadius: 6,
        elevation: 8,
    },
    footerContainer: {
        backgroundColor: '#77B0AA',
        height: height * 0.08,
        width: width * 0.6,
        borderRadius: 28,
        marginTop: height * 0.08,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    checkBoxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: height * 0.03,
    },
    checkBox: {
        alignSelf: 'center',
    },
    checkBoxText: {
        textAlign: 'center',
        color: '#135D66',
        fontSize: width * 0.035,
        fontWeight: '600',
    },
    noAccountContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginVertical: height * 0.05,
        paddingVertical: height * 0.02,
        borderTopWidth: 1,
        borderTopColor: 'grey',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    noAccountText: {
        color: '#135D66',
        fontSize: width * 0.04,
        fontWeight: '600',
    },
    signUpText: {
        color: '#003C43',
        fontSize: width * 0.045,
        fontWeight: '700',
        marginLeft: width * 0.02,
    },
});

export default SignIn;
