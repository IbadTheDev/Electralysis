import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import React, {useContext, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {signInUser} from '../Apis/SignInApi';
import {Formik} from 'formik';
import * as Yup from 'yup';

//Navigation
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../src/types/navigation';

//appwrite Session
import {Context} from '../src/appwrite/Context';
import Snackbar from 'react-native-snackbar';

type LoginScreenProps = NativeStackScreenProps<AuthStackParamList, 'SignIn'>;

const {width, height} = Dimensions.get('window');

const SignIn: React.FC<LoginScreenProps> = ({navigation}) => {
  const [isSelected, setSelection] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSecure, setisSecure] = useState(false);
  const [redBorder, setRedBorder] = useState(false);


  const [error, setError] = useState<string>('');
  const {appwrite, setIsLoggedIn} = useContext(Context);

  const SignInSchema = Yup.object().shape({
    email: Yup.string().required('Email is required'),
    password: Yup.string()
      .min(6, 'Password is too short - should be 6 chars minimum.')
      .required('Password is required'),
  });

  const handleSignIn = async (values: { email: string; password: string }) => {
    const {email, password} = values;
    const user = {email, password};
      appwrite
        .login(user)
        .then(response => {
          if (response) {
            setIsLoggedIn(true);
            Snackbar.show({
              text: 'Logged in',
              duration: Snackbar.LENGTH_SHORT,
            });
          }
        })
        .catch(e => {
          console.log(e);
          setError('Incorrect email or password');
          Snackbar.show({
            text: 'Incorrect email or password',
            duration: Snackbar.LENGTH_SHORT,
          });
        });

      try {
        const response = await signInUser(values);
        console.log('Sign in successful:', response);
        Snackbar.show({
          text: 'Sign In Successful',
          duration: Snackbar.LENGTH_SHORT,
        });
      } catch (error) {
        console.log('Error signing in');
        Snackbar.show({
          text: 'Sign in failed',
          duration: Snackbar.LENGTH_SHORT,
        });
      }
  };
  const secureHandler = () => {
    setisSecure(!isSecure);
  }
 
  return (
    <>
    <ScrollView style={styles.container}>
       <Formik
        initialValues={{email: '', password: ''}}
        validationSchema={SignInSchema}
        onSubmit={(values, {setSubmitting}) => {
          setSubmitting(false);
          handleSignIn(values);
        }}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isSubmitting,
        }) => (
          <View>
      <View style={styles.topTextContainer}>
        <Text style={styles.topText}>Sign In</Text>
      </View>
      <View style={styles.subTextContainer}>
        <Text style={styles.subText}>Login to Existing account</Text>
      </View>
      <View style={[styles.inputContainer, redBorder ? styles.errorInput : null]}>
        <Icon style={styles.icon} name="user" />
        <TextInput
          placeholder="Email."
          placeholderTextColor={'#a9a9a9'}
          style={styles.inputBox}
          value={values.email}
          onChangeText={handleChange('email')}
          onBlur={ () => {
            handleBlur('email');

          if (errors.email && touched.email) {
            setRedBorder(true);
          } else {
            setRedBorder(false);
          }
        }}
        />
      </View>

      <View style={[styles.inputContainer, redBorder ? styles.errorInput : null]}>
        <Icon style={styles.icon} name="lock" />
        <TextInput
          placeholder="Password"
          placeholderTextColor={'#a9a9a9'}
          style={styles.inputBox}
          value={values.password}
          onChangeText={handleChange('password')}
          onBlur={ () => {
            handleBlur('password');

          if (errors.password && touched.password) {
            setRedBorder(true);
          } else {
            setRedBorder(false);
          }
        }}
          secureTextEntry={isSecure}
        />
        <TouchableOpacity
        activeOpacity={0.7}
        onPress={secureHandler}>
        {isSecure?  <Icon  name ='eye' style={styles.eyeIcon} />:<Icon  name ='eye-slash' style={styles.eyeIcon}/> }
        </TouchableOpacity>
        </View>
        
{/*       
      </View>
        {errors.password && touched.password ? (
          <Text style={styles.error}>{errors.password}</Text>
        ) : null}
      <View> */}
        <Text style={styles.forgotPasswordText}>Forgot Your Password?</Text>
     
      <View style={[styles.buttonContainer, styles.elevatedLogo,
        isSubmitting || Object.keys(errors).length > 0 || !values.email || !values.password ? styles.disabledButton  : null
      ]}>
        <TouchableOpacity 
        activeOpacity={0.8}
        onPress={() => { 
          handleSubmit();
          if (errors.password && touched.password) {
            if (errors.email && touched.email) {
              setRedBorder(true);
            } else {
              setRedBorder(false);
            }
          }
        }}
        >
          <Text style={[styles.buttonText, styles.elevatedText]}>Sign In</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.checkBoxContainer}>
        <CheckBox
          value={isSelected}
          onValueChange={setSelection}
          style={styles.checkBox}
          disabled={false}
          tintColors={{true: '#003C43', false: '#003C43'}}
        />
        <Text style={styles.checkBoxText}>Remember Me</Text>
      </View>
      <View style={styles.noAccountContainer}>
        <Text style={styles.noAccountText}>Don't have an account?</Text>
        <TouchableOpacity activeOpacity={0.3} onPress={() => navigation.navigate('SignUp')}>
          <Text style={[styles.signUpText, styles.elevatedText]}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      </View>
         )}
      </Formik>
    </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3FEF7',
    padding: width * 0.05,
  },
  topTextContainer: {
    height: height * 0.15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topText: {
    color: '#135D66',
    fontWeight: '600',
    fontSize: width * 0.16,
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
    width: width*0.88,
    alignSelf:'center',
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
    fontSize: width * 0.045,
    flex: 1,
    color: '#135D66',
  },
  errorInput: {
    borderColor: 'red',
    borderWidth:1,
  },
  eyeIcon:{
    fontSize: width * 0.06,
    color: '#135D66',
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
    textShadowOffset: {width: 1, height: 3},
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
  buttonContainer: {
    backgroundColor: '#77B0AA',
    height: height * 0.08,
    width: width * 0.6,
    borderRadius: 28,
    marginTop: height * 0.08,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
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
    marginVertical: height * 0.12,
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
  error: {
    color: 'red',
    marginHorizontal:width*0.12
  },
});


export default SignIn;
