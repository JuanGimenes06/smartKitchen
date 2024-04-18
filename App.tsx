import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons/'



import Receita from './pages/index';
import Licao from './pages/licao';
import Personagem from './pages/personagem';
import Jogo from './pages/jogo';
import Revicao from './pages/revicao';




const Drawer = createDrawerNavigator();

function MyDrawer() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen
                name="Receita"
                component={Receita}
                options={{
                    drawerIcon: ({ focused, color, size }) => (
                        <Ionicons
                            name={focused ? 'cafe' : 'cafe-outline'}
                            size={30}
                            color={'black'}
                        />
                    ),
                }}
            />
            <Drawer.Screen
                name="Lição"
                component={Licao}
                options={{
                    drawerIcon: ({ focused, color, size }) => (
                        <Ionicons
                            name={focused ? 'calculator' : 'calculator-outline'}
                            size={30}
                            color={'black'}
                        />
                    ),
                }} />
            <Drawer.Screen
                name="Personagem"
                component={Personagem}
                options={{
                    drawerIcon: ({ focused, color, size }) => (
                        <Ionicons
                            name={focused ? 'accessibility' : 'accessibility-outline'}
                            size={30}
                            color={'black'}
                        />
                    ),
                }} />
            <Drawer.Screen
                name="Jogo"
                component={Jogo}
                options={{
                    drawerIcon: ({ focused, color, size }) => (
                        <Ionicons
                            name={focused ? 'game-controller' : 'game-controller-outline'}
                            size={30}
                            color={'black'}
                        />
                    ),
                }}
            />
            <Drawer.Screen
                name="Revição"
                component={Revicao}
                options={{
                    drawerIcon: ({ focused, color, size }) => (
                        <Ionicons
                            name={focused ? 'book' : 'book-outline'}
                            size={30}
                            color={'black'}
                        />
                    ),
                }}
            />
        </Drawer.Navigator>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <MyDrawer />
        </NavigationContainer>
    );
}