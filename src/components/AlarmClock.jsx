import { View, Text, Switch, Image, StyleSheet, Animated, TouchableOpacity, Dimensions, Vibration, Alert } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { formatNumber } from '../../api/Utils';
import DaySelector from './DaySelector';
import { colors } from '../../api/ColorPallete';
import { Audio } from 'expo-av';

const AlarmClock = ({ id, hour, minute, active, remove }) => {
  const [isVibration, setIsVibration] = useState(true);
  const [isMusic, setIsMusic] = useState(false);

  const screenHeight = Dimensions.get("window").height;
  const expansionHeight = useRef(new Animated.Value(screenHeight / 8)).current;

  const [days, setDays] = useState([{ id: 0, name: 'Monday' }, { id: 1, name: 'Tuesday' }, { id: 2, name: 'Wednesday' }, { id: 3, name: 'Thursday' }, { id: 4, name: 'Friday' }, { id: 5, name: 'Saturday' }, { id: 6, name: 'Sunday' }]);
  const [selectedDays, setSelectedDays] = useState([]);

  const [sound, setSound] = useState();
  let audioPlaying = false;
  let vibrationPlaying = false;
  const [stopped, setStopped] = useState(false);

  const selectDaySelector = (id, name) => {
    setSelectedDays(prevState => [...prevState, { id, name }]);
  };

  const removeDaySelector = (id) => {
    setSelectedDays(selectedDays.filter(day => day.id !== id));
  };

  const checkAlarm = () => {
    const currentHour = new Date().getHours();
    const currentMinute = new Date().getMinutes();
    console.log('see')
    console.log(currentHour, currentMinute)
    console.log(hour, minute)

    if (currentHour == hour && currentMinute == minute) {
      console.log('match')
     
      if (isVibration && !vibrationPlaying) {
        const pattern = [0.5 * 1000, 1 * 1000, 0.5 * 1000];
        Vibration.vibrate(pattern, true);
      }

      if (isMusic && !audioPlaying) {
        playSound();
      }
    }
    else {
      console.log('no match')
    }
  };



  const toggleMusic = () => {
    setIsMusic(!isMusic);
    if (isMusic && audioPlaying) {
      stopSound();
    }
  };

  const currentHour = new Date().getHours();
  const currentMinute = new Date().getMinutes();
  console.log(currentHour, currentMinute)

  useEffect(() => {
    if (!stopped){
    const interval = setInterval(checkAlarm, 7000);
    return () => clearInterval(interval);
    }
  }, [isMusic, isVibration, hour, minute]);

  const playSound = async () => {
    if (!audioPlaying && !stopped) {
      audioPlaying = true;
      console.log('Loading Sound');
      const { sound } = await Audio.Sound.createAsync(require('../../assets/alarmsound.mp3'));
      setSound(sound);

      console.log('Playing Sound');
      await sound.playAsync();
    }
    if (!stopped) {
      Alert.alert(
        'Alarm',
        'Wake up!',
        [
          {
            text: 'Snooze',
            onPress: () => {
              setStopped(true);
              console.log(stopped);
              stopVibrationAndSound();
              vibrationPlaying = true;
            },
          },
          {
            text: 'Dismiss',
            style: 'cancel', 
          },
        ],
        { cancelable: false }
      );
    }

 
  };


  const stopSound = async () => {
    if (sound) {
      await sound.pauseAsync();
      setSound(undefined);
      audioPlaying = false;
    }
  };

  const stopVibrationAndSound = () => {
    Vibration.cancel();
    stopSound();
  };

  useEffect(() => {
      stopVibrationAndSound();
  }, [stopped, active]);



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
  container: {
    flex: 1,
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