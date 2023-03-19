import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
  import { Feather } from "@expo/vector-icons";
import { useSelector } from 'react-redux';
import { useNavigation } from "@react-navigation/native";




export default function DateContainer({item}) {
  const { weatherData } = useSelector(
    (state) => state.weatherAppReducer
  );
  const navigation=useNavigation()


const fullDayWeatherDetails=weatherData[item].map((i)=>{

  return {data:item,...i.main,...i.weather[0]} 

})

const overallWeatherCondition= fullDayWeatherDetails.reduce((arr,curr)=>{

if(curr.temp>arr.maxTemp){

  arr.maxTemp=curr.temp
}


if(curr.temp<arr.minTemp){

  arr.minTemp=curr.temp
}
arr.totalTemp+=curr.temp

if(arr.iconList[curr.icon]){
  arr.iconList[curr.icon]++
}else {
  arr.iconList[curr.icon] = 1;
}
arr.length++

return arr

},{maxTemp:0,minTemp:1000,totalTemp:0,iconList:{},length:0})

const maxOccurrenceIconNumber = Math.max(...Object.values(overallWeatherCondition.iconList));
const mostOccurringicon = (Object.keys(overallWeatherCondition.iconList).find(key => overallWeatherCondition.iconList[key] === maxOccurrenceIconNumber));



if((item ===(new Date()).toDateString() )){
  return <></>
}



  return (
    
          <TouchableOpacity onPress={()=>navigation.navigate("WeatherTimelineScreen",{data:weatherData[item]})} style={styles.datesWeatherContainer}>
            <Text style={styles.smallDateTxt}>{item.slice(4,10)}</Text>
    
            <View style={styles.MainIcon}>
            <Image style={{width:hp("6%"),height:hp("6%")}} source={{uri: `https://openweathermap.org/img/wn/${mostOccurringicon}@2x.png`}}/>
            </View>
    
            <Text style={styles.smallWeatherTempTxt}>{(overallWeatherCondition.totalTemp/overallWeatherCondition.length).toFixed(0)}°</Text>
    
            <View style={styles.smallMinMaxTempTxtContainer}>
              <Text style={styles.smallMinMaxTempTxt}>{parseInt(overallWeatherCondition.minTemp)}°</Text>
              <Text style={styles.smallMinMaxTempTxt}>{parseInt(overallWeatherCondition.maxTemp)}°</Text>
            </View>
          </TouchableOpacity>
       
  )
}

const styles = StyleSheet.create({

    datesWeatherContainer: {
        backgroundColor: "white",
        width: wp("20%"),
        height: hp("24%"),
        borderRadius: hp("2%"),
        marginHorizontal: wp("1.5%"),
        justifyContent: "space-between",
        paddingBottom: hp("1.5%"),
        // paddingTop:hp("1.5%")
      },
      smallWeatherTempTxt: {
        fontSize: hp("3%"),
        fontWeight: "800",
        textAlign: "center",
      },
      smallMinMaxTempTxtContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: wp("1.5%"),
      },
      smallMinMaxTempTxt: {
        fontSize: hp("1.5%"),
        // color:""
      },
      smallDateTxt: {
        color: "#2987c2",
        marginHorizontal: wp("5%"),
        fontSize: hp("2%"),
        fontWeight: "500",
        paddingVertical: hp("2%"),
        textAlign: "center",
      },
      MainIcon: {
        alignItems: "center",
      },


})