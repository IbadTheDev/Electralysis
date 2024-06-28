import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';
import signUpUser from '../Apis/SignUpApi';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackScreenProps} from '@react-navigation/stack';
import {Context} from '../src/appwrite/Context';
import AddDevice from '../Screens/AddDevice';
import Snackbar from 'react-native-snackbar';
import {AuthStackParamList} from '../src/types/navigation';
import {AppStackParamList} from '../src/routes/AppStack';
import Loading from '../Components/Loading';

type OtpScreenProps = StackScreenProps<AuthStackParamList, 'OtpScreen'>;

export default function OtpScreen({route}: OtpScreenProps) {
  const {verificationId, userData} = route.params;
  const {appwrite, setIsLoggedIn} = useContext(Context);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const et1 = useRef<TextInput>(null);
  const et2 = useRef<TextInput>(null);
  const et3 = useRef<TextInput>(null);
  const et4 = useRef<TextInput>(null);
  const et5 = useRef<TextInput>(null);
  const et6 = useRef<TextInput>(null);

  const [inp1, setInp1] = useState('');
  const [inp2, setInp2] = useState('');
  const [inp3, setInp3] = useState('');
  const [inp4, setInp4] = useState('');
  const [inp5, setInp5] = useState('');
  const [inp6, setInp6] = useState('');

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [timer, setTimer] = useState(5);
  const [error, setError] = useState<string>('');
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const authnavigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const handleVerificationCodeInput = async () => {
    const code = inp1 + inp2 + inp3 + inp4 + inp5 + inp6;
    console.log('Verification code entered:', code);
    setIsLoading(true);

    if (verificationId) {
      console.log('Verification ID exists:', verificationId);
      const credential = auth.PhoneAuthProvider.credential(
        verificationId,
        code,
      );
      console.log('Credential created:', credential);

      auth()
        .signInWithCredential(credential)
        .then(async userCredential => {
          const user = userCredential.user;
          console.log('FireBase: User signed up ', user);

          try {
            const response = await appwrite.createAccount({
              email: userData.email,
              password: userData.password,
              phone: userData.phone,
            });
            if (response) {
              try {
                // Sending data to your backend
                const respone = await signUpUser({
                  email: userData.email,
                  password: userData.password,
                  phone: userData.phone,
                });

                console.log('Backend sign up successful:', respone);
              } catch (error) {
                console.error('Error signing up with backend:', error);
              }
              setIsLoading(false);
              setIsLoggedIn(true);
              console.log('appwrite: Sign up successful:', response);
              Snackbar.show({
                text: 'Sign Up Successful',
                duration: Snackbar.LENGTH_SHORT,
              });
            } else {
              console.error('User account creation failed');
              Snackbar.show({
                text: 'User account creation failed',
                duration: Snackbar.LENGTH_SHORT,
              });
              authnavigation.navigate('SignUp');
            }
          } catch (error) {
            console.error('Error signing up:', error);
          }
        })

        .catch(error => {
          console.error('Error during sign in with credential:', error);
        });
    } else {
      console.error('Verification ID is missing');
      setError('Verification ID is missing');
    }
  };

  const handleResendOTP = () => {
    if (timer === 0) {
      setTimer(10); // Reset the timer only if it's already at 0
    }
  };

  const getInputBoxStyle = (value: string) => {
    return {
      borderColor: value.length === 1 ? 'transparent' : 'lightgrey',
      borderWidth: value.length === 1 ? 0 : 1,
    };
  };
  useEffect(() => {
    // Check if all input boxes have a value
    if (inp1 && inp2 && inp3 && inp4 && inp5 && inp6) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [inp1, inp2, inp3, inp4, inp5, inp6]);

  useEffect(() => {
    // Start the timer when OTP is sent
    const interval = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer === 0) {
          clearInterval(interval); // Clear the interval when timer reaches 0
          return prevTimer;
        }
        return prevTimer - 1;
      });
    }, 1000);

    // Clear the interval when the component unmounts or when the timer reaches 0
    return () => clearInterval(interval);
  }, [timer]);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={[styles.titleText, styles.elevatedText]}>Sign Up</Text>
        </View>
        <View style={styles.subContainer}>
          <Text style={[styles.subText, styles.elevatedText]}>
            OTP Verfication
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            Enter the 6-digit OTP sent to you Email or Mobile No.
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            ref={et1}
            value={inp1}
            style={[styles.inputBox, getInputBoxStyle(inp1)]}
            keyboardType="number-pad"
            maxLength={1}
            onChangeText={txt => {
              setInp1(txt);
              if (txt.length === 1) {
                et2.current?.focus();
              }
            }}
          />
          <TextInput
            ref={et2}
            value={inp2}
            style={[styles.inputBox, getInputBoxStyle(inp2)]}
            keyboardType="number-pad"
            maxLength={1}
            onChangeText={txt => {
              setInp2(txt);
              if (txt.length === 1) {
                et3.current?.focus();
              } else if (txt.length === 0) {
                et1.current?.focus();
              }
            }}
          />
          <TextInput
            ref={et3}
            value={inp3}
            style={[styles.inputBox, getInputBoxStyle(inp3)]}
            keyboardType="number-pad"
            maxLength={1}
            onChangeText={txt => {
              setInp3(txt);
              if (txt.length === 1) {
                et4.current?.focus();
              } else if (txt.length === 0) {
                et2.current?.focus();
              }
            }}
          />
          <TextInput
            ref={et4}
            value={inp4}
            style={[styles.inputBox, getInputBoxStyle(inp4)]}
            keyboardType="number-pad"
            maxLength={1}
            onChangeText={txt => {
              setInp4(txt);
              if (txt.length === 1) {
                et5.current?.focus();
              } else if (txt.length === 0) {
                et3.current?.focus();
              }
            }}
          />
          <TextInput
            ref={et5}
            value={inp5}
            style={[styles.inputBox, getInputBoxStyle(inp5)]}
            keyboardType="number-pad"
            maxLength={1}
            onChangeText={txt => {
              setInp5(txt);
              if (txt.length === 1) {
                et6.current?.focus();
              } else if (txt.length === 0) {
                et4.current?.focus();
              }
            }}
          />
          <TextInput
            ref={et6}
            value={inp6}
            style={[styles.inputBox, getInputBoxStyle(inp6)]}
            keyboardType="number-pad"
            maxLength={1}
            onChangeText={txt => {
              setInp6(txt);
              if (txt.length === 0) {
                et5.current?.focus();
              }
            }}
          />
        </View>
        <View>
          <View style={styles.timerContainer}>
            <Icon name="clock-o" style={styles.icon} />
            <Text style={styles.timerText}>
              {timer === 0
                ? 'Resend OTP now'
                : `Resend OTP in ${timer} seconds`}
            </Text>
          </View>
          <TouchableOpacity
            activeOpacity={isButtonDisabled ? 1 : 0.7}
            onPress={() => {
              console.log('Verify button pressed');
              handleVerificationCodeInput();
            }}
            style={[
              styles.footerContainer,
              styles.elevatedLogo,
              {backgroundColor: isButtonDisabled ? 'lightgrey' : '#77B0AA'},
            ]}>
            <Text
              style={[
                styles.buttonText,
                styles.elevatedText,
                {color: isButtonDisabled ? 'white' : '#003C43'},
              ]}>
              Verify
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.resendOtpContainer}>
          <Icon
            name="refresh"
            style={[
              styles.icon,
              {
                color:
                  timer === 0
                    ? '#003C43'
                    : isButtonDisabled
                    ? 'grey'
                    : '#003C43',
              },
            ]}
          />
          <TouchableOpacity
            onPress={handleResendOTP}
            disabled={timer !== 0}
            activeOpacity={isButtonDisabled ? 0.7 : 1}>
            <Text
              style={[
                styles.resendOtpText,
                styles.elevatedText,
                {
                  color:
                    timer === 0
                      ? '#003C43'
                      : isButtonDisabled
                      ? 'grey'
                      : '#003C43',
                },
              ]}>
              Resend OTP
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Loading visible={isLoading} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3FEF7',
  },
  icon: {
    fontSize: 22,
    color: '#135D66',
    marginRight: 6,
  },
  elevatedText: {
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: {width: 1, height: 3},
    textShadowRadius: 10,
  },
  titleContainer: {
    height: 75,
    marginTop: 70,
  },
  titleText: {
    color: '#135D66',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 48,
  },
  subContainer: {
    marginTop: 30,
  },

  subText: {
    textAlign: 'center',
    color: '#135D66',
    fontSize: 38,
    fontWeight: '400',
  },
  infoContainer: {
    marginTop: 15,
  },
  infoText: {
    textAlign: 'center',
    color: '#135D66',
    fontSize: 14,
    fontWeight: '700',
  },

  inputContainer: {
    marginLeft: 25,
    marginVertical: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputBox: {
    height: 50,
    width: 50,
    marginLeft: 6,
    marginTop: 1,
    paddingVertical: 2,
    fontSize: 28,
    backgroundColor: '#ffff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
    color: '#135D66',
    textAlign: 'center',
    borderWidth: 1.2,
  },
  timerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  timerText: {
    fontSize: 16,
    color: '#135D66',
  },
  footerContainer: {
    marginBottom: 70,
    backgroundColor: '#77B0AA',
    height: 65,
    width: 320,
    borderRadius: 28,
    marginTop: 40,
    alignSelf: 'center',
    alignItems: 'center',
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
  buttonText: {
    fontSize: 26,
    fontWeight: '500',
    textAlign: 'center',
    paddingTop: 14,
    color: '#003C43',
  },
  resendOtpContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  resendOtpText: {
    textAlign: 'center',
    color: '#003C43',
    fontSize: 18,
    fontWeight: '700',
  },
});
