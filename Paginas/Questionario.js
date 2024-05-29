import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { addDoc, db, collection, getDocs, where, query, getUid } from '../Firebase';

export default function Questionario({ navigation }) {
  const [pontuacao, setPontuacao] = useState(35);
  const [perguntaIndex, setPerguntaIndex] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [uid, setUid] = useState('');

  getUid().then((uid) => {
    setUid(uid);
  }).catch((error) => {
    console.error('ERRO:', error)
  });

  const perguntas = [
    {
      pergunta: 'Como você tem se sentido emocionalmente nas últimas semanas?',
      alternativas: ['Muito bem', 'Bem', 'Tanto faz', 'Mal', 'Muito Mal'],
      pontos: [-2, -1, 15, 10, 19],
    },
    {
      pergunta: 'Com que frequência você tem dificuldade para dormir ou tem insônia?',
      alternativas: ['Nunca', 'Raramente', 'Às vezes', 'Frequentemente', 'Sempre'],
      pontos: [-2, -1, 5, 9, 14],
    },
    {
      pergunta: 'Como você descreveria sua energia e motivação recentemente?',
      alternativas: ['Muito alta', 'Alta', 'Média', 'Baixa', 'Muito baixa'],
      pontos: [-10, -5, 8, 11, 21],
    },
    {
      pergunta: 'Você teve alterações significativas no seu apetite ultimamente?',
      alternativas: ['Não', 'De forma leve', 'De forma moderada', 'De forma considerável', 'De forma extrema'],
      pontos: [-8, -1, 9, 18, 26],
    },
    {
      pergunta: 'Com que frequência você se sente nervoso(a) ou ansioso(a) sem motivo aparente? ',
      alternativas: ['Nunca', 'Raramente', 'Às vezes', 'Frequentemente', 'Sempre'],
      pontos: [-5, 5, 12, 18, 32],
    },
    {
      pergunta: 'Você se sente isolado(a) ou sozinho(a) com frequência? ',
      alternativas: ['Nunca', 'Raramente', 'Às vezes', 'Frequentemente', 'Sempre'],
      pontos: [-7, 7, 15, 22, 33],
    },
    {
      pergunta: 'Como está sua concentração e capacidade de tomar decisões ultimamente?  ',
      alternativas: ['Muito boa', 'Boa', 'Média', 'Ruim', 'Muito Ruim'],
      pontos: [-10, 5, 9, 12, 19],
    },
    {
      pergunta: 'Você tem sentido falta de prazer ou interesse em atividades que costumava gostar? ',
      alternativas: ['Não', 'Um Pouco', 'Moderadamente', 'Muito', 'Extremamente'],
      pontos: [-5, 7, 15, 29, 40],
    },
    {
      pergunta: 'Como você se sente em relação ao futuro? ',
      alternativas: ['Otimista', 'Neutro', 'Incerto', 'Pessimista', 'Muito Pessimista'],
      pontos: [-7, 2, 9, 18, 25],
    },
    {
      pergunta: 'Você tem pensamentos de morte ou suicídio?',
      alternativas: ['Não', 'Raramente', 'Às vezes', 'Frequentemente', 'Sempre'],
      pontos: [-15, 7, 15, 29, 40],
    },
  ];

  const resposta = (alternativaIndex) => {
    const perguntaAtual = perguntas[perguntaIndex];
    const pontos = perguntaAtual.pontos[alternativaIndex];

    setPontuacao(pontuacao + pontos);

    if (perguntaIndex < perguntas.length - 1) {
      setPerguntaIndex(perguntaIndex + 1);
    } else {
      alert(`Seu Psycho Pass é de: ${pontuacao}`);
      setPerguntaIndex(0);
      setPontuacao(30);
      setShowQuiz(false);
      createPass();
    }
  };

  const createPass = async () => {
    try {
      const docRef = await addDoc(collection(db, "passe"), {
        uid: uid,
        pontuacao: pontuacao
      });
      console.log("Documento registrado com ID: ", docRef.id);
      navigation.navigate("NewRotas");
    } catch (e) {
      console.error("Erro ao adicionar documento: ", e);
    }
  }

  const startQuiz = () => {
    setShowQuiz(true);
  };

  return (
    <View style={styles.container}>
      {!showQuiz ? (
        <TouchableOpacity style={styles.botaoComeca} onPress={startQuiz}>
          <Text>Começar</Text>
        </TouchableOpacity>
      ) : (
        <View>
          <View style={styles.containerPergunta}>
            <Text>{perguntas[perguntaIndex].pergunta}</Text>
            {perguntas[perguntaIndex].alternativas.map((alternativa, index) => (
              <TouchableOpacity
                key={index}
                style={styles.botaoOpcao}
                onPress={() => resposta(index)}
              >
                <Text>{alternativa}</Text>
              </TouchableOpacity>
            ))}
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
  },
  botaoComeca: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#4CAF50',
  },
  containerPergunta: {
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  botaoOpcao: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});