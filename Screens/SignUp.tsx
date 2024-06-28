import {
  StyleSheet,
  Text,
  TextInput,
  Dimensions,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import {Formik, FormikHelpers} from 'formik';
import * as Yup from 'yup';
import auth from '@react-native-firebase/auth';
import {Context} from '../src/appwrite/Context';

import {ChangeEvent} from 'react';
import {FormikHandlers} from 'formik';

//Navigation
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamList} from '../src/types/navigation';


const {width, height} = Dimensions.get('window');

export interface FormValues {
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  agreeToTerms: boolean;
}

const SignupSchema = Yup.object().shape({
  email: Yup.string().required('Email is required'),
  password: Yup.string()
    .min(6, 'Password is too short - should be 6 chars minimum.')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
    .required('Confirm Password is required'),
  phone: Yup.string()
    .matches(/^03\d{9}$/, 'Invalid Mobile Number. It should be 03XXXXXXXXX.')
    .required('Mobile No. is required'),
});

type SignupScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  'SignUp'
> & {
  navigation: OtpScreenNavigationProp;
};

type RootStackParamList = {
  OtpScreen: {verificationId: string | null; userData: FormValues};
};

type OtpScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'OtpScreen'
>;

const SignUp: React.FC<SignupScreenProps> = ({navigation}) => {
  const [isSelected, setSelection] = useState(false);


  const [error, setError] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confrimPassword, setConfirmPassword] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  const createHandleChange =
    (
      fieldName: string,
      formikHandleChange: (e: string | ChangeEvent<any>) => void,
      customHandlers: Array<(text: string) => void>,
    ) =>
    (text: string) => {
      formikHandleChange(text); // Call Formik's handleChange directly with text
      customHandlers.forEach(handler => handler(text)); // Call custom functions
    };

  // const handleSignUp = () => {
  //   if (
  //     email.length < 1 ||
  //     password.length <1 ||
  //     confrimPassword.length < 1 ||
  //     phone.length <1
  //     ){
  //       setError('Fill all fields');
  //     } else if (password ! == confrimPassword){
  //       setError('Passwords do not match');
  //     } else {
  //       const user = {
  //         email,
  //         password,
  //         phone,
  //       };
  //     appwrite
  //     .createAccount(user)
  //     .then((response: any) => {
  //       if(response){
  //         setIsLoggedIn(true)
  //         Snackbar.show({
  //           text: 'Sign Up Succesful',
  //           duration: Snackbar.LENGTH_SHORT
  //         })
  //       }
  //     })
  //     .catch(e => {
  //       console.log(e);
  //       setError(e.message)
  //     })
  //   }
  // }

  const handleSignUp = async (values: FormValues) => {
    try {
      const phoneNumber = `+92${values.phone.slice(1)}`;
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      const verificationId = confirmation.verificationId;
      navigation.navigate('OtpScreen', {verificationId, userData: values});
    } catch (error) {
      console.error('Error sending verification code:', error);
      setError('Error sending verification code');
    }
  };

  // const sendVerificationCode = (phoneNumber: string,values: FormValues) => {
  //   auth()
  //     .signInWithPhoneNumber(phoneNumber)
  //     .then((confirmation: FirebaseAuthTypes.ConfirmationResult) => {
  //       console.log('Confirmation sent:', confirmation);
  //       // Get the verification ID from the confirmation object
  //       const verificationId = confirmation.verificationId;
  //       // Navigate to OtpScreen and pass the verificationId
  //       navigation.navigate('OtpScreen', { verificationId, userData:values});
  //     })
  //     .catch((error) => {
  //       console.error('Error sending confirmation:', error);
  //     });
  // };

  return (
    <ScrollView style={styles.container}>
      <Formik
        initialValues={{
          email: '',
          password: '',
          confirmPassword: '',
          phone: '',
          agreeToTerms: false,
        }}
        validationSchema={SignupSchema}
        onSubmit={(
          values: FormValues,
          {setSubmitting}: FormikHelpers<FormValues>,
        ) => {
          setSubmitting(false);
          handleSignUp(values);
          // const phoneNumber = `${values.Mobile}`;
          // sendVerificationCode(phoneNumber,values);
        }}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isSubmitting,
          setFieldValue,
        }) => (
          <View>
            <View style={styles.topTextContainer}>
              <Text style={styles.topText}>Sign Up</Text>
            </View>
            <View style={styles.subTextContainer}>
              <Text style={styles.subText}>Welcome to Electralysis</Text>
            </View>
            <View style={styles.inputContainer}>
              <Icon style={styles.icon} name="user"></Icon>
              <TextInput
                placeholder="Email"
                placeholderTextColor={'#a9a9a9'}
                style={styles.inputBox}
                onChangeText={createHandleChange(
                  'email',
                  handleChange('email'),
                  [setError, setEmail],
                )}
                onBlur={handleBlur('email')}
                value={values.email}
              />
            </View>
            {errors.email && touched.email ? (
              <Text style={styles.error}>{errors.email}</Text>
            ) : null}

            <View style={styles.inputContainer}>
              <Icon style={styles.icon} name="lock"></Icon>
              <TextInput
                placeholder="Password"
                placeholderTextColor={'#a9a9a9'}
                style={styles.inputBox}
                onChangeText={createHandleChange(
                  'password',
                  handleChange('password'),
                  [setError, setPassword],
                )}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry
              />
            </View>
            {errors.password && touched.password ? (
              <Text style={styles.error}>{errors.password}</Text>
            ) : null}

            <View style={styles.inputContainer}>
              <Icon style={styles.icon} name="lock"></Icon>
              <TextInput
                placeholder="Confirm Password"
                placeholderTextColor={'#a9a9a9'}
                style={styles.inputBox}
                onChangeText={createHandleChange(
                  'confirmPassword',
                  handleChange('confirmPassword'),
                  [setError, setConfirmPassword],
                )}
                onBlur={handleBlur('confirmPassword')}
                value={values.confirmPassword}
                secureTextEntry
              />
            </View>
            {errors.confirmPassword && touched.confirmPassword ? (
              <Text style={styles.error}>{errors.confirmPassword}</Text>
            ) : null}

            <View style={styles.inputContainer}>
              <Icon2 style={styles.icon} name="mobile-alt"></Icon2>
              <TextInput
                placeholder="03474769188"
                placeholderTextColor={'#a9a9a9'}
                style={styles.inputBox}
                onChangeText={createHandleChange(
                  'phone',
                  handleChange('phone'),
                  [setError],
                )}
                onBlur={handleBlur('phone')}
                value={values.phone}
              />
            </View>
            {errors.phone && touched.phone ? (
              <Text style={styles.error}>{errors.phone}</Text>
            ) : null}

            <View style={styles.checkBoxContainer}>
              <CheckBox
                value={isSelected}
                onValueChange={value => {
                  setSelection(value);
                  setFieldValue('agreeToTerms', value);
                }}
                style={styles.checkBox}
                disabled={false}
                tintColors={{true: '#003C43', false: '#003C43'}}
              />
              <View style={styles.termsContainer}>
                <Text style={styles.preTermsText}>I agree to</Text>
                <TouchableOpacity>
                  <Text style={[styles.termsText, styles.elevatedText]}>
                    Terms & Conditions
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={[
                styles.buttonContainer,
                styles.elevatedLogo,
                !isSelected || isSubmitting || Object.keys(errors).length > 0 ? styles.disabledButton : null,
              ]}>
              <TouchableOpacity
                onPress={() => handleSubmit()}
                disabled={!isSelected || isSubmitting || Object.keys(errors).length > 0}>
                <Text style={[styles.buttonText, styles.elevatedText]}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.noAccountContainer}>
              <Text style={styles.noAccountText}>Already have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                <Text style={[styles.signInText, styles.elevatedText]}>
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3FEF7',
  },
  topTextContainer: {
    height: height * 0.1,
    marginTop: height * 0.05,
  },
  topText: {
    color: '#135D66',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: height * 0.06,
  },
  subTextContainer: {
    height: height * 0.043,
  },
  subText: {
    textAlign: 'center',
    color: '#135D66',
    fontSize: height * 0.022,
    fontWeight: '600',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: width * 0.05,
    backgroundColor: '#ffff',
    borderRadius: width * 0.06,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
    height: height * 0.07,
    width: width * 0.85,
    marginVertical: height * 0.0200,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  inputBox: {
    marginLeft: width * 0.025,
    fontSize: height * 0.022,
    width: width * 0.85,
    color: '#135D66',
  },
  icon: {
    fontSize: height * 0.032,
    color: '#135D66',
    textAlign: 'left',
  },
  buttonContainer: {
    marginBottom: height * 0.05,
    backgroundColor: '#77B0AA',
    height: height * 0.082,
    width: width * 0.56,
    borderRadius: width * 0.14,
    marginTop: height * 0.03,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: height * 0.032,
    fontWeight: '500',
    textAlign: 'center',
    color: '#003C43',
  },
  elevatedText: {
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: {width: 1, height: 3},
    textShadowRadius: height * 0.025,
  },
  elevatedLogo: {
    shadowColor: 'black',
    shadowOffset: {
      width: width * 0.0075,
      height: height * 0.015,
    },
    shadowOpacity: 0.85,
    shadowRadius: height * 0.015,
    elevation: 8,
  },

  checkBoxContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    textAlign: 'left',
    
  },
  checkBox: {
    alignSelf: 'auto',
    height: height * 0.06,
    width: height * 0.04,
  },
  termsContainer: {
    flexDirection: 'row',
    marginLeft: width * 0.02,
    alignItems: 'center',
  },
  preTermsText: {
    color: '#135D66',
    fontSize: height * 0.022,
    fontWeight: '600',
  },
  termsText: {
    textAlign: 'center',
    color: '#003C43',
    fontSize: height * 0.022,
    fontWeight: '600',
    marginLeft: width * 0.01,
  },
  noAccountContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    borderTopWidth: height * 0.002,
    borderTopColor: 'grey',
    paddingTop: height * 0.02,
    marginTop: height * 0.06,
    width: width * 0.79,
    justifyContent: 'center',
  },
  noAccountText: {
    color: '#135D66',
    fontSize: height * 0.02,
    fontWeight: '800',
    paddingTop: height * 0.003,
  },
  signInText: {
    paddingLeft: width * 0.014,
    color: '#003C43',
    fontSize: height * 0.024,
    fontWeight: '700',
  },
  error: {
    color: 'red',
    marginLeft: width * 0.1,
    marginBottom: height * 0.025,
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
  },
  disabledButtonText: {
    color: '#666666',
  },
});

export default SignUp;
