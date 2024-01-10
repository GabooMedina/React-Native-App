import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


import Listar from "./screens/listar";
import Guardar from "./screens/guardar";
import Editar from "./screens/Editar";
import Buscar from "./screens/buscar";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Listar" component={Listar} />
        <Stack.Screen name="Guardar" component={Guardar} />
        <Stack.Screen name="Editar" component={Editar} />
        <Stack.Screen name="Buscar" component={Buscar} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;