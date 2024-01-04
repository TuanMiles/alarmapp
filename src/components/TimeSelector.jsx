import { View, ScrollView, TouchableOpacity, Text, StyleSheet, Vibration } from 'react-native';
import React, { useState } from 'react';

const TimeSelector = ({ setHour, setMinute }) => {
    const hours = Array.from({ length: 12 }, (_, i) => i + 1);
    const minutes = Array.from({ length: 60 }, (_, i) => i);

    const [selectedHour, setSelectedHour] = useState(hours[0]);
    const [selectedMinute, setSelectedMinute] = useState(minutes[0]);
    const [isMorning, setIsMorning] = useState(true); // Sáng hoặc tối

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

    const handleTimePeriod = (period) => {
        setIsMorning(period === 'morning');
    };

    return (
        <View style={styles.container}>
            <ScrollView horizontal>
                <View style={styles.timeContainer}>
                    {hours.map((item) => (
                        <TouchableOpacity
                            key={item}
                            onPress={() => onHourChange(item)}
                            style={[
                                styles.timeItem,
                                selectedHour === item && styles.selectedTimeItem,
                            ]}
                        >
                            <Text style={styles.timeText}>{`${item} hrs`}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

            <ScrollView horizontal>
                <View style={styles.timeContainer}>
                    {minutes.map((item) => (
                        <TouchableOpacity
                            key={item}
                            onPress={() => onMinuteChange(item)}
                            style={[
                                styles.timeItem,
                                selectedMinute === item && styles.selectedTimeItem,
                            ]}
                        >
                            <Text style={styles.timeText}>{`${item} min`}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

            <View style={styles.timePeriodContainer}>
                <TouchableOpacity
                    style={[
                        styles.timePeriodButton,
                        isMorning && styles.selectedTimePeriodButton,
                    ]}
                    onPress={() => handleTimePeriod('morning')}
                >
                    <Text style={styles.timePeriodText}>Morning</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.timePeriodButton,
                        !isMorning && styles.selectedTimePeriodButton,
                    ]}
                    onPress={() => handleTimePeriod('night')}
                >
                    <Text style={styles.timePeriodText}>Night</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default TimeSelector;

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    timeContainer: { 
        flexDirection: 'column', 
        marginVertical: 10 
    },
    timeItem: { 
        padding: 10, 
        margin: 5, 
        borderWidth: 1, 
        borderColor: 'black' 
    },
    selectedTimeItem: { 
        backgroundColor: 'blue' 
    },
    timeText: { 
        fontSize: 18 
    },
    timePeriodContainer: { 
        flexDirection: 'row', 
        justifyContent: 'center', 
        marginTop: 20 
    },
    timePeriodButton: { 
        paddingHorizontal: 20, 
        paddingVertical: 10, 
        marginHorizontal: 10, 
        borderWidth: 1, 
        borderColor: 'black' 
    },
    selectedTimePeriodButton: { 
        backgroundColor: 'blue' 
    },
    timePeriodText: { 
        fontSize: 18 
    },
});
