// import { StatusBar } from 'expo-status-bar';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import Router from './navigations/Router';
import { Store } from "./src/redux/store";

export default function App() {
  return (
    <View style={styles.container}>
      <Provider store={Store}>
 
      <Router />
      <StatusBar style="auto" />
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
});
