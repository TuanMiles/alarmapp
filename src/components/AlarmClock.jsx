import { View, Text, Switch, Image, StyleSheet, Animated, TouchableOpacity, Dimensions, Vibration } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { formatNumber } from '../../api/Utils';
import DaySelector from './DaySelector';
import { colors } from '../../api/ColorPallete';
import { Audio } from 'expo-av';

const AlarmClock = ({ id, hour, minute, active, remove }) => {
  const [isVibration, setIsVibration] = useState(true); // Set vibration on by default
  const [isMusic, setIsMusic] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const screenHeight = Dimensions.get("window").height;
  const expansionHeight = useRef(new Animated.Value(screenHeight / 8)).current;

  const [days, setDays] = useState([{ id: 0, name: 'Monday' }, { id: 1, name: 'Tuesday' }, { id: 2, name: 'Wednesday' }, { id: 3, name: 'Thursday' }, { id: 4, name: 'Friday' }, { id: 5, name: 'Saturday' }, { id: 6, name: 'Sunday' }]);
  const [selectedDays, setSelectedDays] = useState([]);

  const [sound, setSound] = useState();
  let audioPlaying = false;

  const selectDaySelector = (id, name) => {
    setSelectedDays(prevState => [...prevState, { id, name }]);
  };

  const removeDaySelector = (id) => {
    setSelectedDays(selectedDays.filter(day => day.id !== id));
  };

  const checkAlarm = () => {
    const currentHour = new Date().getHours();
    const currentMinute = new Date().getMinutes();

    if (currentHour === hour && currentMinute === minute) {
      if (isVibration) {
        const pattern = [0.5 * 1000, 1 * 1000, 0.5 * 1000];
        Vibration.vibrate(pattern, true);
      }

      if (isMusic && !audioPlaying) {
        playSound();
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(checkAlarm, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [isMusic, isVibration, hour, minute]);

  const toggleMusic = () => {
    setIsMusic(!isMusic);
    if (isMusic && audioPlaying) {
      stopSound();
    }
  };

  const playSound = async () => {
    if (!audioPlaying) {
      audioPlaying = true;
      console.log('Loading Sound');
      const { sound } = await Audio.Sound.createAsync(require('../../assets/alarmsound.mp3'));
      setSound(sound);

      console.log('Playing Sound');
      await sound.playAsync();
    }
  };

  const stopSound = async () => {
    if (sound) {
      await sound.pauseAsync();
      setSound(undefined);
      audioPlaying = false;
    }
  };

  const toggle = () => {
    if (!isExpanded) {
      expand();
    } else {
      roll();
    }
  };

  const expand = () => {
    Animated.timing(expansionHeight, {
      toValue: screenHeight / 5.5,
      duration: 800,
      useNativeDriver: false,
    }).start();
    setTimeout(() => setIsExpanded(true), 500);
  };

  const roll = () => {
    setIsExpanded(false);
    Animated.timing(expansionHeight, {
      toValue: screenHeight / 8,
      duration: 800,
      useNativeDriver: false,
    }).start();
  };

  return (
    <Animated.View style={[theme.bigContainer, { height: expansionHeight, backgroundColor: colors.panelw }]}>
      <View style={[theme.container]}>
      <View style={theme.section}>
        <Text style={theme.title}>{`${formatNumber(hour)}:${formatNumber(minute)}`}</Text>
        <Switch style={theme.switch} trackColor={{ false: colors.black60, true: colors.black60 }} thumbColor={isMusic ? "#303030" : "#f4f3f4"} onValueChange={toggleMusic} value={isMusic} />
      </View>
      <View style={[theme.section, { justifyContent: 'flex-end', marginLeft: 120 }]}>
        {isMusic && (
          <Image
            style={{ width: 16, height: 16, marginHorizontal: 5, marginLeft: -21 }}
            source={{ uri: 'https://static.vecteezy.com/system/resources/previews/001/200/758/original/music-note-png.png' }}
          />
        )}
        {/* <TouchableOpacity onPress={toggle} >
          <Image style={theme.image} source={isExpanded ? require('../../assets/expand-button-up.png') : require('../../assets/expand-button-down.png')} />
        </TouchableOpacity> */}
        <TouchableOpacity onPress={() => remove(id)} style={theme.removeButton} >
          <Image 
            style={theme.removeImage} 
            source={require('../../assets/remove-black.png')} 
          />
        </TouchableOpacity>
      </View>
      </View>
      <View style={theme.chooseDay}>
        {days.map(day => <DaySelector key={day.id} id={day.id} name={day.name.substring(0, 3)} selectedArr={selectedDays} selectDaySelector={selectDaySelector} removeDaySelector={removeDaySelector} />)}
      </View>
    </Animated.View>
  );
};

export default AlarmClock;

const theme = StyleSheet.create({
  bigContainer: {
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingBottom: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4, 
    },
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 5,

  },
  removeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#e29578',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 40,
  },
  removeImage: {
    width: 20,
    height: 20,
    tintColor: 'white',
  },
  chooseDay: {
    flexDirection: "row",
    marginLeft: 30,
  },
  container: { flex: 1, 
    flexDirection: 'row', 
    paddingHorizontal: 20, 
    marginBottom: 5, 
    paddingBottom: 10, 
    padding: 5, 
    borderRadius: 10 
  },
  section: { 
    flexDirection: "row", 
    alignItems: "center" 
  },
  title: { 
    fontSize: 32, 
    textAlign: 'center' 
  },
  switch: { 
    marginLeft: 10 
  },
  image: { 
    width: 20, 
    height: 20, 
    marginLeft: 10
  }
});