import React, { useState } from "react";
import "react-native-gesture-handler";
import DrawerNavigator from "./routes/Drawer";
import AuthStack from "./routes/AuthStack";
import { NavigationContainer } from "@react-navigation/native";
import AuthContext from "./context/AuthContext";
import { Text } from "react-native"

export default function App() {
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthentificated] = useState(false);

  React.useEffect(() => {
    fetch('http://192.168.2.114:8000/auth')
      .then(res => res.json())
      .then(res => res.isAuthenticated && setIsAuthentificated(true))
      .then(setLoading(false))
  }, [])

  if (loading) (<Text>Шалом!</Text>)

  return (
    <AuthContext.Provider value={{ setIsAuthentificated }}>
      <NavigationContainer >
        {isAuthenticated ? <DrawerNavigator /> : <AuthStack />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}


