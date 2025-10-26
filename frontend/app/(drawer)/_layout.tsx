import { Drawer } from 'expo-router/drawer'
import { Ionicons } from '@expo/vector-icons'
import DrawerContent from '../../components/DrawerContent'

export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
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
        drawerActiveTintColor: '#667eea',
        drawerInactiveTintColor: '#333',
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          title: 'SeasonEats',
          drawerLabel: 'Home',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="scanner"
        options={{
          title: 'Food Scanner',
          drawerLabel: 'Energetic Property',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="scan" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="combination"
        options={{
          title: 'Food Combinations',
          drawerLabel: 'Combination Check',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="git-merge" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="season/[id]"
        options={{
          drawerItemStyle: { display: 'none' },
          title: 'Season Details',
        }}
      />
    </Drawer>
  )
}
