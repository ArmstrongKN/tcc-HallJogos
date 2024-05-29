import {ScrollView, Text, View,StyleSheet, Image, TouchableOpacity } from 'react-native';
import {
  useFonts,
  PressStart2P_400Regular,
} from '@expo-google-fonts/press-start-2p';
import {
  Exo2_700Bold
} from '@expo-google-fonts/exo-2';
import { SafeAreaView } from 'react-native-safe-area-context';

import BarraXP from '../Paginas/barrraXP';

export default function Agenda(){

  let [fontsLoaded, fontError] = useFonts({
    PressStart2P_400Regular, Exo2_700Bold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return(
    
    <SafeAreaView
    style={styles.container}
    >
      <View style={styles.superiorBar}>

      <TouchableOpacity style={styles.perfil}>
        <Image source={require('../assets/minicerebro.png')} style={{ resizeMode: 'stretch', width: 35, height: 35 }} />
      </TouchableOpacity>
        <View style={styles.barraXP}>

          <BarraXP />

        </View>

      </View>


      <ScrollView>

      <View style={styles.viewText}>

      <Text style={styles.textStyleTitle}>
      Veja os Eventos e Missôes da semana.
      </Text>
      </View>

      <View style={styles.viewInput1Agenda}>

      <Image/>
      <Text style={styles.textStyleTitle}> Evento: Reuniao Grupal no Bosque Maia.. </Text>
      <Text style={styles.textStyle}>
      O encontro sera realizado por um grupo de pesquisadores, com o fim de coletar dados e ajudar grupos de auto ajuda ou pessoas que nao tem condicoes de pagar por uma terapia ou tratamento adequado sobre sua saude mental
      </Text>
      <TouchableOpacity style={styles.buttonStyle}>
        <Text style={{color: '#ffffff'}}>Saber mais</Text>
      </TouchableOpacity>

      </View>


</ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    paddingHorizontal: 6,
  },

  buttonImageIconStyle: {
    padding: 20,
    marginLeft: 6,
    marginRight: 6,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
  },

  fundoIcone: {
    margin: 4,
    borderRadius: 10, 
    padding:5, 
    backgroundColor: '#DCDCDC',
  },

  viewText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 6,
    pading: 4,
    backgroundColor: '#DCDCDC'
  },

  textStyleTitle: { //estilo das frases encima das notas e eventos.
    fontSize: 20,
    borderRadius: 10,
    textAlign: 'center',
    fontFamily: 'Exo2_700Bold'
  },

  textStyle: { //estilo do texto das notas e eventos.
    fontSize: 15,
    borderRadius: 10,
    textAlign: 'justify',
    fontFamily: 'Exo2_700Bold'
  },

  buttonBar: { //estilo da view dos botoes da Agenda.
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    margin: 6,
    borderRadius: 10, 
    backgroundColor: '#DCDCDC', ///azul bb : #87cefa / verde : #3cb371 
    opacity: 0.72,
    position: 'relative'
  },

  buttonStyle:{ //estilo do botao 'saber mais' da Agenda.
    alignSelf: 'flex-end',
    padding: 4,
    backgroundColor: 'rgba(63, 191, 129, 0.88)',
    textAlign: 'center',
    fontSize: 10,
    borderRadius: 3
  },

  viewInput1Agenda: {
    margin:6,
    borderRadius: 2,
    backgroundColor: '#DCDCDC',
    padding: 4
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
  

});