import { StyleSheet, Text, TextInput, View, TouchableOpacity, Dimensions } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width, height } = Dimensions.get('window');

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
                <Icon style={styles.icon} name="user" />
                <TextInput
                    placeholder='Email or Mobile No.'
                    placeholderTextColor={'#a9a9a9'}
                    style={styles.inputBox}
                />
            </View>
            <View style={styles.inputContainer}>
                <Icon style={styles.icon} name="lock" />
                <TextInput
                    placeholder='Password'
                    placeholderTextColor={'#a9a9a9'}
                    style={styles.inputBox}
                />
            </View>
            <View>
                <Text style={styles.forgotPasswordText}>Forgot Your Password?</Text>
            </View>
            <View style={[styles.footerContainer, styles.elevatedLogo]}>
                <TouchableOpacity>
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
                <TouchableOpacity>
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
