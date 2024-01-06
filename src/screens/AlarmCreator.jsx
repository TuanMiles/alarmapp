import { View, Text, StyleSheet } from 'react-native';
import CustomSquareButton2 from '../components/buttons/CustomSquareButton2';
import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { Database } from '../../api/Database';
import { formatNumber } from '../../api/Utils';
import ScrollPicker from "react-native-wheel-scrollview-picker";

const AlarmCreator = ({ navigation }) => {
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const minutes = Array.from({ length: 60 }, (_, i) => i);

    const [hour, setHour] = useState(new Date().getHours());
    const [minute, setMinute] = useState(new Date().getMinutes());
    const formatNumber = (number) => number.toString().padStart(2, '0');

    const addAlarm = () => {
        const newAlarm = { id: 0, hour: hour, minute: minute, active: false }
        navigation.goBack();
        Database.add(newAlarm.hour, newAlarm.minute, newAlarm.active ? 1 : 0)
        console.log(`added a new alarm at ${newAlarm.hour}:${newAlarm.minute}`)
    };

    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();


    return (
        <View style={theme.container}>
         <View style={theme.hourmin}>
                   <Text style={theme.hmi}>Hour</Text>
                   <Text style={theme.hmi}>Minute</Text>
         </View>
            <View style={theme.selectorRow}>
        
                <ScrollPicker
                    dataSource={hours}
                    selectedIndex={currentHour}
                    onValueChange={(itemValue) => setHour(itemValue)}
                    wrapperHeight={180}
                    wrapperBackground="#FFFFFF"
                    itemHeight={60}
                    highlightColor="#d8d8d8"
                    highlightBorderWidth={2}
                    style={theme.picker}
                />

                <ScrollPicker
                    dataSource={minutes}
                    selectedIndex={currentMinute}
                    onValueChange={(itemValue) => setMinute(itemValue)}
                    wrapperHeight={180}
                    wrapperBackground="#FFFFFF"
                    itemHeight={60}
                    highlightColor="#d8d8d8"
                    highlightBorderWidth={2}
                    style={theme.picker}
                />
            </View>

            <View style={theme.buttons}>
                <View style={theme.buttons}>
                    <CustomSquareButton2 title={"Cancel"} onPress={() => navigation.goBack()} btnstylesheet={{ backgroundColor: '#fafafa' }} textstylesheet={{ color: '#00000060' }} />
                    <CustomSquareButton2 title={"Add new"} onPress={() => addAlarm()} btnstylesheet={{ backgroundColor: '#83c5be' }} textstylesheet={{ color: 'white' }} />
                </View>
            </View>
        </View>
    );
};

export default AlarmCreator;

const theme = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f0f2f5', justifyContent: 'center', alignItems: 'center' },
    selectorRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
    timeDisplay: { width: 150, alignItems: 'center' },
    timeText: { fontSize: 48, color: '#42999b', fontWeight: 'bold' },
    picker: { height: 40, borderWidth: 1, fontSize: 100, borderColor: '#42999b', alignItems: 'flex-start', borderRadius: 20}, // Adjust the style as needed
    buttons: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 150, width: '100%' },
    hourmin: {display: 'flex', color: '#42999b', width: 240, flexDirection: 'row', justifyContent: 'space-between', fontWeight: 'bold', marginBottom: 10},
    hmi: {color: '#42999b', fontWeight: 'bold'}
    // Additional styles
});
