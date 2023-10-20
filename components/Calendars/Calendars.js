import React, {useState} from 'react';
import {View, StyleSheet, Text, SafeAreaView} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';

LocaleConfig.locales['ko'] = {
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
  dayNames: ['월', '화', '수', '목', '금', '토', '일'],
  dayNamesShort: ['월', '화', '수', '목', '금', '토', '일'],
  today: '오늘',
};

LocaleConfig.defaultLocale = 'ko';

const Calendars = () => {
  const [isStartDatePicked, setIsStartDatePicked] = useState(false);
  const [isEndDatePicked, setIsEndDatePicked] = useState(false);
  const [markedDates, setMarkedDates] = useState({});

  const [startDay, setStartDay] = useState('');
  const [endDay, setEndDay] = useState('');
  const [period, setPeriod] = useState([]);

  const onDayPress = day => {
    // 처음 선택하거나 시작일과 종료일이 함께 선택이 된 경우
    if (!isStartDatePicked || (isStartDatePicked && isEndDatePicked)) {
      setupStartAndEndDate(day.dateString);
      // 시작일이 선택되고 종료일이 선택되지 않았다면
    } else if (!isEndDatePicked) {
      let [mMarkedDates, startDate] = setupEndDate(day.dateString);
      if (startDate) {
        //시작 종료 객체 , 시작일 , 종료일
        setupPeriod(mMarkedDates, startDate, day.dateString);
      }
      setPeriod(Object.keys(mMarkedDates));
    }
  };

  // markedDates={{
  //   '2012-03-01': {selected: true, marked: true, selectedColor: 'blue'},
  //   '2012-03-02': {marked: true},
  //   '2012-03-03': {selected: true, marked: true, selectedColor: 'blue'}
  // }}

  const setupStartAndEndDate = date => {
    // 시작일이 선택됨
    setIsStartDatePicked(true);
    // 종료일은 선택안됨
    setIsEndDatePicked(false);

    setMarkedDates({
      // 시작일 객체를 생성
      [date]: {startingDay: true, color: '#262626', textColor: 'white'},
    });
    setStartDay(date);
  };

  const setupEndDate = date => {
    setIsEndDatePicked(true);
    setEndDay(date);

    let startDate = Object.keys(markedDates).find(
      key => markedDates[key].startingDay === true,
    );

    let mMarkedDates = {...markedDates};
    // 종료일을 키값으로 가지는 종료일 객체를 생성
    mMarkedDates[date] = {
      endingDay: true,
      color: '#262626',
      textColor: 'white',
    };

    console.log('mMarkedDates', mMarkedDates);
    // mMarkedDates는 시작일과 종료일 객체가 입력된 상태
    // startDate는 스트링화된 시작일을 반환
    return [mMarkedDates, startDate];
  };

  const setupPeriod = (mMarkedDates, startDate, endDate) => {
    let startDt = Date.parse(startDate); //시작일 밀리초 단위의 숫자를 반환
    let endDt = Date.parse(endDate);
    let curDate = startDt;

    while (curDate <= endDt) {
      // ISO 8601 형태로 날짜를 나타낸 다음 T를 기준으로 배열로 쪼개고 첫번째 값을 가져온다.
      let curDayString = new Date(curDate).toISOString().split('T')[0];
      console.log('curDate', new Date(curDate));
      console.log('curDayString', curDayString);

      // 키값이 없다면
      if (!mMarkedDates[curDayString]) {
        mMarkedDates[curDayString] = {color: '#262626', textColor: 'white'};
      }

      // curDate값을 하루만큼 증가
      curDate += 24 * 60 * 60 * 1000;
    }

    setMarkedDates(mMarkedDates);
  };

  return (
    <View>
      <Calendar
        style={{
          borderWidth: 1,
          borderColor: 'gray',
          height: 320,
          backgroundColor: 'white',
        }}
        theme={{
          backgroundColor: '#ffffff',
          calendarBackground: '#ffffff',
          textSectionTitleColor: 'red',
          selectedDayBackgroundColor: '#00adf5',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#00adf5',
          dayTextColor: '#2d4150',
          textDisabledColor: '#d9e',
        }}
        markingType="period"
        // markingType="dot"
        markedDates={markedDates}
        onDayPress={onDayPress}
      />
      <Text>시작일 : {startDay}</Text>
      <Text>종료일 : {endDay}</Text>
      <View>
        {period.map(date => (
          <Text key={date}>기 간 : {date}</Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
  },
});

export default Calendars;
