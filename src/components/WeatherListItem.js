import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
import { Image } from 'react-native';



export default function WeatherListItem() {
  return (
    <View style={styles.itemConatiner} >

        <View>

      <Text style={styles.TimeTxt}>12:10 AM</Text>
      <Text style={styles.WeatherStatus}>Partly Cloud</Text>
      </View>


       
      <View style={{flexDirection:"row",alignItems:"center"}} >
      <Image style={{width:hp("7%"),height:hp("7%")}} source={{uri: `https://openweathermap.org/img/wn/10n@2x.png`}}/>
      <Text style={styles.weatherTemTxt}>37°</Text>
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