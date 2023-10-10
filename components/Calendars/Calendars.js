import {Button, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {format} from 'date-fns';
import moment from 'moment';
import {Calendar, LocaleConfig} from 'react-native-calendars';

LocaleConfig.locales['fr'] = {
  monthNames: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],

  monthNamesShort: [
    'Janv.',
    'Févr.',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juil.',
    'Août',
    'Sept.',
    'Oct.',
    'Nov.',
    'Déc.',
  ],
  dayNames: [
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
    '일요일',
  ],
  dayNamesShort: ['월', '화', '수', '목', '금', '토', '일'],
  today: "Aujourd'hui",
};

LocaleConfig.defaultLocale = 'fr';

const Calendars = () => {
  const [selectedDates, setSelectedDates] = useState({});
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleDateSelect = date => {
    const newSelectedDates = {...selectedDates};

    if (!startDate) {
      // 시작 날짜 선택
      newSelectedDates[date.dateString] = {
        startingDay: true,
        color: 'blue',
        textColor: 'white',
      };
      setSelectedDates(newSelectedDates);
      setStartDate(date.dateString);
    } else if (!endDate) {
      // 종료 날짜 선택
      newSelectedDates[date.dateString] = {
        endingDay: true,
        color: 'blue',
        textColor: 'white',
      };
      setSelectedDates(newSelectedDates);
      setEndDate(date.dateString);

      // 시작 날짜와 종료 날짜 사이의 모든 날짜 선택
      const currentDate = new Date(startDate);
      while (currentDate <= new Date(date.dateString)) {
        const dateString = currentDate.toISOString().split('T')[0];
        newSelectedDates[dateString] = {
          selected: true,
          color: 'blue',
          textColor: 'white',
        };
        currentDate.setDate(currentDate.getDate() + 1);
      }
      setSelectedDates(newSelectedDates);
    } else {
      // 이미 시작 날짜와 종료 날짜를 선택한 경우 초기화하고 다시 선택
      const clearedDates = {
        [date.dateString]: {
          startingDay: true,
          color: 'blue',
          textColor: 'white',
        },
      };
      setSelectedDates(clearedDates);
      setStartDate(date.dateString);
      setEndDate(null);
    }
  };

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={handleDateSelect}
        markingType={'period'}
        markedDates={selectedDates}
      />
    </View>
  );
};

export default Calendars;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 50,
  },
});
