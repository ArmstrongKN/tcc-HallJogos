import {createStackNavigator} from '@react-navigation/stack';

import Home from "./InitialScreen";
import Register from "./Register";
import Login from "./Login";

const Stack = createStackNavigator();

export default function Rotas(){
  return(

    <Stack.Navigator>
    <Stack.Screen name="Home" component={Home} options={{headerShown:false, title:"Home"}}/>
    <Stack.Screen name="Register" component={Register} options={{headerShown:false, title:"CriarConta"}}/>
    <Stack.Screen name="Login" component={Login} options={{headerShown:false, title:"Entrar"}}/>
    </Stack.Navigator>
  );
}