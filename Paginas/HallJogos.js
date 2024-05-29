import React from 'react';
import { ScrollView, Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';
import { Exo2_700Bold } from '@expo-google-fonts/exo-2';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Agenda({navigation}) {

  let [fontsLoaded, fontError] = useFonts({
    PressStart2P_400Regular, Exo2_700Bold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.historia}>
        <TouchableOpacity onPress={() => navigation.navigate('Agenda')}>
          <View style={styles.botaoTutorial}>
            <Text style={styles.botaoTutorialTxt}>Tutorial</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Historia')}>
          <View style={styles.botaoIntroducao}>
            <Text style={styles.botaoIntroducaoTxt}>Introdução</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnStyle} onPress={() => navigation.navigate('NewRotas')}>
          <Image style={styles.btnJogoImage} source={require('../assets/voltar.png')} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    paddingHorizontal: 6,
  },

  botaoTutorial: {
    backgroundColor: 'yellow',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 300,
    marginLeft: 60,
    marginRight: 60
  },

  botaoTutorialTxt: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },

  botaoIntroducao: {
    backgroundColor: 'yellow',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 50,
    marginLeft: 60,
    marginRight: 60
  },

  botaoIntroducaoTxt: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },

  btnStyle: {
    borderRadius: 100,
    backgroundColor: '#6CB1F1',
    padding: 7,
    width: 50,
    height: 50,
    alignItems: 'center',
    marginTop: -440,
    marginLeft: 8
  },

  btnJogoImage: {
    width: 40,
    height: 40,
    alignItems: 'center',
    flex: 1,
  },

  historia: {
    height: 740,
    width: 380,
  },
  
});
