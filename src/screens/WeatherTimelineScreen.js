import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
import WeatherListItem from '../components/WeatherListItem';


export default function WeatherTimelineScreen({navigation,route}) {
  return (
    <View style={styles.container}>

<View style={styles.header} >

     <TouchableOpacity onPress={()=>navigation.goBack()}>
     <AntDesign name="leftcircle" size={hp("6%")} color="grey" />
     </TouchableOpacity>
     <Text style={styles.headerTxt}>Sun, 19 Mar 2023</Text>
</View>


<FlatList data={[0,0,0,0,0]} renderItem={({item})=><WeatherListItem/>}

/>

    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#fff"
    },
    header:{
        marginVertical:hp("2%"),
        marginHorizontal:wp("2%"),
        flexDirection:"row",
        alignItems:"center",
        alignContent:"center",
        textAlign:"center"
    },
    headerTxt:{
        fontSize:hp("3%"),
        marginHorizontal:wp("3%"),
        fontWeight:"700"
    }
})