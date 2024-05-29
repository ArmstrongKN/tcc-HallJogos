import useState from 'react-usestateref';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Firebase';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { addDoc, db, collection, getDocs, where, query } from '../../Firebase';

export default function Login({ navigation }) {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [uid, setUid, uidRef] = useState('');

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        const userData = userCredential; 
        console.log(userData.user.uid);
        setUid(userData.user.uid);
        handlePass();
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  }

  const handlePass = async () => {
    const q = query(collection(db, 'passe'), where('uid', '==', uidRef.current)); // Query com where
    try{
      const querySnapshot = await getDocs(q);
  
      if (querySnapshot.empty) {
        console.log('Passe não existe');
        navigation.navigate("Historia");
      } else {
        console.log("Passe já criado");
        navigation.navigate("NewRotas");
      }
    } catch (error) {
      console.log(error);
    }
  } 

  return (

    <SafeAreaView style={styles.container}>

      <View style={[styles.viewTop, { zIndex: 2 }]}>
        <View style={[styles.viewTop, { zIndex: 2, alignSelf: 'flex-start', marginLeft: 6 }]}>
          <Text style={styles.title}>
            Boas vindas
          </Text>
          <Text style={styles.text}>
            Estamos felizes em ver {'\n'}
            você novamente :)
          </Text>
        </View>
      </View>

      <View style={[styles.viewMain, { zIndex: 2 }]}>

        <Text style={styles.titleInput}>Email:</Text>
        <TextInput style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.titleInput}>Senha:</Text>
        <TextInput style={styles.input}
          secureTextEntry={true}
          placeholder="Senha"
          value={senha}
          onChangeText={setSenha}
        />

        <TouchableOpacity style={styles.btnEntrar} onPress={handleLogin}>
          <Text style={styles.textEntrar}>Entrar</Text>
        </TouchableOpacity>


      </View>

      <View style={[styles.view, { zIndex: 2 }]}>


        <TouchableOpacity style={styles.btnVoltar} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.textoVoltar}>Voltar</Text>
        </TouchableOpacity>

      </View>

      <View style={[styles.bottom, { zIndex: 1 }]}>
        <View style={styles.box}>
          <Svg
            height={200}
            width={Dimensions.get('screen').width}
            viewBox='0 0 1440 320'
            style={styles.bottomwavy}
          >
            <Path
              fill='#1E73C2'
              d='M0,32L34.3,53.3C68.6,75,137,117,206,144C274.3,171,343,181,411,181.3C480,181,549,171,617,149.3C685.7,128,754,96,823,74.7C891.4,53,960,43,1029,58.7C1097.1,75,1166,117,1234,117.3C1302.9,117,1371,75,1406,53.3L1440,32L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z'
            />
          </Svg>
        </View>
      </View>

    </SafeAreaView>


  );

}

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;


const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: 'space-evenly',
    backgroundColor: '#ffff',
  },

  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#1E73C2',
  },

  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E73C2',
    borderRadius: 20,
  },

  view: {
    alignItems: 'center',

    padding: 0,

  },

  viewTop: {
    alignItems: 'center',
    margin: 10,

  },

  viewMain: {
    paddingHorizontal: 20,
    margin: 10,
  },


  textEntrar: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#ffff'
  },

  btnEntrar: {
    backgroundColor: '#3980C1',
    alignSelf: 'center',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 20,
    margin: 10,
    elevation: 10
  },

  btnVoltar: {
    backgroundColor: '#ffff',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
    margin: 6,
    elevation: 10
  },

  textoVoltar: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  titleInput: {
    alignSelf: 'flex-start',
    color: '#ffff',
    fontWeight: 'bold',
    fontSize: 18
  },

  input: {
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 20,
    padding: 10,
    margin: 2
  },


  bottom: {
    position: 'absolute',
    width: windowWidth > 500 ? "70%" : "100%",
    height: windowHeight > 600 ? "60%" : "100%",
    bottom: 0,
  },

  box: {
    backgroundColor: '#1E73C2',
    height: 570
  },

  bottomwavy: {
    position: 'absolute',
    bottom: 500
  },


});