import { View, StyleSheet, Vibration } from 'react-native';
import React from 'react';
import { Picker } from '@react-native-picker/picker';

const TimeSelector = ({ setHour, setMinute }) => {
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const minutes = Array.from({ length: 60 }, (_, i) => i);

    const [selectedHour, setSelectedHour] = React.useState(hours[0]);
    const [selectedMinute, setSelectedMinute] = React.useState(minutes[0]);

    const onHourChange = (itemValue) => {
        setSelectedHour(itemValue);
        setHour(itemValue);
        Vibration.vibrate();
    };

    const onMinuteChange = (itemValue) => {
        setSelectedMinute(itemValue);
        setMinute(itemValue);
        Vibration.vibrate();
    };

    return (
        <View style={theme.container}>
            <View style={theme.pickerContainer}>
                <Picker
                    selectedValue={selectedHour}
                    onValueChange={onHourChange}
                    style={theme.picker}
                    itemStyle={theme.pickerItem}
                >
                    {hours.map((item) => (
                        <Picker.Item key={item} label={`${item} hrs`} value={item} />
                    ))}
                </Picker>

                <Picker
                    selectedValue={selectedMinute}
                    onValueChange={onMinuteChange}
                    style={theme.picker}
                    itemStyle={theme.pickerItem}
                >
                    {minutes.map((item) => (
                        <Picker.Item key={item} label={`${item} min`} value={item} />
                    ))}
                </Picker>
            </View>
        </View>
    );
};

export default TimeSelector;

const theme = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    pickerContainer: { flexDirection: 'row', justifyContent: 'space-between' },
    picker: { width: 100, height: 180 },
    pickerItem: { height: 180 }
});