import { Text, View, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';

import Svg, {Path} from 'react-native-svg';


export default function Home({ navigation }) {

  const Entrar = () => {
    navigation.navigate('Login');
  };

  const CriarConta = () => {
    navigation.navigate('Register');
  };



  return (

    <View style={styles.container}>


  <View style={[styles.top, {zIndex: 1}]}>
        <View style={styles.box}>
          <Svg
            height={200}
            width={Dimensions.get('screen').width}
            viewBox='0 0 1440 320'
            style={styles.topwavy}
          >
            <Path 
              fill='#1E73C2'
              d="M0,224L34.3,202.7C68.6,181,137,139,206,154.7C274.3,171,343,245,411,250.7C480,256,549,192,617,154.7C685.7,117,754,107,823,106.7C891.4,107,960,117,1029,106.7C1097.1,96,1166,64,1234,53.3C1302.9,43,1371,53,1406,58.7L1440,64L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"
            />
          </Svg>
        </View>
      </View>

    <View style={[styles.main, {zIndex: 3}]}>

      <View style={{ marginHorizontal: 6 }}>
        <Image source={require('../../assets/icone-do-app.png')} style={[styles.image, { zIndex: 1, alignSelf: 'flex-end' }]} />
        <View style={{ zIndex: 2, alignSelf: 'flex-start', marginLeft: 6 }}>
        <Text style={styles.title}>
          Mind-Pass
        </Text>
        <Text style={styles.text}>
          Juntos, pelo seu bem-estar.
        </Text>
        </View>
      </View>

          <View style={styles.mainBtn}>

            <View style={[styles.view, {zIndex: 3, marginBottom: 20}]}>
              <TouchableOpacity style={styles.btnEntrar} onPress={Entrar}>
                <Text style={styles.textEntrar}>Entrar</Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.view, {zIndex: 3, margin: 20}]}>
              <TouchableOpacity style={styles.btnCriar} onPress={CriarConta}>
                <Text style={styles.textCriar}>Criar Conta</Text>

              </TouchableOpacity>
            </View>

          </View>

    </View>

      <View style={[styles.bottom, {zIndex: 1}]}>
        <View style={styles.box}>
          <Svg
            height={200}
            width={Dimensions.get('screen').width}
            viewBox='0 0 1440 320'
            style={styles.bottomwavy}
          >
            <Path 
              fill='#1E73C2'
              d='M0,32L34.3,64C68.6,96,137,160,206,160C274.3,160,343,96,411,69.3C480,43,549,53,617,64C685.7,75,754,85,823,117.3C891.4,149,960,203,1029,213.3C1097.1,224,1166,192,1234,202.7C1302.9,213,1371,267,1406,293.3L1440,320L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z'
            />
          </Svg>
        </View>
      </View>

    </View>


  );

}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  main:{
    flex: 1,
    justifyContent: 'space-evenly'
  },

  view: {
    alignItems: 'center',
  },

  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#1E73C2',
  },

  image: {
    position: 'absolute',
    resizeMode: 'stretch',
    width: 230,
    height: 230,
    opacity: 0.2
  },


  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E73C2',
    borderRadius: 20,
  },

  textEntrar: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },

  textCriar: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  btnEntrar: {
    backgroundColor: '#1E73C2',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 30,
    elevation: 10
  },

  btnCriar: {
    backgroundColor: '#dcdcdc',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 30,
    elevation: 10

  },

  ///////

  bottom:{
    position: 'absolute',
    width: Dimensions.get('screen').width,
    bottom: 0,
  },

  box:{
    backgroundColor: '#1E73C2',
    height: 70
  },

  bottomwavy:{
    position: 'absolute',
    bottom: 10
  },

});