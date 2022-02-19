import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeStack from "./HomeStack";
import AccountStack from "./AccountStack";
import AdminStack from "./AdminStack";

const Drawer = createDrawerNavigator()

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Курсы" component={HomeStack} options={{ headerShown: false }} />
            <Drawer.Screen name="Аккаунт" component={AccountStack} options={{ headerShown: false }} />
            <Drawer.Screen name="Администрирование" component={AdminStack} options={{ headerShown: false }} />
        </Drawer.Navigator>
    )
}

export default DrawerNavigator