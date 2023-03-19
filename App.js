// import { StatusBar } from 'expo-status-bar';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import Router from './navigations/Router';

export default function App() {
  return (
    <View style={styles.container}>
      <Router />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
});
