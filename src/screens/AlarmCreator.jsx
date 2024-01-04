import { View, Text, StyleSheet, ScrollView} from 'react-native';
import CustomSquareButton2 from '../components/buttons/CustomSquareButton2';
import React, { useState, useEffect } from 'react';
import { Database } from '../../api/Database';
import { formatNumber } from '../../api/Utils';

const AlarmCreator = ({ navigation }) => {
    const [hour, setHour] = useState(new Date().getHours() % 12);
    const [minute, setMinute] = useState(new Date().getMinutes());
    const [isAM, setIsAM] = useState(new Date().getHours() < 12);

    const [hoursArray, setHoursArray] = useState(Array.from({ length: 12 }, (_, i) => (new Date().getHours() + i) % 12));
    const [minutesArray, setMinutesArray] = useState(Array.from({ length: 60 }, (_, i) => i));

    useEffect(() => {
        const currentHour = new Date().getHours() % 12;
        const currentMinute = new Date().getMinutes();
        const isAMNow = new Date().getHours() < 12;
    
        setHour(currentHour);
        setMinute(currentMinute);
        setIsAM(isAMNow);
    
        console.log(`Hour: ${currentHour}, Minute: ${currentMinute}, isAM: ${isAMNow}`);
    }, []);

    useEffect(() => {
        const currentMinute = new Date().getMinutes();
        const updatedMinutesArray = Array.from({ length: 60 }, (_, i) => (currentMinute + i) % 60);
        setMinutesArray(updatedMinutesArray);
    }, []);
    const handleHourScroll = (event) => {
        const { contentOffset } = event.nativeEvent;
        const newHour = Math.floor((contentOffset.y / 60) % 12);
        setHour(newHour < 0 ? 11 : newHour);
    
        console.log(`New Hour: ${newHour}`);
    };
    
    const handleMinuteScroll = (event) => {
        const { contentOffset } = event.nativeEvent;
        const newMinute = Math.floor((contentOffset.y / 60) % 60);
        setMinute(newMinute < 0 ? 59 : newMinute);
    
        console.log(`New Minute: ${newMinute}`);
    };

    const handleAMPM = () => {
        setIsAM(!isAM);
    };

    const addAlarm = () => {
        // Tạo đối tượng alarm mới
        const newAlarm = { id: 0, hour: hour, minute: minute, active: false };
        
        // Thêm đối tượng alarm vào cơ sở dữ liệu (giả sử hàm Database.add() nhận vào một đối tượng alarm)
        Database.add(newAlarm);
    
        // Điều hướng ngược lại sau khi thêm alarm
        navigation.goBack();
    };
    return (
        <View style={styles.container}>
            <View style={styles.clockFrame}>
            <ScrollView
                onScroll={handleHourScroll}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.hourScrollContainer}
            >
                {hoursArray.map((hour, index) => (
                    <Text key={index} style={styles.clockText}>
                        {hour}
                    </Text>
                ))}
            </ScrollView>

            <Text style={styles.colonText}>:</Text>

            <ScrollView
                onScroll={handleMinuteScroll}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.minuteScrollContainer}
            >
                {minutesArray.map((minute, index) => (
                    <Text key={index} style={styles.clockText}>
                        {minute < 10 ? `0${minute}` : minute}
                    </Text>
                ))}
            </ScrollView>
            </View>

            <View style={styles.buttonsContainer}>
            <View style={styles.ampmButtons}>
                <CustomSquareButton2
                    title={"AM"}
                    onPress={() => setIsAM('AM')}
                    btnstylesheet={{ backgroundColor: isAM === 'AM' ? '#83c5be' : '#fafafa' }}
                    textstylesheet={{ color: isAM === 'AM' ? 'white' : '#00000060' }}
                />
                <CustomSquareButton2
                    title={"PM"}
                    onPress={() => setIsAM('PM')}
                    btnstylesheet={{ backgroundColor: isAM === 'PM' ? '#83c5be' : '#fafafa' }}
                    textstylesheet={{ color: isAM === 'PM' ? 'white' : '#00000060' }}
                />
            </View>
        
            <View style={styles.buttons}>
                <CustomSquareButton2 title={"Cancel"} onPress={() => navigation.goBack()} btnstylesheet={{ backgroundColor: '#fafafa' }} textstylesheet={{ color: '#00000060' }} />
                <CustomSquareButton2 title={"Add new"} onPress={() => addAlarm()} btnstylesheet={{ backgroundColor: '#83c5be' }} textstylesheet={{ color: 'white' }} />
            </View>
        </View>
        </View>
    );
};

export default AlarmCreator;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f2f5',
    },
    clockContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    hourScrollContainer: {
        flexGrow: 1,
        alignItems: 'center',
    },
    minuteScrollContainer: {
        flexGrow: 1,
        alignItems: 'center',
    },
    clockText: {
        fontSize: 50,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    colonText: {
        fontSize: 50,
        marginHorizontal: 10,
    },
    buttons: { 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginTop: 50,
        marginBottom: 50, 
        width: '100%'
    },
    ampmButtons: { 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginTop: 10, 
        width: '65%'
    },
    clockFrame: {
        flexDirection: 'row',
        width: 250,
        height: 100,
        overflow: 'hidden',
        marginBottom: 20,
    },
    buttonsContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
    },
    
});