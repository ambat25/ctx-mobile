import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  dateInfo: {
    month: number,
    year: number,
    dates: { date: number, mood: string }[]
  }
}

export default function Calendar({ dateInfo }: Props) {
  const [currentDate, setCurrentDate] = useState(-1)
  const [days, setDays] = useState([])
  const [daysMood, setDaysMood] = useState({})
  const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const years = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dateMood = {
    'sad': '😡',
    'happy': '😊',
    'fair': '🤢'
  }

  useEffect(() => {
    if (+dateInfo?.month <= 11 && +dateInfo.month >= 0) {
      const getDaysInMonth = () => {
        const month = dateInfo.month, year = dateInfo.year;
        var currentDate = new Date(year, month, 1);
        var computedDays = [];
  
        while (currentDate.getMonth() === month) {
          computedDays.push(weekday[currentDate.getDay()])
          currentDate.setDate(currentDate.getDate() + 1);
        }
        const padLength = (weekday.indexOf(computedDays[0]))
        const arrayPad = (Array(padLength).fill(''))
  
        setDays([...arrayPad, ...computedDays.map((_, i) => i + 1)]);
      }
  
      const datesWithEmoji = dateInfo.dates.reduce((acc, cur) => {
        return {
          ...acc,
          [cur.date]: dateMood[cur.mood]
        }
      }, {});
  
      const today = new Date();
      if (today.getMonth() === dateInfo.month && today.getFullYear() === dateInfo.year) {
        setCurrentDate(today.getDate());
      } else {
        setCurrentDate(-1);
      }
      setDaysMood(datesWithEmoji)
      getDaysInMonth();
    }
  }, [dateInfo])
  if (+dateInfo?.month > 11 || +dateInfo.month < 0){
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Invalid Date
        </Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {years[dateInfo.month]}, {dateInfo.year}
      </Text>

      <View style={styles.calender}>
        {weekday.map(wd => (
          <View style={styles.dateHeadingBox} key={wd}>
            <Text>
              {wd}
            </Text>
          </View>
        ))}
        {
          days.map((d, i) => (
            <View style={styles.dateBox} key={i}>
              <Text>
                {daysMood[d]}
              </Text>
              <Text style={currentDate === d ? styles.currentDate : null}>
                {d}
              </Text>
            </View>
          ))
        }
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 10,
    flexGrow: 1,
  },
  calender: {
    flex: 1,
    backgroundColor: '#fff',
    flexWrap: 'wrap',
    flexDirection: "row",
    flexGrow: 1,
  },
  title: {
    fontSize: 30,
    paddingVertical: 10
  },
  dateBox: {
    width: "14%",
    padding: 10,
  },
  dateHeadingBox: {
    width: "14%",
    padding: 10
  },
  currentDate: {
    fontWeight: "bold"
  }
});
