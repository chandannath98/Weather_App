import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import WeatherListItem from "../components/WeatherListItem";
import { Entypo } from '@expo/vector-icons';
import { useSelector } from "react-redux";
import { MenuView } from '@react-native-menu/menu';


export default function WeatherTimelineScreen({ navigation, route }) {

  const { weatherData } = useSelector(
    (state) => state.weatherAppReducer
  );


const [data, setData] = useState(route.params.data);
const [date, setDate] = useState(route.params.date);


 const currDate= (new Date(date)).getDate()
  
 const prevDate=(new Date((new Date(date)).setDate(currDate-1))).toDateString()

 const nextDate=(new Date((new Date(date)).setDate(currDate+1))).toDateString()


  return (
    <View style={styles.container}>


{weatherData[prevDate] &&
      <TouchableOpacity 
      onPress={()=>{
        setData(weatherData[prevDate])
        setDate(prevDate)
        }} 
      style={styles.leftPaginationIcon} >
<Entypo name="chevron-thin-left" size={wp("10%")} color="#dee1e6" />
</TouchableOpacity>

}

{weatherData[nextDate] &&
<TouchableOpacity
 style={styles.rightPaginationIcon} 
onPress={()=>{
  setData(weatherData[nextDate])
  setDate(nextDate)
  }} 
>

<Entypo name="chevron-thin-right" size={wp("10%")} color="#dee1e6" />

</TouchableOpacity>
}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="leftcircle" size={hp("6%")} color="grey" />
        </TouchableOpacity>
        <Text style={styles.headerTxt}>{date}</Text>
      </View>

      <FlatList
        data={data}
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
