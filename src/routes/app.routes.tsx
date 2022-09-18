import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Home } from '../screens/Home';
import { Game } from '../screens/Game';

export function AppRoutes(){
    const { Navigator, Screen } = createNativeStackNavigator();

    return(
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen 
                name="home"
                component={Home}                
            />

            <Screen 
                name="game"
                component={Game} 
            />
        </Navigator>
    )
}