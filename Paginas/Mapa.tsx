import React, { useState, useEffect, useRef } from 'react';
import MapView, { LatLng, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  LocationObject,
  LocationAccuracy,
  watchPositionAsync,
} from 'expo-location';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Mapa({ navigation }) {

  const [location, setLocation] = useState<LocationObject | null>(null);
  const mapRef = useRef<MapView>(null);
  const [results, setResults] = useState<any[]>([]);

  async function requestLocationPermissions(){
    const { granted } = await requestForegroundPermissionsAsync();

    if(granted){
      const currentPosition = await getCurrentPositionAsync();
      setLocation(currentPosition);
      searchPlaces();
    }
  }

  useEffect(() => {
    requestLocationPermissions();
  }, []); 

  useEffect(() => {
    watchPositionAsync({
      accuracy: LocationAccuracy.Highest,
      timeInterval: 1000,
      distanceInterval: 1
    }, (response) => {
      setLocation(response);
      mapRef.current?.animateCamera({
        center: response.coords
      })
    });
    searchPlaces();
  }, []);

  const searchPlaces = async () => {
    const googleApisUrl = "https://maps.googleapis.com/maps/api/place/textsearch/json";
    const input = "Psicologo";
    const locationS = `${location?.coords.latitude}, ${location?.coords.longitude}&radius=2000`;
    const url = `${googleApisUrl}?query=${input}&location=${locationS}&key=AIzaSyBajmU9dXONFjV2TALolSfJlSetCSywIQs`;
    try{
      const resp = await fetch(url);
      const json = await resp.json();
      // console.log(json);
      if(json && json.results){
        const coords: LatLng[] = []
        for(const item of json.results) {
          coords.push({
            latitude: item.geometry.location.lat,
            longitude: item.geometry.location.lng,
          })
        }
        setResults(json.results)
        if(coords.length){
          mapRef.current?.fitToCoordinates(coords, {
            edgePadding: {
              top: 10,
              right: 10,
              bottom: 10,
              left: 10
            },
            animated: true
          })
        }
      }
    }
    catch(e){
      console.error(e)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{textAlign: 'center', color: '#ffff', padding: 10, borderRadius: 15, margin: 6, fontSize: 22, backgroundColor: '#6CB1F1'}}>Encontre Psicólogos</Text>
      <View style={styles.containerMapa}>
      {
        location && 
        <MapView style={styles.map} 
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005
          }}
          ref={mapRef}
        >
          <Marker 
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
          />

          {results.length ? results.map((item, i) => {
            const coord: LatLng = {
              latitude: item.geometry.location.lat,
              longitude: item.geometry.location.lng,
            }
            return <Marker key={`search-item-${i}`} coordinate={coord} title={item.name} description="" />
          }): null}
        </MapView>
      }

<TouchableOpacity style={[styles.btnInfo, {zIndex: 4}]} onPress={()=> navigation.navigate ('Diario')}>
            <Image style={styles.btnInfoImage} source={require('../assets/minicerebro.png')}/>
          </TouchableOpacity>
      
      </View>
    
      

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    paddingHorizontal: 10
  },
  containerMapa:{
    flex: 1,
    borderRadius: 10,
  },

  map: {
    width: '100%',
    height: '90%',
  },
  
  btnInfo:{
    backgroundColor: '#ffffff',
    padding: 5,
    borderRadius: 50,
    position: 'absolute',
    right: 20,
    bottom: 110,
  },
  
  btnInfoImage:{
    width:40,
    height: 40,
  },

});
