import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'

export default function CombinationScreen() {
  return (
    <LinearGradient colors={['#667eea', '#764ba2']} style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['bottom']}>
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Ionicons
              name="git-merge"
              size={80}
              color="rgba(255,255,255,0.5)"
            />
          </View>
          <Text style={styles.title}>Food Combination Analyzer</Text>
          <Text style={styles.subtitle}>Coming Soon</Text>
          <Text style={styles.description}>
            This feature will analyze multiple ingredients and suggest healthy
            combinations based on your health condition.
          </Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  iconContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#f0f0f0',
    marginBottom: 20,
  },
  description: {
    fontSize: 14,
    color: '#e0e0e0',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
})
