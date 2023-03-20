import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useMemo, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import WeatherListItem from "../components/WeatherListItem";
import { Entypo } from '@expo/vector-icons';
import { useSelector } from "react-redux";


export default function WeatherTimelineScreen({ navigation, route }) {
  const { weatherData } = useSelector((state) => state.weatherAppReducer);

  const [data, setData] = useState(weatherData[route.params.date]);
  const [date, setDate] = useState(route.params.date);
  
  const prevAndNextDate = useMemo(() => {
    const currDate = new Date(date);
    const prevDate = new Date(currDate.setDate(currDate.getDate() - 1)).toDateString();
    const nextDate = new Date(currDate.setDate(currDate.getDate() + 2)).toDateString();
    return { prevDate, nextDate };
  }, [date]);

 
  const handleDateChange = (newData, newDate) => {
    setData(newData);
    setDate(newDate);
  };

  return (
    <View style={styles.container}>
      {weatherData[prevAndNextDate.prevDate] && (
        <TouchableOpacity onPress={() => handleDateChange(weatherData[prevAndNextDate.prevDate], prevAndNextDate.prevDate)} style={styles.leftPaginationIcon}>
          <Entypo name="chevron-thin-left" size={wp("10%")} color="#dee1e6" />
        </TouchableOpacity>
      )}

      {weatherData[prevAndNextDate.nextDate] && (
        <TouchableOpacity onPress={() => handleDateChange(weatherData[prevAndNextDate.nextDate], prevAndNextDate.nextDate)} style={styles.rightPaginationIcon}>
          <Entypo name="chevron-thin-right" size={wp("10%")} color="#dee1e6" />
        </TouchableOpacity>
      )}

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="leftcircle" size={hp("6%")} color="grey" />
        </TouchableOpacity>
        <Text style={styles.headerTxt}>{date}</Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item, index) => `${item.id}_${index}`}
        renderItem={({ item }) => <WeatherListItem item={item} />}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    marginVertical: hp("2%"),
    marginHorizontal: wp("2%"),
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    textAlign: "center",
  },
  headerTxt: {
    fontSize: hp("3%"),
    marginHorizontal: wp("3%"),
    fontWeight: "700",
  },
  leftPaginationIcon:{
    position:"absolute",
    left:wp("2%"),
    top:hp("47%"),
    zIndex:1

  },
  rightPaginationIcon:{
    position:"absolute",
    right:wp("2%"),
    top:hp("47%"),
    zIndex:1
  },
});