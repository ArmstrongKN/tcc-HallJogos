import React, { useDebugValue, useEffect, useState } from 'react';
import { ScrollView, Text, View, StyleSheet, TouchableOpacity, TextInput, FlatList, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getUid, addDoc, db, collection, getDocs, where, query } from '../Firebase';

export default function Diario({navigation, route}) {
  
  const [array, setArray] = useState([]);
  const [notaVisivel, setnotaVisivel] = useState(false);
  const [registro, setRegistro] = useState('');
  const [sentimento, setSentimento] = useState('');
  const [uid, setUid] = useState(''); //id do usuario
  
  getUid().then((uid) => {
    setUid(uid);
  }).catch((error) => {
    console.error('ERRO:', error)
  });
  
  const data = (data) => {
    let dia = new Date().getDate();
    let mes = new Date().getMonth()+1;
    let ano = new Date().getFullYear();

    return(
      data = `${dia}-${mes}-${ano}`
    );
  }

  const uidReq = () => {
    getUid().then((uid) => {
      setUid(uid);
    }).catch((error) => {
      console.error('ERRO:', error)
    })
  }

  const toggleNota = () => {
    setnotaVisivel((prevState) => !prevState);
  };

  const getDiario = async () => {
    uidReq();
    if(uid) {
      try {
        const q = query(collection(db, 'diario'), where('uid', '==', uid)); // Query com where
        const querySnapshot = await getDocs(q);
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ id: doc.id, ...doc.data() });
        });

        console.log(docs);
        setArray(docs);
      } catch (error) {
        console.error('Error fetching diario:', error);
      };
    }
  }

  useEffect(() => {
    getDiario();
    setEmocao();
  }, []);

  const setEmocao = () => {
    if(route.params == undefined){
      route.params = 
      {
        "emocao": "neutro",
        "pontos": 0
      }
    }
    else if(route.params.emocao){
      setSentimento(route.params.emocao);
    }
  }

  const add = async () => {
    try {
      const docRef = await addDoc(collection(db, "diario"), {
        uid: uid,
        sentimento: sentimento,
        registro: registro,
        data: data(data)
      });
      console.log("Documento registrado com ID: ", docRef.id);
      setRegistro("");
      toggleNota();
      getDiario();
      setSentimento('Neutro');
    } catch (e) {
      console.error("Erro ao adicionar documento: ", e);
    }
  }


  return (
    <SafeAreaView style={styles.container}>

      <View style={[styles.containerFundoNotas, { zIndex: 1, position: 'relative' }]}>

        <View style={styles.viewTitle}>
          <Text style={styles.textTitle}>
            Aqui você pode escrever sobre seus sentimentos e pensamentos.
          </Text>
        </View>

        {/*/// CODIGO DO GUSTAVO PARA SALVAR OS DADOS DENTRO DO APP */}

        <View style={styles.blocoNota}>

        <View style={styles.notas}>

            { 
            array.length < 1 ?


              <Text>
                Nenhum registro encontrado
              </Text>

                :

              <FlatList
              data={array}
              renderItem={({ item }) => (
                <View style={styles.notaSalva}>
                  <Text>Texto: {item.registro}</Text>
                  <Text>Sentimento: {item.sentimento}</Text>
                  <Text>Data: {item.data}</Text>
                  
                </View>
              )}
            />
            }

          
          </View>

          <View style={[styles.btnAddNota, {zIndex: 1}]}>

            {!notaVisivel && (
              <TouchableOpacity onPress={() => {setEmocao(); toggleNota()}} >

                <View style={styles.btnNota}>
                  <Text style={{ fontSize: 20, paddingHorizontal: 10 }}>+</Text>
                </View>
              </TouchableOpacity>

            )}

          </View>

        </View>

      </View>

          {notaVisivel && (
              <View 
              style={[styles.containerFrontal, { zIndex: 2, elevation: 30, position: 'absolute', }]}
              >

                <Text style={styles.areaTexto}>Voce esta se sentindo {sentimento} escreva aqui o que aconteceu no seu dia.</Text>
                <TextInput
                  multiline={true}
                  numberOfLines={10}
                  placeholderTextColor={'#fff'}
                  style={styles.textoInputNota}
                  placeholder="Digite aqui"
                  onChangeText={setRegistro}
                  defaultValue={registro}
                  value={registro}
                />
                <TouchableOpacity onPress={() => setnotaVisivel(false)} >
                  <Text style={styles.btnNota}>Voltar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btnSalvar}
                  onPress={add}
                >
                  <Text>Salvar</Text>
                </TouchableOpacity>

              </View>

            )}

    </SafeAreaView>
  );

}

const windowWidth = Dimensions.get("screen").width;
const windowHeight = Dimensions.get("screen").height;

const styles = StyleSheet.create({

  //fundo da tela
  container: {
    flex: 1,
    paddingHorizontal: 6,
    backgroundColor: '#ffff', 
  },

  //container do titulo, notas e botao criar notas
  containerFundoNotas: {
    justifyContent: 'space-evenly',
    backgroundColor: '#dcdcdc',
    borderRadius: 15,
  },

  //viewtitulo
  viewTitle: {
    zIndex: 1,
    pading: 4,
    margin: 6,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    elevation: 2
  },

  textTitle: { //estilo das frases encima das notas e eventos.
    zIndex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    borderRadius: 10,
    textAlign: 'center'
  },
  ////
  
  textoinput: {
    flexShrink: 1,
    backgroundColor: 'rgba(63, 191, 129, 0.88)',
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    borderRadius: 10,
    margin: 6,
    padding: 6,
    textAlignVertical: 'top'
  },

  notas: {
    margin: 6,
    borderRadius: 2,
  },

  notaSalva: {
    margin: 6,
    alignItems: 'center',
    backgroundColor: '#dcdcdc',
    elevation: 8 //sombras
  },

  btnAddNota: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    margin: 6,
    borderRadius: 2,
    backgroundColor: '#DCDCDC',
  },

  btnSalvar: {
    alignItems: 'flex-start',
    backgroundColor: '#6CB1F1',
    margin: 3,
    padding: 2,
  },


  containerFrontal: {
    flex: 1,
    justifyContent: 'center',
    padding: 0,
    margin: 6,
    borderRadius: 10,
    backgroundColor: '#6CB1F1',
  },

  addNota: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    margin: 6,
    borderRadius: 2,
    backgroundColor: '#DCDCDC',
  },

  areaTexto: {
    fontSize: 20,
    padding: 6,
  },

  btnNota: {
    flexWrap: 'wrap',
    backgroundColor: '#ffff',
    padding: 6,
    margin: 6
  },

  textoInputNota: {
    flexShrink: 1,
    backgroundColor: '#FFF',
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
    borderRadius: 10,
    margin: 6,
    padding: 6,
    textAlignVertical: 'top'
  },
});
