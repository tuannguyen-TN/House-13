import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Drawer } from 'expo-router/drawer'
import DrawerContent from '../components/DrawerContent'
import { Ionicons } from '@expo/vector-icons'

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <DrawerContent {...props} />}
        screenOptions={{
          drawerPosition: 'left',
          drawerType: 'slide',
          headerStyle: {
            backgroundColor: '#667eea',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          drawerStyle: {
            backgroundColor: '#f8f9fa',
            width: 280,
          },
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: 'Home',
            title: 'SeasonEats',
            drawerIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="scanner"
          options={{
            drawerLabel: 'Food Scanner',
            title: 'Energetic Property',
            drawerIcon: ({ color, size }) => (
              <Ionicons name="scan" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="combination"
          options={{
            drawerLabel: 'Combination Check',
            title: 'Food Combinations',
            drawerIcon: ({ color, size }) => (
              <Ionicons name="git-merge" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="season/[id]"
          options={{
            drawerLabel: () => null,
            drawerItemStyle: { display: 'none' },
            title: 'Season Details',
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  )
}
