import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, StatusBar, useColorScheme, LogBox, TouchableOpacity } from 'react-native';
import List from './src/screens/List';
import AlarmCreator from './src/screens/AlarmCreator';
import { Database } from "./api/Database";
import Icon from 'react-native-vector-icons/FontAwesome'; // Import Icon component
import { useNavigation } from '@react-navigation/native';
import SleepAnalytics from './src/screens/SleepAnalytics';
import GettingStartedScreen from './src/screens/GettingStarted';

const Stack = createNativeStackNavigator();
LogBox.ignoreAllLogs();

const App = () => {

  useEffect(() => { Database.createTable(); console.log('created database') }, [])

  const isDarkMode = useColorScheme() === 'dark'
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="GettingStarted">
        <Stack.Screen 
          name="GettingStarted" // Tên màn hình "GettingStarted"
          component={GettingStartedScreen} // Component cho màn hình "GettingStarted"
          options={{ headerShown: false }} // Ẩn header của màn hình này nếu cần thiết
        />
        <Stack.Screen 
          name="main" 
          component={List} 
          options={{ 
            title: 'Your next wake up', 
            headerStyle: { backgroundColor: '#f1f1f1' }, 
            headerTintColor: '#83c5be',
            headerRight: () => (
            
              <TouchableOpacity style={styles.headerRightButton}>
                <Text style={styles.headerRightButtonText}>Your sleep</Text>
                <Icon name="search" size={20} color="#83c5be" style={styles.glass}/>
             
              </TouchableOpacity>
            ),
          }} 
        />
        <Stack.Screen name="creator" component={AlarmCreator} options={{ title: 'Add new alarm', headerStyle: { backgroundColor: '#f1f1f1' }, headerTintColor: '#83c5be', }} />
        <Stack.Screen name="sleepAnalytics"  component={SleepAnalytics} options={{ title: 'Sleep Analytics' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerRightButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#83c5be',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginRight: 10,
  },
  glass:{
    marginLeft: 5,
    color: '#FFFFFF'
  },
  headerRightButtonText: {
    fontWeight: '800',
    color: '#FFFFFF',
  },
});

export default App;