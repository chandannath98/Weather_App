import {
  ActivityIndicator,
  Alert,
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
import DatesContainer from "../components/DateContainer"
import * as Location from 'expo-location';
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setWeatherData } from "../redux/actions";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";

import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';






export default function Home() {


  const [location, setLocation] = useState("");
  const [todayData, setTodayData] = useState(null);
  const [savedLocations, setSavedLocations] = useState([])
  const [weatherSearchBy, setWeatherSearchBy] = useState("Current Location");
  const [currentLocationCoordinate, setCurrentLocationCoordinate] = useState(null);
  


  
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { weatherData } = useSelector((state) => state.weatherAppReducer);
  
  useEffect(() => { 
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }
  
      let currentLocation = await Location.getCurrentPositionAsync({});
      setCurrentLocationCoordinate(currentLocation);
    })();
  }, []);




async function setSavedLocationsToStorage(loc){

await AsyncStorage.getItem('savedLocations').then(async(data) => {
  if (data) {
      await AsyncStorage.setItem('savedLocations', JSON.stringify([...JSON.parse(data),loc]));
      setSavedLocations([...JSON.parse(data),loc])

    }else{
      
      await AsyncStorage.setItem('savedLocations', JSON.stringify([loc]));
    }



}
  )
}

  

async function getSavedLocations(loc){

 await AsyncStorage.getItem('savedLocations').then(async(data) => {
    if (data) {
      // console.log(data)
      setSavedLocations(JSON.parse(data))
    }



}
  )}

  
  
  async function getWeatherData() {
    try {
      let apiUrl;
      if (weatherSearchBy === "Current Location") {
        apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${currentLocationCoordinate.coords.latitude}&lon=${currentLocationCoordinate.coords.longitude}&units=metric&appid=b9ff75b356281a43047db7c105a5bfc9`;
      } else {
        apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=b9ff75b356281a43047db7c105a5bfc9`;
      }
      const response = await fetch(apiUrl)
      const data = await response.json();
     if(response.status==200){

       setTodayData(data);
      }else{
        Alert.alert(data.message)
      }
  
      // Save the data in AsyncStorage
      await AsyncStorage.setItem('todayData', JSON.stringify(data));
    } catch {
      console.log("An error occurred while fetching weather data");
    }
  }
  
  async function getFiveDayForecast() {
    try {
      let apiUrl;
      if (weatherSearchBy === "Current Location") {
        apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${currentLocationCoordinate.coords?.latitude}&lon=${currentLocationCoordinate.coords?.longitude}&units=metric&id=524901&appid=b9ff75b356281a43047db7c105a5bfc9`
      } else {
        apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&id=524901&appid=b9ff75b356281a43047db7c105a5bfc9`
      }
      const response = await fetch(apiUrl);
      const data = await response.json();
      const tempData = data.list.reduce((acc, curr) => {
        const dt = new Date(curr.dt * 1000).toDateString();
        if (!acc[dt]) {
          acc[dt] = [];
        }
        acc[dt].push(curr);
        return acc;
      }, {});
      dispatch(setWeatherData(tempData));
  
      // Save the data in AsyncStorage
      await AsyncStorage.setItem('fiveDayForecast', JSON.stringify(tempData));
    } catch {
      console.log("An error occurred while fetching weather forecast data");
    }
  }

  useEffect(() => {
    // Check if there is internet connection
    NetInfo.fetch().then((state) => {
      if (state.isConnected) {

        

        if (currentLocationCoordinate) {
          getWeatherData();
          getFiveDayForecast();
          getSavedLocations()
        }
      } else {
        getSavedLocations()

        // If there is no internet connection, load the data from AsyncStorage
        AsyncStorage.getItem('todayData').then((data) => {
          if (data) {
            setTodayData(JSON.parse(data));
          }
        });
        AsyncStorage.getItem('fiveDayForecast').then((data) => {
          if (data) {
            dispatch(setWeatherData(JSON.parse(data)));
          }
        });
      }
    });
  }, [currentLocationCoordinate, weatherSearchBy]);



  return (
    <View style={styles.container}>




      <View style={styles.locationSearchContainer}>
        
        <View style={styles.locationSearchInputBox}>

        <Menu>
          <MenuTrigger style={styles.searchBtn}>
          




        {/* <TouchableOpacity style={styles.searchBtn}> */}

          <EvilIcons name="location" size={hp("3%")} color="white" />
          {/* </TouchableOpacity> */}



          </MenuTrigger>
          <MenuOptions style={{ padding: 10, borderRadius: 10 }}>
            <MenuOption
              onSelect={() => {
                setWeatherSearchBy("Current Location")
                setLocation("")
              }}
              text="Current Location"
            />

{savedLocations.map((i)=><MenuOption  key={i} onSelect={() => {setWeatherSearchBy("Location Name"),getWeatherData(i),getFiveDayForecast(i)}}>
              <Text >{i}</Text>


            </MenuOption>)}
            
            
          </MenuOptions>
        </Menu>







          <TextInput
            style={styles.searchInputStyle}
            placeholder="Search Location"
            value={location}
            onChangeText={setLocation}
            onSubmitEditing={()=>{setWeatherSearchBy("Location Name"),getWeatherData(location),getFiveDayForecast(location)}}
          />
          
          <TouchableOpacity onPress={()=>{setWeatherSearchBy("Location Name"),getWeatherData(location),getFiveDayForecast(location)}} style={styles.searchBtn}>
          <AntDesign name="search1" size={hp("3%")} color="white" />
        </TouchableOpacity>


        </View>

        
      </View>
{!todayData ?
      <ActivityIndicator size={"large"} />
:


<View style={{flex:1}}>

    






      <Text style={styles.dateTxt}>{(new Date()).toDateString()}</Text>

      <View style={styles.weatherBox}>
        <Text style={styles.locationName}>{todayData?.name}, {todayData?.sys?.country}
        
        {!savedLocations.includes(todayData?.name)?
        <TouchableOpacity onPress={()=>setSavedLocationsToStorage(todayData?.name)} >
        <Text style={{color:"#2987c2"}}>  Save Location</Text>
        </TouchableOpacity>:<></>}

        
        </Text>
        <Text style={styles.tempraature}> {(todayData.main?todayData.main.temp:0).toFixed(0)}°</Text>
        <Text style={styles.weatherStatus}>{todayData.main?todayData.weather[0].description:""}</Text>
      </View>

      <View style={styles.MainIcon}>
        
      {todayData.weather?
        <Image style={{width:hp("15%"),height:hp("15%")}} source={{uri: `https://openweathermap.org/img/wn/${todayData.weather[0]?.icon}@2x.png`}}/>:
        <></>}

      </View>

      <TouchableOpacity onPress={()=>navigation.navigate("WeatherTimelineScreen",{data: weatherData[(new Date()).toDateString()] })} style={styles.minMaxTempTxtContainer}>
        <Text style={styles.minMaxTempTxt} >Min - {todayData.main?.temp_min}°C</Text>
        <Text style={styles.minMaxTempTxt} >Max - {todayData.main?.temp_max}°C</Text>
      </TouchableOpacity> 
     
      <ScrollView contentContainerStyle={{alignItems: "center",paddingHorizontal:wp('3%')}} horizontal style={styles.bottomContainer}>
       
       {Object.keys(weatherData).map((item,index)=><DatesContainer key={index} item={item}  />)}
        
      </ScrollView>
      </View>
      
      }

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