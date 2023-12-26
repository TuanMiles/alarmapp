import { View, Text, StyleSheet } from 'react-native';
import CustomSquareButton2 from '../components/buttons/CustomSquareButton2';
import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { Database } from '../../api/Database';
import { formatNumber } from '../../api/Utils';

const AlarmCreator = ({ navigation }) => {
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const minutes = Array.from({ length: 60 }, (_, i) => i);

    const [hour, setHour] = useState(new Date().getHours());
    const [minute, setMinute] = useState(new Date().getMinutes());

    const addAlarm = () => {
        const newAlarm = { id: 0, hour: hour, minute: minute, active: false }
        navigation.goBack();
        Database.add(newAlarm.hour, newAlarm.minute, newAlarm.active ? 1 : 0)
        console.log(`added a new alarm at ${newAlarm.hour}:${newAlarm.minute}`)
    };

    return (
        <View style={theme.container}>
            <View style={theme.selectorRow}>
                <Picker
                    selectedValue={hour}
                    onValueChange={(itemValue) => setHour(itemValue)}
                    style={theme.picker}
                    itemStyle={theme.pickerItem}
                >
                    {hours.map((item) => (
                        <Picker.Item key={item} label={`${item} hrs`} value={item} />
                    ))}
                </Picker>

                <View style={theme.timeDisplay}>
                    <Text style={theme.timeText}>{formatNumber(hour)}:{formatNumber(minute)}</Text>
                </View>

                <Picker
                    selectedValue={minute}
                    onValueChange={(itemValue) => setMinute(itemValue)}
                    style={theme.picker}
                    itemStyle={theme.pickerItem}
                >
                    {minutes.map((item) => (
                        <Picker.Item key={item} label={`${item} min`} value={item} />
                    ))}
                </Picker>
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
    picker: { width: 100, height: 180 },
    pickerItem: { height: 180 },
    buttons: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 150, width: '100%'},
    // Additional styles
});
