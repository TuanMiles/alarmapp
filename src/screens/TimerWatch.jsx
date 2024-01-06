import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  Platform
} from "react-native";

import { Picker } from "@react-native-picker/picker";

const screen = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#b8dedc",
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    borderWidth: 10,
    borderColor: "#e29578",
    width: screen.width / 2,
    height: screen.width / 2,
    borderRadius: screen.width / 2,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30
  },
  buttonStop: {
    borderColor: "#FF851B"
  },
  buttonText: {
    fontSize: 45,
    color: "#edf6f9"
  },
  buttonTextStop: {
    color: "#FF851B"
  },
  timerText: {
    color: "#fff",
    fontSize: 90
  },
  picker: {
    flex: 1,
    maxWidth: 100,
    ...Platform.select({
      android: {
        color: "#fff",
        backgroundColor: "rgba(92, 92, 92, 0.206)"
      }
    })
  },
  pickerItem: {
    color: "#fff",
    fontSize: 18,
    ...Platform.select({
      android: {
        marginLeft: 10,
        marginRight: 10
      }
    })
  },
  pickerContainer: {
    flexDirection: "column",
    alignItems: "center"
  },
  mnrow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 220,
  },
  pickerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 220,
  },
  record: {
    color: "#fff",
    fontSize: 20,
    marginTop: 20,
    marginBottom: 20
  },

});

const formatNumber = (number) => `0${number}`.slice(-2);

const getRemaining = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;
  return { minutes: formatNumber(minutes), seconds: formatNumber(seconds) };
};

const createArray = (length) => {
  const arr = [];
  let i = 0;
  while (i < length) {
    arr.push(i.toString());
    i += 1;
  }
  return arr;
};

const AVAILABLE_MINUTES = createArray(10);
const AVAILABLE_SECONDS = createArray(60);

const TimerWatch = () => {
  const [remainingSeconds, setRemainingSeconds] = useState(5);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedMinutes, setSelectedMinutes] = useState("0");
  const [selectedSeconds, setSelectedSeconds] = useState("5");
  const [stoppedSec, setStoppedSec] = useState("0");

  let interval = null;

  useEffect(() => {
    if (remainingSeconds === 0 && isRunning) {
      stop();
    }
  }, [remainingSeconds, isRunning]);

  const start = () => {
    setRemainingSeconds(
      parseInt(selectedMinutes, 10) * 60 + parseInt(selectedSeconds, 30)
    );
    setIsRunning(true);
    interval = setInterval(() => {
      setRemainingSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);
  };

  const stop = () => {
    clearInterval(interval);
    interval = null;
    setRemainingSeconds(8);
    setIsRunning(false);
    setStoppedSec(remainingSeconds);
  };

  const renderPickers = () => (
    <View style={styles.pickerContainer}>

      <View style={styles.mnrow}>
      <Text style={styles.pickerItem}>minutes</Text>
      <Text style={styles.pickerItem}>seconds</Text>

      </View>
   
    <View style={styles.pickerRow}>
       <Picker
         style={styles.picker}
         itemStyle={styles.pickerItem}
         selectedValue={selectedMinutes}
         onValueChange={(itemValue) => setSelectedMinutes(itemValue)}
         mode="dropdown"
       >
         {AVAILABLE_MINUTES.map((value) => (
           <Picker.Item key={value} label={value} value={value} />
         ))}
       </Picker>
  
       <Picker
         style={styles.picker}
         itemStyle={styles.pickerItem}
         selectedValue={selectedSeconds}
         onValueChange={(itemValue) => setSelectedSeconds(itemValue)}
         mode="dropdown"
       >
         {AVAILABLE_SECONDS.map((value) => (
           <Picker.Item key={value} label={value} value={value} />
         ))}
       </Picker>
       </View>

    </View>
  );

  const { minutes, seconds } = getRemaining(remainingSeconds);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      {isRunning ? (
        <Text style={styles.timerText}>{`${minutes}:${seconds}`}</Text>
      ) : (
        renderPickers()
      )}
      {isRunning ? (
        <TouchableOpacity
          onPress={stop}
          style={[styles.button, styles.buttonStop]}
        >
          <Text style={[styles.buttonText, styles.buttonTextStop]}>Stop</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={start} style={styles.button}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.record}>Record: {stoppedSec} sec</Text>
    </View>
  );
};

export default TimerWatch;
