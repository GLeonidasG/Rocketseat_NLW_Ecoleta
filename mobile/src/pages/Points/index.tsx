import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, Image, ScrollView, SafeAreaView } from 'react-native'
import SvgUri from 'react-native-svg-uri'
import MapView, { Marker } from 'react-native-maps'
import { RectButton, TouchableOpacity } from 'react-native-gesture-handler'
import api from '../../Services/api'

interface Points {
  id: number
  image: string
  name: string
  endereco: string
  whatsapp: string
  latitude: number
  longitude: number
  city: string
  uf: string
}
interface Items {
  id: number
  image: string
  title: string
}

const Points = () => {

  const [points, setPoints] = useState<Points[]>([])
  const [items, setItems] = useState<Items[]>([])
  // useEffect for points
  useEffect(() => {
    api.get('points')
      .then((response) => {
        console.log(response.data)
        setPoints(response.data)
      })
  }, [])

  // useEffect for items
  useEffect(() => {
    api.get('items')
      .then((response) => {
        console.log(response.data)
        setItems(response.data)
      })
  }, [])


  if (!items) return;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Bem-vindos!</Text>
      <Text style={styles.description}>Procure no mapa algum ponto de coleta.</Text>
      <View
        style={styles.mapContainer}
      >
        <MapView
          initialRegion={
            {
              latitude: -29.6801722,
              longitude: -51.1501793,
              latitudeDelta: 0.014,
              longitudeDelta: 0.014
            }}
          style={styles.map}
        >
          <Marker coordinate={{ latitude: -29.6801722, longitude: -51.1501793 }} style={styles.mapMarker} >
            <View style={styles.mapMarkerContainer}>
              <Text style={styles.mapMarkerTitle} >Hello there</Text>
              <Image source={require('../../assets/dummy-image.jpg')} style={styles.mapMarkerImage} ></Image>
            </View>
          </Marker>
        </MapView>
      </View>
      <View style={styles.itemsContainer}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ padding: 20 }}  >
          <TouchableOpacity style={styles.item}>
            <Text style={styles.itemTitle} >Baterias</Text>
            <SvgUri source={{ uri: "http://192.168.1.12:3333/uploads/lampadas.svg" }}></SvgUri>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}
export default Points

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 20,
  },

  title: {
    fontSize: 20,
    fontFamily: 'Ubuntu_700Bold',
    marginTop: 24,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 4,
    fontFamily: 'Roboto_400Regular',
  },

  mapContainer: {
    flex: 1,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 16,
  },

  map: {
    width: '100%',
    height: '100%',
  },

  mapMarker: {
    width: 90,
    height: 80,
  },

  mapMarkerContainer: {
    width: 90,
    height: 70,
    backgroundColor: '#34CB79',
    flexDirection: 'column',
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center'
  },

  mapMarkerImage: {
    width: 90,
    height: 45,
    resizeMode: 'cover',
  },

  mapMarkerTitle: {
    flex: 1,
    fontFamily: 'Roboto_400Regular',
    color: '#FFF',
    fontSize: 13,
    lineHeight: 23,
  },

  itemsContainer: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 32,
  },

  item: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#eee',
    height: 120,
    width: 120,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    textAlign: 'center',
  },

  selectedItem: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#34CB79',
    height: 120,
    width: 120,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    textAlign: 'center',

  },

  itemTitle: {
    fontFamily: 'Roboto_400Regular',
    textAlign: 'center',
    fontSize: 13,
  },
});