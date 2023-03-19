import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
import { Image } from 'react-native';
import ToTimeString from '../utils/ToTimeString';



export default function WeatherListItem({item}) {



  return (
    <View style={styles.itemConatiner} >

        <View>

      <Text style={styles.TimeTxt}>{ToTimeString(item.dt)}</Text>
      <Text style={styles.WeatherStatus}>{item.weather[0].description}</Text>
      </View>


       
      <View style={{flexDirection:"row",alignItems:"center"}} >
      <Image style={{width:hp("7%"),height:hp("7%")}} source={{uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}}/>
      <Text style={styles.weatherTemTxt}>{parseInt(item.main.temp)}°</Text>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({

    itemConatiner:{
        backgroundColor:"#f8f9fa",
        marginHorizontal:wp("2%"),
        marginVertical:hp("0.5%"),
        borderRadius:hp("1%"),
        flexDirection:"row",
        justifyContent:"space-between",
        padding:hp("2%"),
        alignItems:"center"
    },
    TimeTxt:{
        // color:"#2987c2",
        fontSize:hp("2%"),
        fontWeight:"700"
    },
    WeatherStatus:{
        color:"grey",
        fontSize:hp("2%"),
        marginVertical:hp("1%")
    },
    weatherTemTxt:{
        fontWeight:"800",
        fontSize:hp("4%")
    }
})