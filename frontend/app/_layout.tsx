// app/_layout.tsx
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
            title: 'House 13',
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
          name="markets"
          options={{
            drawerLabel: 'Find Markets',
            title: 'Local Markets',
            drawerIcon: ({ color, size }) => (
              <Ionicons name="storefront" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="season/[id]"
          options={{
            drawerLabel: 'Season Details',
            title: 'Season Details',
            drawerIcon: ({ color, size }) => (
              <Ionicons name="leaf" size={size} color={color} />
            ),
            drawerItemStyle: { display: 'none' },
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  )
}
