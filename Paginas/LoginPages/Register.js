import React, {useState} from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Firebase';
import Svg, {Path} from 'react-native-svg';



export default function Register({ navigation }) {

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [senhaCon, setSenhaCon] = useState('')

  const confirmSenha = () => {
    if(senha != senhaCon){
      alert("Senhas não coincidem")
    }
    else if(senha == "" || senhaCon == "" || email == ""){
      alert("Preencha todos os campos")
    }
    else{
      alert("Conta criada com sucesso");
      handleRegister()
      navigation.navigate('Login')
    }
  }

  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, senha)
    .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
    })
    .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
        console.log(errorMessage);
    });
  }

  return (    
  <SafeAreaView style={styles.container}>

    <View style={[styles.top, {zIndex: 1}]}>
        <View style={styles.boxTop}>
          <Svg
            height={200}
            width={Dimensions.get('screen').width}
            viewBox='0 0 1440 320'
            style={styles.topwavy}
          >
            <Path 
              fill='#1E73C2'
              d="M0,64L26.7,85.3C53.3,107,107,149,160,176C213.3,203,267,213,320,192C373.3,171,427,117,480,122.7C533.3,128,587,192,640,213.3C693.3,235,747,213,800,218.7C853.3,224,907,256,960,256C1013.3,256,1067,224,1120,218.7C1173.3,213,1227,235,1280,229.3C1333.3,224,1387,192,1413,176L1440,160L1440,0L1413.3,0C1386.7,0,1333,0,1280,0C1226.7,0,1173,0,1120,0C1066.7,0,1013,0,960,0C906.7,0,853,0,800,0C746.7,0,693,0,640,0C586.7,0,533,0,480,0C426.7,0,373,0,320,0C266.7,0,213,0,160,0C106.7,0,53,0,27,0L0,0Z"
            />
          </Svg>
        </View>
      </View>

      <View style={[styles.containerDados, {zIndex: 2}]}>


        <View style={[styles.viewTop, { zIndex: 2, marginLeft: 20 }]}>
        <Text style={styles.title}>
          Boas{'\n'}
          Vindas
        </Text>
        </View>
        

        <View style={[styles.viewTop, { zIndex: 2, marginLeft: 20 }]}>
        <Text style={styles.text}>
          Realize o seu cadastro. {'\n'}
          Este é mais um passo, {'\n'} 
          para uma mente saudavel.
        </Text>
        </View>

      <View style={[styles.viewInput,{zIndex: 2}]}>

        <TextInput style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput style={styles.input}
          secureTextEntry={true}
          placeholder="Senha"
          value={senha}
          onChangeText={setSenha}
        />

        <TextInput style={styles.input}
          secureTextEntry={true}
          placeholder="Confirmar senha"
          value={senhaCon}
          onChangeText={setSenhaCon}
        />

      <TouchableOpacity style={styles.btnCadastrar} onPress={confirmSenha}>
        <Text style={styles.textCadastrar}>Cadastrar</Text>
      </TouchableOpacity>

      </View>
   
    <View style={[styles.viewBtn, {zIndex: 2}]}>
      <TouchableOpacity style={styles.btnVoltar} onPress={() => {navigation.navigate('Home')}}>
        <Text style={styles.textVoltar}>Voltar</Text>
      </TouchableOpacity>
    </View>

    </View>


    <View style={[styles.bottom, {zIndex: 1}]}>
        <View style={styles.boxBottom}>
          <Svg
            height={200}
            width={Dimensions.get('screen').width}
            viewBox='0 0 1440 320'
            style={styles.bottomwavy}
          >
            <Path 
              fill='#dcdcdc'
              d='M0,64L21.8,58.7C43.6,53,87,43,131,37.3C174.5,32,218,32,262,74.7C305.5,117,349,203,393,213.3C436.4,224,480,160,524,144C567.3,128,611,160,655,149.3C698.2,139,742,85,785,85.3C829.1,85,873,139,916,170.7C960,203,1004,213,1047,208C1090.9,203,1135,181,1178,197.3C1221.8,213,1265,267,1309,282.7C1352.7,299,1396,277,1418,266.7L1440,256L1440,320L1418.2,320C1396.4,320,1353,320,1309,320C1265.5,320,1222,320,1178,320C1134.5,320,1091,320,1047,320C1003.6,320,960,320,916,320C872.7,320,829,320,785,320C741.8,320,698,320,655,320C610.9,320,567,320,524,320C480,320,436,320,393,320C349.1,320,305,320,262,320C218.2,320,175,320,131,320C87.3,320,44,320,22,320L0,320Z'
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
    backgroundColor: '#ffff', 
  },

  containerDados:{
    flex: 1,
    justifyContent: 'space-around',
  },

  viewTop: {
    alignItems: 'flex-start',  
  },

  viewInput:{
    justifyContent: 'space-around',
    paddingHorizontal: 30,
    backgroundColor: '#0000'
  },

  viewBtn:{
    alignItems: 'center',
    marginHorizontal: 20,
  },

  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#ffff',
  },

  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E73C2',
    borderRadius: 20,
  },

  input: {
    fontSize: 18,
    textAlign: 'left',
    backgroundColor: '#f3f3f3',
    borderRadius: 15,
    padding: 10,
    margin: 10,
    elevation: 6
},


  btnCadastrar: {
    padding: 10,
    backgroundColor: '#1E73C2',
    alignSelf: 'center',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 20,
    elevation: 10
},

  textCadastrar: {
    fontSize: 25, 
    borderRadius: 80,
    color: '#ffff'
}, 

  btnVoltar: {
    borderRadius: 15,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
    elevation: 10
},

  textVoltar: {
    fontSize: 25, 
},

///////

topwavy:{
  position: 'absolute',
  top: 100
},

boxTop:{
  backgroundColor: '#1E73C2',
  height: 170
},

top:{
  position: 'absolute',
  width: windowWidth > 500 ? "70%": "100%",
  height: windowHeight > 600 ? "60%": "100%",
  top: 0,
},

bottom:{
  position: 'absolute',
  width: windowWidth > 500 ? "70%": "100%",
  height: windowHeight > 600 ? "30%": "100%",
  bottom: 0,
},

boxBottom:{
  backgroundColor: '#dcdcdc',
  height: 300
},

bottomwavy:{
  position: 'absolute',
  bottom: 240
},

});
