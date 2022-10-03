import { StyleSheet, View } from 'react-native';
import Calendar from './Calendar';

export default function App() {
  const dateInfo = {
    dates: [
      {
        date: 4,
        mood: 'sad',
      },
      {
        date: 1,
        mood: 'sad',
      },
      {
        date: 4,
        mood: 'happy',
      },
      {
        date: 6,
        mood: 'fair',
      },
      {
        date: 27,
        mood: 'sad',
      }
    ],
    month: 9,
    year: 2022,
  }
  
  return (
    <View style={styles.container}>
      <Calendar dateInfo={dateInfo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
