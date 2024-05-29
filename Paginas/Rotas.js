import {createStackNavigator} from '@react-navigation/stack';

import LoginRotas from './LoginPages/Rotas';
import NewRotas from '../Navigation(new)/Tabs';
import Questionario from './Questionario';
import Historia from './Historia';
import HallJogos from './HallJogos';


const Stack = createStackNavigator();

export default function Rotas(){
  return(
      <Stack.Navigator initialRouteName={LoginRotas}>
        <Stack.Screen name="LoginRotas" component={LoginRotas} options={{headerShown:false}}/>
        <Stack.Screen name="Questionario" component={Questionario} options={{headerShown:false}}/>
        <Stack.Screen name="NewRotas" component={NewRotas} options={{headerShown:false}}/>
        <Stack.Screen name="Historia" component={Historia} options={{headerShown:false}}/>
        <Stack.Screen name="HallJogos" component={HallJogos} options={{headerShown:false}}/>
      </ Stack.Navigator>
  );
}