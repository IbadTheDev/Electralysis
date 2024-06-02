// import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
// import React, { useState } from 'react'
// import * as Yup from 'yup'
// import { Formik } from 'formik'


// const PasswordSchema = Yup.object().shape({
//     passwordLength: Yup.number()
//     .min(4, 'Should be of atleast 4 characters')
//     .max(16, 'Should be ofatmost 16 characters')
//     .required('Password is required')
// })

// const Validation = () => {

// const [password, setPassword] = useState('')

// const [isPassGenerated, setIsPassGenerated] = useState(false)
// const [symbols, setsymbols] = useState(false)

// const Batch2020 = {
//   SoftwareEngineering: () => {
//       return "Hello World";
//     }
// }



// const resetPassword = () => {
//     setPassword('')
//     setIsPassGenerated(false) 
//     setsymbols(false)
// }

//   return (
//     // <ScrollView keyboardShouldPersistTaps="handled">
//     //     <SafeAreaView>
//     //         <View style={styles.container}>
//     //             <Text>password Generator</Text>
//     //             <Formik
//     //    initialValues={{ passwordLength:'' }}
//     //     validationSchema={PasswordSchema}
//     //    onSubmit={values => {
//     //     console.log(values); 
//     //     generatePasswordString(+values.passwordLength) 
         
//     //    }}
//     //  >
//        {({
//          values,
//          errors,
//          touched,
//          handleChange,
//          handleSubmit,
//          handleReset,
//          /* and other goodies */
//        }) => (
//          <>
//          <View style={styles.inputWrapper}>
//             <View style={styles.inputColumn}>
//                 <Text>Password</Text>
//                 {touched.passwordLength && errors.passwordLength && (
//                     <Text style={styles.errorText}>
//                         {errors.passwordLength}
//                     </Text>
//                 )}
//                 <TextInput
//                 style={styles.inputStyle}
//                 value={values.passwordLength}
//                 onChangeText={handleChange('passwordLength')}
//                 placeholder='enter soemthing'
//                 keyboardType='numeric'
//                 />
//             </View>
//          </View>
//          <View style={styles.inputWrapper}>
//             <Text>include lowerCase</Text>
//             <BouncyCheckBox 
//             disableBuiltInState
//             isChecked={lowerCase}
//             onPress={() => setlowerCase(!lowerCase)}
//             fillColor="grey"
            
//             />
//          </View>
//          <View style={styles.inputWrapper}></View>
//          <View style={styles.inputWrapper}></View>

//          <View style={styles.formActions}>
//             <TouchableOpacity
//             disabled={!isValid}
//             >
//                 <Text>Generate</Text>
//                 </TouchableOpacity>
//             <TouchableOpacity>
//             <Text>Reset</Text>
//             </TouchableOpacity>
//          </View>
//          </>
//        )}
//      </Formik>
//             </View>
//         </SafeAreaView>
//     </ScrollView>
//   )
// }

// export default Validation

// const styles = StyleSheet.create({})