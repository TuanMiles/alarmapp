import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, StatusBar, useColorScheme, LogBox, TouchableOpacity } from 'react-native';
import List from './src/screens/List';
import AlarmCreator from './src/screens/AlarmCreator';
import { Database } from "./api/Database";
import Icon from 'react-native-vector-icons/FontAwesome'; // Import Icon component
import GettingStartedScreen from './src/screens/GettingStarted';
import StopWatch from './src/screens/StopWatch';
import TimerWatch from './src/screens/TimerWatch';

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
          }} 
        />
        <Stack.Screen name="creator" component={AlarmCreator} options={{ title: 'Add new alarm', headerStyle: { backgroundColor: '#f1f1f1' }, headerTintColor: '#83c5be', }} />
        <Stack.Screen name="stopwatch"  component={StopWatch} options={{ title: 'Stop Watch' }} />
        <Stack.Screen name="timer"  component={TimerWatch} options={{ title: 'Timer' }} />
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