// components/DrawerContent.tsx
import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { DrawerContentScrollView } from '@react-navigation/drawer'
import { Ionicons } from '@expo/vector-icons'
import { useRouter, usePathname } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'

export default function DrawerContent(props: any) {
  const router = useRouter()
  const pathname = usePathname()

  const menuItems = [
    {
      title: 'Home',
      icon: 'home',
      route: '/',
      gradient: ['#667eea', '#764ba2'],
      description: 'Seasonal food recommendations',
    },
    {
      title: 'Food Scanner',
      icon: 'scan',
      route: '/scanner',
      gradient: ['#f093fb', '#f5576c'],
      description: 'Detect energetic properties',
    },
    {
      title: 'Combination Check',
      icon: 'git-merge',
      route: '/combination',
      gradient: ['#4facfe', '#00f2fe'],
      description: 'Analyze food combinations',
    },
    {
      title: 'Find Markets',
      icon: 'storefront',
      route: '/markets',
      gradient: ['#43e97b', '#38f9d7'],
      description: 'Locate ingredients nearby',
    },
  ]

  const isActive = (route: string) => {
    if (route === '/' && pathname === '/') return true
    if (route !== '/' && pathname.startsWith(route)) return true
    return false
  }

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.container}
    >
      <LinearGradient colors={['#667eea', '#764ba2']} style={styles.header}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoEmoji}>🍜</Text>
        </View>
        <Text style={styles.appName}>House 13</Text>
        <Text style={styles.tagline}>Harmony through food</Text>
      </LinearGradient>

      <View style={styles.menuContainer}>
        <Text style={styles.menuTitle}>FEATURES</Text>
        {menuItems.map((item, index) => (
          <Pressable
            key={index}
            style={[
              styles.menuItem,
              isActive(item.route) && styles.activeMenuItem,
            ]}
            onPress={() => {
              router.push(item.route as any)
              props.navigation.closeDrawer()
            }}
          >
            <LinearGradient
              colors={item.gradient as any}
              style={styles.iconContainer}
            >
              <Ionicons name={item.icon as any} size={20} color="#fff" />
            </LinearGradient>
            <View style={styles.menuTextContainer}>
              <Text
                style={[
                  styles.menuText,
                  isActive(item.route) && styles.activeMenuText,
                ]}
              >
                {item.title}
              </Text>
              <Text style={styles.menuDescription}>{item.description}</Text>
            </View>
            {isActive(item.route) && (
              <Ionicons name="checkmark-circle" size={20} color="#667eea" />
            )}
          </Pressable>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>House 13</Text>
        <Text style={styles.version}>Version 1.0.0</Text>
      </View>
    </DrawerContentScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 50,
    alignItems: 'center',
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  logoEmoji: {
    fontSize: 40,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  tagline: {
    fontSize: 14,
    color: '#f0f0f0',
  },
  menuContainer: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 15,
  },
  menuTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#999',
    marginBottom: 10,
    marginLeft: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginBottom: 8,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  activeMenuItem: {
    backgroundColor: '#f0f4ff',
    borderWidth: 1,
    borderColor: '#667eea',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  activeMenuText: {
    color: '#667eea',
    fontWeight: '600',
  },
  menuDescription: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  footerText: {
    fontSize: 12,
    color: '#999',
    marginBottom: 5,
  },
  version: {
    fontSize: 11,
    color: '#bbb',
  },
})
