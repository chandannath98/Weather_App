import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { AntDesign } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import axios from "axios";
import { Entypo } from '@expo/vector-icons';
import DatesContainer from "../components/DateContainer"
import * as Location from 'expo-location';
import { useNavigation } from "@react-navigation/native";








export default function Home() {



  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState([])
  const [fiveDayForcast, setFiveDayForcast] = useState({})
  const [weatherSearchBy, setWeatherSearchBy] = useState("Current Location")
  const [cuurentLocationCordinate, setCuurentLocationCordinate] = useState({});

const navigation=useNavigation()



  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      console.log(currentLocation)
      setCuurentLocationCordinate(currentLocation);
    })();
  }, []);




async function getData(){
try{
let apiUrl
if(weatherSearchBy==="Current Location"){
  apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${cuurentLocationCordinate.coords.latitude}&lon=${cuurentLocationCordinate.coords.longitude}&units=metric&appid=b9ff75b356281a43047db7c105a5bfc9`;
  
}else{
  apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=b9ff75b356281a43047db7c105a5bfc9`;
}
   

// Fetch the weather data
fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    setWeatherData(data)
    console.log(data)
  })
  .catch(error => {
    console.log('An error occurred while fetching weather data:', error);
  });



}catch{
  console.log("error")
}
}




const fetchFiveDayForcast=async()=>{
try{
  let apiUrl
  if(weatherSearchBy==="Current Location"){
apiUrl=`https://api.openweathermap.org/data/2.5/forecast?lat=${cuurentLocationCordinate.coords?.latitude}&lon=${cuurentLocationCordinate.coords?.longitude}&units=metric&id=524901&appid=b9ff75b356281a43047db7c105a5bfc9`
  }else{
    apiUrl=`https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&id=524901&appid=b9ff75b356281a43047db7c105a5bfc9`
  }


 await fetch(apiUrl)
  .then(response => response.json())
  .then(data => {

 const tempData= data.list.reduce((arr,curr)=>{
const dt=(new Date(curr.dt*1000)).toDateString()
if(arr[dt]){
  arr[dt].push(curr)
}else{
  arr[dt]=[]
}
return arr

 },{})

setFiveDayForcast(tempData)

  })
  .catch(error => {
    console.log('An error occurred while fetching weather data:', error);
  });




}catch{
  console.log("error")
}
}




useEffect(() => {
  getData()
}, [cuurentLocationCordinate,weatherSearchBy])




useEffect(() => {
  fetchFiveDayForcast()
}, [cuurentLocationCordinate,weatherSearchBy])






  

  return (
    <View style={styles.container}>

<TouchableOpacity style={styles.leftPaginationIcon} >
<Entypo name="chevron-thin-left" size={wp("10%")} color="#dee1e6" />
</TouchableOpacity>

<TouchableOpacity style={styles.rightPaginationIcon} >
<Entypo name="chevron-thin-right" size={wp("10%")} color="#dee1e6" />
</TouchableOpacity>


      <View style={styles.locationSearchContainer}>
        
        <View style={styles.locationSearchInputBox}>
        <TouchableOpacity style={styles.searchBtn}>

          <EvilIcons name="location" size={hp("3%")} color="white" />
          </TouchableOpacity>
          <TextInput
            style={styles.searchInputStyle}
            placeholder="Search Location"
            value={location}
            onChangeText={setLocation}
          />
          <TouchableOpacity onPress={()=>{setWeatherSearchBy("Location Name"),getData(),fetchFiveDayForcast()}} style={styles.searchBtn}>
          <AntDesign name="search1" size={hp("3%")} color="white" />
        </TouchableOpacity>
        </View>

        
      </View>

      <Text style={styles.dateTxt}>{(new Date()).toDateString()}</Text>

      <View style={styles.weatherBox}>
        <Text style={styles.locationName}>{weatherData.name}, {weatherData.sys?.country}</Text>
        <Text style={styles.tempraature}> {(weatherData.main?weatherData.main.temp:0).toFixed(0)}°</Text>
        <Text style={styles.weatherStatus}>{weatherData.main?weatherData.weather[0].description:""}</Text>
      </View>

      <View style={styles.MainIcon}>
        
      {weatherData.weather?
        <Image style={{width:hp("15%"),height:hp("15%")}} source={{uri: `https://openweathermap.org/img/wn/${weatherData.weather[0]?.icon}@2x.png`}}/>:
        <></>}

      </View>

      <TouchableOpacity onPress={()=>navigation.navigate("WeatherTimelineScreen",{data:"19 Mar"})} style={styles.minMaxTempTxtContainer}>
        <Text style={styles.minMaxTempTxt} >Min - {weatherData.main?.temp_min}°C</Text>
        <Text style={styles.minMaxTempTxt} >Max - {weatherData.main?.temp_max}°C</Text>
      </TouchableOpacity> 

      <ScrollView contentContainerStyle={{alignItems: "center",paddingHorizontal:wp('3%')}} horizontal style={styles.bottomContainer}>
       
       {Object.keys(fiveDayForcast).map((item,index)=><DatesContainer key={index} item={item} fiveDayForcast={fiveDayForcast} />)}
        
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  weatherBox: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: hp("3%"),
    marginBottom: hp("1%"),
  },
  locationName: {
    color: "grey",
    fontSize: hp("2.5%"),
  },
  tempraature: {
    fontSize: hp("12%"),
    fontWeight: "700",
  },
  weatherStatus: {
    fontSize: hp("2.5%"),
  },
  locationSearchInputBox: {
    flexDirection: "row",
    width: wp("95%"),
    // padding: hp("2%"),
    backgroundColor: "#dee1e6",
    borderRadius: hp("10%"),
    alignItems: "center",
  },
  locationSearchContainer: {
    marginVertical: hp("2%"),
    marginHorizontal: wp("3%"),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  searchInputStyle: {
    fontSize: hp("2%"),
    marginHorizontal: wp("2%"),
    width: "65%",
  },
  searchBtn: {
    padding: hp("2%"),
    borderRadius: hp("15%"),
    backgroundColor: "#2987c2",
  },
  dateTxt: {
    color: "grey",
    marginHorizontal: wp("5%"),
    fontSize: hp("2%"),
    fontWeight: "500",
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
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#dee1e6",
    height: hp("31%"),
    width: "100%",
    borderTopLeftRadius: wp("5%"),
    borderTopRightRadius: wp("5%"),
    flexDirection: "row",
    
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
  minMaxTempTxtContainer:{
    alignSelf:"center",
    flexDirection:"row",
    textAlign:"center",
    justifyContent:"center",
    width:"50%",
    justifyContent:"space-between"
  },
  minMaxTempTxt:{
    color:"#2987c2",
    fontSize:hp("1.5%"),
    fontWeight:"800"
  }
});
