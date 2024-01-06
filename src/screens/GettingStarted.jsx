import React, {useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const GettingStartedScreen = ({ navigation }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
          navigation.replace('main');
        }, 5000);    
        return () => clearTimeout(timer);
      }, [navigation]);
    
  return (
    <View style={styles.container}>
      <Text style={styles.title}> MATA</Text>
      
      <View style={styles.content}>
        <Image 
            style={styles.icon}
            source={require('../../assets/alarmclock1.gif')} 
        />

        <Text style={styles.description}>Start your day with ease!</Text>
        
        {/*<Text style={styles.sectionTitle}>Getting Started</Text>
        <Text style={styles.sectionDescription}>
            Our alarm app will help you wake up easily and smartly. Setting alarms, managing sleep time, and analyzing your sleep !
        </Text>

        <Text style={styles.buttonText}>Get Started</Text>*/}

      </View>
      <Text style={styles.footer}>Contact us at support@alarmapp.com</Text>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#83c5be',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 25,
    marginBottom: 20,
  },
  content: {
    alignItems: 'center',
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    fontSize: 14,
    color: '#888',
  },
  icon:{
    width: 250,
    height: 250,
    backgroundColor: '#83c5be',
    marginBottom: 10,
    marginTop: 10,
  },
});

export default GettingStartedScreen;
