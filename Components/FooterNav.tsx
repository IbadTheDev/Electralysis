import { StyleSheet, Text, View,Image, Dimensions,TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { HomeScreenNavigationProp, GraphScreenNavigationProp } from '../src/types/navigation'; 
import { AppStackParamList } from '../src/routes/AppStack';

const { width, height } = Dimensions.get('window');
type FooterNavProps = {
    navigation: any; // or use NavigationProp<AppStackParamList>
};




const FooterNav: React.FC<FooterNavProps> = ({ navigation }) => {
    const navigateToHome = () => {
        navigation.navigate('HomeScreen');
      };
    
      const navigateToGraph = () => {
        navigation.navigate('GraphScreen');
      };

  return (
    <>
     <View style={styles.footer}>
                <TouchableOpacity onPress={navigateToHome}  style={styles.footerButton}>
                    <Icon name="home" style={styles.footerIcon} />
                    <Text style={styles.footerText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={navigateToGraph} style={styles.footerButton}>
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
});

export default FooterNav;