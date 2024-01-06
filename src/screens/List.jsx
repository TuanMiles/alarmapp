import { View, Text, ScrollView, StyleSheet, Button, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native'
import CustomSquareButton from '../components/buttons/CustomSquareButton';
import AlarmClocksList from '../components/AlarmClocksList';
import { React, useEffect, useState } from 'react'
import { Database } from "../../api/Database";
import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5';

const List = ({ navigation }) => {

    const [alarms, setAlarms] = useState([])

    useEffect(() => {
        navigation.addListener('focus', () => {
            setAlarms([])
            Database.getAll().then((all) => {
                console.log(JSON.parse(all));

                const storedAlarms = JSON.parse(all)
                storedAlarms.rows._array.forEach(alarm => setAlarms(prevState => [...prevState, alarm]))
            });
        });
    }, []);



    const deleteAlarm = (id) => {
        setAlarms(() => alarms.filter(alarm => alarm.id !== id));
        Database.remove(id);
    };

    return (
        <View style={theme.container}>
            <ScrollView style={{ flexGrow: 1, width: '100%', height: '100%' }}>

                <AlarmClocksList alarms={alarms} remove={deleteAlarm} />

            </ScrollView>
            <View style={theme.button} >
                {/* <CustomSquareButton title={"Add alarm lock"} onPress={() => navigation.navigate('stopwatch')} /> */}
             <View style={theme.timerstop}>
                <CustomSquareButton title={"Add alarm clock"} onPress={() => navigation.navigate('creator')} />
                   <TouchableOpacity onPress={() => navigation.navigate('timer')} style={theme.tat}>
                   <FontAwesome5Icons  style={theme.text} name="hourglass" color={'#fff'} size={20} />

                     </TouchableOpacity>
                 <TouchableOpacity onPress={() => navigation.navigate('stopwatch')} style={theme.tat}>
                 <FontAwesome5Icons  style={theme.text} name="stopwatch" color={'#fff'} size={20} />
                 </TouchableOpacity>
             </View>
            </View >
        </View>
    )
}

const theme = StyleSheet.create({
    safeArea: { 
        flex: 1 
    },
    container: { 
        flex: 1, 
        flexDirection: 'column', 
        alignItems: 'center', 
        backgroundColor: '#edf6f9' 
    },
    panel: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    button: { 
        position: 'absolute', 
        bottom: 70, 
        bottom: 50,
        left: Dimensions.get('window').width / 2 - 160 
    },
    colors: { 
        black: '#000', 
        white: 'white' 
    },
    tat:{
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        width: 80,
        backgroundColor: '#83c5be',
        margin: 5,
    },
    timerstop:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    tatext:{
        fontSize: 14,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },

});

export default List;