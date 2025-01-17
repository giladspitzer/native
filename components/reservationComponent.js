import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Switch, Button, Alert, Platform } from 'react-native';
import { Card } from 'react-native-elements';
import DatePicker from 'react-native-datepicker'
import { Picker} from '@react-native-community/picker'
import * as Animatable from 'react-native-animatable';
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';
import * as Calendar from 'expo-calendar';



  
class Reservation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            guests: 1,
            smoking: false,
            date: '',
        }
    }

    async obtainNotificationPermission() {
        let permission = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        while(permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        }
        let permission_r = await Permissions.getAsync(Permissions.REMINDERS);
        while(permission_r.status !== 'granted') {
            permission_r = await Permissions.askAsync(Permissions.REMINDERS);
        }
        return permission;
    }

    async presentLocalNotification(date) {
        await this.obtainNotificationPermission();
        Notifications.scheduleNotificationAsync({
            content: {
                title: 'Your Reservation',
                body: 'Reservation for '+ date + ' requested',
            },
            ios: {
                sound: true
            },
            android: {
                sound: true,
                vibrate: true,
                color: '#512DA8'
            },
            trigger: null

        })
        // Notifications.presentNotificationAsync({
        //     title: 'Your Reservation',
        //     body: 'Reservation for '+ date + ' requested',
        //     ios: {
        //         sound: true
        //     },
        //     android: {
        //         sound: true,
        //         vibrate: true,
        //         color: '#512DA8'
        //     }
        // });
    }

    

    async getDefaultCalendarSource() {
        const calendars = await Calendar.getCalendarsAsync();
        const defaultCalendars = calendars.filter(each => each.source.name === 'Default');
        if(defaultCalendars.length > 0){
            return defaultCalendars[0].id.toString();
        }else{
            return calendars.filter(each => each.allowsModifications === true)[0].id.toString();
        }
      }

    async obtainCalendarPermission(){
        let permission = await Permissions.getAsync(Permissions.CALENDAR);
        if (permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.CALENDAR);
            if (permission.status !== 'granted') {
                Alert.alert('Permission not granted to access calendar');
            }
        }
        return permission;
    }

    async addReservationToCalendar(){
        await this.obtainCalendarPermission();
        var start = Date.parse(this.state.date)
        var end = Date.parse(this.state.date) + (2*60*60*1000)
        Calendar.createEventAsync(
            await this.getDefaultCalendarSource(),
            {
                title: 'Con Fusion Table Reservation', 
                endDate: end,
                startDate: start,
                timeZone: 'Asia/Hong_Kong',
                location: '121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong'
            }
            
        )
        this.resetForm()
    }

    handleReservation() {
        Alert.alert(
            'Your Reservation OK?',
            'Number of Guests: ' + this.state.guests + '\nSmoking? ' + this.state.smoking + '\nDate and Time: ' + this.state.date,
            [
            {text: 'Cancel', onPress: () => this.resetForm(), style: 'cancel'},
            {text: 'OK', onPress: () => {
                this.presentLocalNotification(this.state.date)
                this.addReservationToCalendar()
            } },
            ],
            { cancelable: false }
        );
    }

    async resetForm() {
        this.setState({
            guests: 1,
            smoking: false,
            date: '',
            showModal: false
        });
    }

    render() {
        return(
            <ScrollView>
             <Animatable.View animation="zoomIn" duration={1000}>
                <View style={styles.formRow}>
                <Text style={styles.formLabel}>Number of Guests</Text>
                <Picker
                    style={styles.formItem}
                    selectedValue={this.state.guests}
                    onValueChange={(itemValue, itemIndex) => this.setState({guests: itemValue})}>
                    <Picker.Item label="1" value="1" />
                    <Picker.Item label="2" value="2" />
                    <Picker.Item label="3" value="3" />
                    <Picker.Item label="4" value="4" />
                    <Picker.Item label="5" value="5" />
                    <Picker.Item label="6" value="6" />
                </Picker>
                </View>
                <View style={styles.formRow}>
                <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
                <Switch
                    style={styles.formItem}
                    value={this.state.smoking}
                    onTintColor='#512DA8'
                    onValueChange={(value) => this.setState({smoking: value})}>
                </Switch>
                </View>
                <View style={styles.formRow}>
                <Text style={styles.formLabel}>Date and Time</Text>
                <DatePicker
                    style={{flex: 2, marginRight: 20}}
                    date={this.state.date}
                    format=''
                    mode="datetime"
                    placeholder="select date and Time"
                    minDate="2017-01-01"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                    dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                    },
                    dateInput: {
                        marginLeft: 36
                    }
                    // ... You can check the source to find the other keys. 
                    }}
                    onDateChange={(date) => {this.setState({date: date})}}
                />
                </View>
                <View style={styles.formRow}>
                <Button
                    onPress={() => this.handleReservation()}
                    title="Reserve"
                    color="#512DA8"
                    accessibilityLabel="Learn more about this purple button"
                    />
                </View>
            </Animatable.View>
            </ScrollView>
        );
    }

};

const styles = StyleSheet.create({
    formRow: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row',
      margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
     },
     modalTitle: {
         fontSize: 24,
         fontWeight: 'bold',
         backgroundColor: '#512DA8',
         textAlign: 'center',
         color: 'white',
         marginBottom: 20
     },
     modalText: {
         fontSize: 18,
         margin: 10
     }
});

export default Reservation;