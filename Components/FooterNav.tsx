import { StyleSheet, Text, View,Image, Dimensions,TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
const { width, height } = Dimensions.get('window');

const FooterNav = () => {
  return (
    <>
     <View style={styles.footer}>
                <TouchableOpacity style={styles.footerButton}>
                    <Icon name="home" style={styles.footerIcon} />
                    <Text style={styles.footerText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerButton}>
                    <Icon name="bar-chart" style={styles.footerIcon} />
                    <Text style={styles.footerText}>Stats</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerButton}>
                    <Icon name="cog" style={styles.footerIcon} />
                    <Text style={styles.footerText}>Settings</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerButton}>
                    <Icon name="user" style={styles.footerIcon} />
                    <Text style={styles.footerText}>Profile</Text>
                </TouchableOpacity>
            </View>
    </>
  )
}

export default FooterNav

const styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingVertical: height*0.014,
        backgroundColor: '#003C43',
        borderTopLeftRadius: 34,
        borderTopRightRadius: 34
    },
    footerButton: {
        alignItems: 'center',
    },
    footerIcon: {
        fontSize: 24,
        color: '#FFF',
    },
    footerText: {
        fontSize: 12,
        color: '#FFF',
        marginTop: 4,
    },
})