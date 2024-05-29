import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import Constants from 'expo-constants';

export default function App() {
  const matrizXP = [
    { xp:10, level: 1 },
  ];

  const [index, setIndex] = useState(0);
  const [xpData, setXpData] = useState(matrizXP[index]);

  useEffect(() => {
    if (xpData.xp >= 100) {
      const newLevel = xpData.level + 1;
      const newXP = xpData.xp - 100;
      setXpData({ xp: newXP, level: newLevel });
    }
  }, [xpData.xp]);


  return (
    <View style={styles.container}>
      <View style={styles.numXP}>
      <Text style={styles.textoNivel}>Level: {xpData.level}</Text>
      <View style={styles.barraXP}>
        <View style={{ ...StyleSheet.absoluteFill, backgroundColor: "#00A8FF", width: `${xpData.xp}%` }}/>
        <Text style={styles.texto}>{xpData.xp}%</Text>
      </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
  },
  texto: {
    fontSize: 18,
    alignSelf: 'center'
  },
  textoNivel: {
    fontSize: 15,
  },
  barraXP: {
    width: '80%',
    height: 40,
    backgroundColor: '#fff',
    borderWidth: 3,
    borderRadius: 8,
    borderColor: '#555',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },

  numXP:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
});