import { StyleSheet, Text, TextInput, Dimensions, View, TouchableOpacity, ScrollView } from 'react-native'
import CheckBox from '@react-native-community/checkbox';
import React , {useState} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/FontAwesome5'
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';

const { width, height } = Dimensions.get('window');

interface FormValues {
    fullName: string;
    password: string;
    confirmPassword: string;
    Mobile: string;
    agreeToTerms: boolean;
  }

const SignupSchema = Yup.object().shape({
    fullName: Yup.string()
    .required('Full Name is required'),
    password: Yup.string()
    .min(6, 'Password is too short - should be 6 chars minimum.')
    .required('Password is required'),
    confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
    .required('Confirm Password is required'),
    Mobile: Yup.string()
    .required('Mobile No. is required')
    .test('is-11-digits', 'Invalid Mobile Number', val => val?.length === 11),
});

export default function SignUp() {
    const [isSelected, setSelection] = useState(false);
    function alert(arg0: string) {
        throw new Error('Function not implemented.');
    }

  return (
    <ScrollView style={styles.container}>
    <Formik
    
    initialValues={{ 
        fullName: '',
        password: '', 
        confirmPassword: '', 
        Mobile: '', 
        agreeToTerms: false
     }}
    validationSchema={SignupSchema}
    onSubmit={(values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
        }, 400);
    }}
>
{({ 
    handleChange, 
    handleBlur, 
    handleSubmit, 
    values, 
    errors, 
    touched, 
    isSubmitting, 
    setFieldValue
     }) => (
<View >
    <View style={styles.topTextContainer}>
      <Text style={styles.topText}>Sign Up</Text>
    </View>
    <View style={styles.subTextContainer}>
        <Text style={styles.subText}>Welcome to Electralysis</Text>
    </View>
    <View style={styles.inputContainer}>
        <Icon style={styles.icon} name="user"></Icon>
        <TextInput 
        placeholder='Full Name' 
        placeholderTextColor={'#a9a9a9'} 
        style={styles.inputBox}
        onChangeText={handleChange('fullName')}
        onBlur={handleBlur('fullName')}
        value={values.fullName}
        />
    </View>
    {errors.fullName && touched.fullName ? (<Text style={styles.error}>{errors.fullName}</Text>) : null}
                    
    <View style={styles.inputContainer}>
        <Icon style={styles.icon} name="lock"></Icon>
        <TextInput 
        placeholder='Password'
        placeholderTextColor={'#a9a9a9'} 
        style={styles.inputBox}
        onChangeText={handleChange('password')}
        onBlur={handleBlur('password')}
        value={values.password}
        secureTextEntry
        />
    </View>
    {errors.password && touched.password ? (<Text style={styles.error}>{errors.password}</Text>) : null}
    
    <View style={styles.inputContainer}>
        <Icon style={styles.icon} name="lock"></Icon>
        <TextInput 
        placeholder='Confirm Password' 
        placeholderTextColor={'#a9a9a9'} 
        style={styles.inputBox}
        onChangeText={handleChange('confirmPassword')}
        onBlur={handleBlur('confirmPassword')}
        value={values.confirmPassword}
        secureTextEntry
        />
    </View>
    {errors.confirmPassword && touched.confirmPassword ? (<Text style={styles.error}>{errors.confirmPassword}</Text>) : null}
    
    <View style={styles.inputContainer}>
        <Icon2 style={styles.icon} name="mobile-alt"></Icon2>
        <TextInput 
        placeholder='Mobile No.' 
        placeholderTextColor={'#a9a9a9'} 
        style={styles.inputBox}
        onChangeText={handleChange('Mobile')}
        onBlur={handleBlur('Mobile')}
        value={values.Mobile}
        />
    </View>
    {errors.Mobile && touched.Mobile ? (<Text style={styles.error}>{errors.Mobile}</Text>) : null}

    <View style={styles.checkBoxContainer}>
    <CheckBox
    value={isSelected}
    onValueChange={(value) => {
        setSelection(value);
        setFieldValue('agreeToTerms', value);
    }}
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
    <View style={[styles.footerContainer, styles.elevatedLogo, !isSelected || isSubmitting ? styles.disabledButton: null]}>
        <TouchableOpacity onPress={() => handleSubmit()} disabled={!isSelected || isSubmitting}>
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
  )}
</Formik>
</ScrollView>
)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E3FEF7"
  },
  topTextContainer: {
    height: height * 0.12,
    marginTop: height * 0.05,
  },
  topText: {
    color: '#135D66',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: height * 0.06,
  },
  subTextContainer: {
    height: height * 0.033,
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
    height: height * 0.070,
    width: width * 0.8,
    marginVertical: height * 0.018,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  inputBox: {
    marginLeft: width * 0.02,
    fontSize: height * 0.022,
    color: '#135D66',
  },
  icon: {
    fontSize: height * 0.032,
    color: '#135D66',
    textAlign: 'left',
  },
  footerContainer: {
    marginBottom: height * 0.05,
    backgroundColor: '#77B0AA',
    height: height * 0.082,
    width: width * 0.56,
    borderRadius: width * 0.14,
    marginTop: height * 0.042,
    alignSelf:'center',
    justifyContent:'center',
  },
  buttonText: {
    fontSize: height * 0.032,
    fontWeight: '500',
    textAlign: 'center',
    color: '#003C43',
  },
  elevatedText: {
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 1, height: 3 },
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
    textAlign:'left',
    marginTop:height*0.012
  },
  checkBox: {
    alignSelf: 'auto',
    height: height * 0.04,
    width: height * 0.02,
    
  },
  termsContainer: {
    flexDirection: 'row',
    marginLeft: width * 0.04,
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
    marginTop: height * 0.04,
    width: width * 0.79,
    justifyContent:'center',
  },
  noAccountText: {
    color: '#135D66',
    fontSize: height * 0.025,
    fontWeight: '800',
    paddingTop: height * 0.004,
  },
  signInText: {
    paddingLeft: width * 0.02,
    color: '#003C43',
    fontSize: height * 0.03,
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


