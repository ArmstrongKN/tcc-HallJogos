import React, {useEffect } from 'react';
import { Easing, Animated, Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {
  useFonts,
  PressStart2P_400Regular,
} from '@expo-google-fonts/press-start-2p';
import {
  Oswald_700Bold
} from '@expo-google-fonts/oswald';
import { SafeAreaView } from 'react-native-safe-area-context';
import CalendarStrip from 'react-native-calendar-strip';
import 'moment';
import 'moment/locale/pt-br';  // language must match config
import { doc, getUid, db, collection, getDocs, where, query, getDoc } from '../Firebase';
import useState from "react-usestateref";

import BarraXP from '../Paginas/barrraXP';


export default function Home({ navigation }) {

  const [frase, setFrase] = useState({});
  const [pontuacao, setPontuacao] = useState('');
  const translateY = new Animated.Value(0);
  const [uid, setUid] = useState('');
  const [rand, setRand, randRef] = useState("");

  getUid().then((uid) => {
    setUid(uid);
  }).catch((error) => {
    console.error('ERRO:', error)
  });

  const getPontuacao = async () => {
    try {
      const q = query(collection(db, 'passe'), where('uid', '==', uid));
      const querySnapshot = await getDocs(q);
      let docs = {};
      querySnapshot.forEach((doc) => {
        docs = { id: doc.id, ...doc.data() };
      });
      console.log(docs.pontuacao);
      setPontuacao(docs.pontuacao);
    } catch (error) {
      console.log('Error fetching passe:', error);
    };
  }

  const getFrase = async () => {
    random();
    const fraseRef = doc(db, "frases", randRef.current);

    try{
      const fraseDoc = await getDoc(fraseRef);
      setFrase(fraseDoc.data());
    } catch(error) {
      console.log(error);
      setFrase("Frase não encontrada")
    }
  }

  const random = () => {
    setRand(String(Math.floor(Math.random() * 50 ) + 1));
  }

  Animated.loop(
    Animated.timing(translateY, {
      toValue: 2,
      duration: 10000,
      easing: Easing.linear,
      useNativeDriver: true,
    })
  ).start();

  const gradientColors1 = translateY.interpolate({
    inputRange: [0, 1],
    outputRange: ['#ffff', '#ffff'],
  });

  useEffect(() => {
    getFrase();
    console.log(frase);
  }, []);

  useEffect(() => {
    getPontuacao();
    console.log(pontuacao);
  });

  let [fontsLoaded, fontError] = useFonts({
    PressStart2P_400Regular, Oswald_700Bold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (

    <SafeAreaView
      style={styles.container}>

      <View style={styles.superiorBar}>

        <TouchableOpacity style={styles.perfil}>
          <Image source={require('../assets/minicerebro.png')} style={{ resizeMode: 'stretch', width: 35, height: 35 }} />
        </TouchableOpacity>
        <View style={styles.barraXP}>

          <BarraXP />

        </View>

      </View>

      <View style={styles.numDias}>

        <CalendarStrip
          scrollable

          style={{ height: 70, paddingTop: 10, paddingBottom: 10, paddingLeft: 5, paddingRight: 5 }}
          calendarAnimation={{ type: 'sequence', duration: 120 }}
          daySelectionAnimation={{ type: 'border', duration: 500, borderWidth: 1, borderHighlightColor: 'white' }}
        />


      </View>

      <View style={styles.containerMain}>

            <View style={styles.containerBtns}>

            <TouchableOpacity  style={styles.btnStyle} onPress={() => navigation.navigate('Diario')}>
                <Image style={styles.btnJogoImage} source={require('../assets/icone-do-app.png')} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.btnStyle} onPress={() => navigation.navigate('HallJogos')}>
                <Image style={styles.btnJogoImage} source={require('../assets/icone-jogo.png')} />
              </TouchableOpacity>

            </View>

        <View style={styles.containerCerebro}>
          
            <Image source={require('../assets/icone.png')} style={[styles.icone, { zIndex: 2 }]} resizeMode="contain" />

          <View style={styles.overlay}>
          <Text style={styles.pontuacaoTexto}>{pontuacao}</Text>
        </View>

        </View>

        <View style={styles.containerTexto}>
          <Text style={styles.texto}>{frase.frase}</Text>
        </View>
      </View>


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    paddingHorizontal: 6,
    overflow: 'hidden',
  },

  //barra dos dias de uso do app
  numDias: {
    margin: 6,
    borderRadius: 10,
    padding: 1,

  },

    // BARRA SUPERIOR

    superiorBar: {
      paddingHorizontal: 10,
      justifyContent: 'space-around',
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: '#6CB1F1',
      borderRadius: 10,
      margin: 6
    },
  
  
    // PERFIL
  
    perfil: {
      margin: 6,
      padding: 10,
      borderRadius: 20,
      backgroundColor: '#6CB1F1',
    },
  
    //barraXp
  
    barraXP: {
      backgroundColor: '#6CB1F1',
      width: 300,
      height: 40,
      margin: 6
    },

  //container do cerebro, frase, e botao do jogo

  containerMain: {
    flex: 1,
    borderRadius: 20,
    marginBottom: 100
  },


  //IMAGEM DO CEREBRO E PONTUACAO DO USUARIO

  containerCerebro: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(220, 220, 220, 0)',
  },

  icone: {
    width: 350,
    height: 350,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
  },

  pontuacaoTexto: {
    fontSize: 75,
    color: 'white',
    padding: 30,
    fontFamily: 'PressStart2P_400Regular',
  },


  //CORES A SEREM IMPLEMENTADAS (OBS: MUDANCA DE COR SEGUNDO A PONTUACAO DO USUARIO)

  background: {
    backgroundColor: 'rgba(65, 167, 91, 0)',
  },


  //FRASE ALEATORIA

  containerTexto: {
    backgroundColor: 'rgb(159, 194, 255)',
    padding: 10,
    borderRadius: 8,
  },

  texto: {
    color: 'black',
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Oswald_700Bold',
  },

  //botao jogo
  containerBtns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 15,
    backgroundColor: '#ffff',
    margin: 10,
  },

  btnJogoImage: {
    width: 40,
    height: 40,
  },

  btnStyle: {
    borderRadius: 100,
    backgroundColor: '#6CB1F1',
    padding: 7
  },

  

});
