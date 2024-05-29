import React, { useState, useEffect } from 'react';
import {
  Text,
  StyleSheet,
  ImageBackground,
  View,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';
import { Audio } from 'expo-av';

export default function Historia({navigation}) {
  const [sound, setSound] = useState();
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [buttonPressed, setButtonPressed] = useState(false);

  const backgrounds = [
    require('../assets/cutscene/1.jpg'),
    require('../assets/cutscene/2.jpg'),
    require('../assets/cutscene/3.jpg'),
  ];
  const texts = [
    [
      'Brasil, 2120. Os humanos se renderam à tecnologia. O país está passando por suas maiores dificuldades em mais de 100 anos. Mentiras, crime, violência, fome e o medo dominam as ruas. O trabalhador sofre com seu salário mínimo que está estagnado há mais de 30 anos.',
      'Após a segunda grande depressão no país, há apenas governos alinhados com os interesses de monopólios de milionários. Com a repressão da polícia a qualquer movimentação nas ruas, inocentes são pegos no fogo cruzado.',
    ],
    [
      'A indústria de melhoramentos cibernéticos aflorou e conquistou toda a população. No entanto, a violência aumenta ainda mais com os armamentos circulando pelo submundo de São Paulo.',
      'Novas drogas ilegais surgiram para controlar o aumento dos níveis de depressão das pessoas, causando dependência e mais violência que o prefeito deseja esconder para impedir a entrada de iniciativas estrangeiras para conter a onda de violência.',
    ],
    [
      'A saúde mental virou um tabu completo e psicólogos estão sendo impedidos de exercerem suas funções. Pesquisadores contratados pelo governo descobriram que a falta de saúde mental e o uso de remédios para controlar a população e deixá-la cativa é eficaz.',
      'Violência, medo, fome, insegurança. Você vive aqui. Em completa desesperança. Porém... hoje a sua vida mudará.',
    ],
  ];

  const handleNext = () => {
    if (textIndex === 1) {
      if (backgroundIndex === 0) {
        setBackgroundIndex(1);
      } else if (backgroundIndex === 1) {
        setBackgroundIndex(2);
      } else {
        navigation.navigate("Questionario")
      }
      setTextIndex(0);
    } else {
      setTextIndex(1);
    }
  };

  async function tocaMus() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/audios/rpath.mp3')
    );
    setSound(sound);
    await sound.playAsync();
  }

  const apertou = () => {
    setButtonPressed(true);
    tocaMus();
  };

  return (
    <View style={styles.container}>
      {!buttonPressed && (
        <TouchableOpacity onPress={apertou}>
          <View style={styles.botaoComeca}>
            <Text style={styles.botaoComecaTxt}>Onde eu estou?</Text>
          </View>
        </TouchableOpacity>
      )}

      {buttonPressed && (
        <View style={styles.backgroundContainer}>
          <ImageBackground
            source={backgrounds[backgroundIndex]}
            resizeMode="cover"
            style={styles.backgroundImage}
            imageStyle={backgroundIndex === 1 ? styles.imgSegunda : null}
          />

          <View style={styles.caixinha}>
            <View style={styles.caixaTexto}>
              <Text style={styles.texto}>
                {texts[backgroundIndex][textIndex]}
              </Text>
            </View>

            <View style={styles.caixaSeta}>
              <TouchableOpacity onPress={handleNext}>
                <Image
                  source={require('../assets/seta.png')}
                  style={styles.seta}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  botaoComeca: {
    backgroundColor: 'yellow',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  botaoComecaTxt: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backgroundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  backgroundImage: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  caixinha: {
    height: 220,
    backgroundColor: 'yellow',
    margin: 20,
    padding: 10,
    borderRadius: 18,
    width: 350,
    marginTop: -500,
  },
  texto: {
    textAlign: 'justify',
    lineHeight: 22,
    fontSize: 16,
  },
  caixaTexto: {
    padding: 10,
  },
  caixaSeta: {
    alignItems: 'flex-end',
    marginTop: -20,
    marginLeft: 290,
    padding: 10,
    width: 10,
    height: 55,
    zIndex: 2,
  },
  seta: {
    width: 30,
    height: 30,
  },
  imgSegunda: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
    alignItems: 'flex-start',
  },
});
