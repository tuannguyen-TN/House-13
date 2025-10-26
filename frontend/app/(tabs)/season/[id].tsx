import React from 'react'
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import { SEASONS } from '../../../constants/seasons'
import { StatusBar } from 'expo-status-bar'

export default function SeasonDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const router = useRouter()

  const season = SEASONS.find((s) => s.id === id)

  if (!season) {
    return (
      <View style={styles.container}>
        <Text>Season not found</Text>
      </View>
    )
  }

  return (
    <LinearGradient
      colors={[season.colors.primary, season.colors.secondary]}
      style={styles.container}
    >
      <StatusBar style="light" />
      <View style={styles.header}>
        <Pressable
          onPress={() => router.navigate('/')}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </Pressable>
        <Text style={styles.headerTitle}>{season.name}</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.seasonHeader}>
          <Text style={styles.emoji}>{season.emoji}</Text>
          <Text style={styles.seasonTitle}>{season.name}</Text>
          <Text style={styles.seasonSubtitle}>{season.subtitle}</Text>
        </View>

        <View style={styles.descriptionCard}>
          <Text style={styles.description}>{season.description}</Text>
        </View>

        <View style={styles.foodsSection}>
          <Text style={styles.sectionTitle}>Recommended Foods</Text>
          <View style={styles.foodGrid}>
            {season.foods.map((food, index) => (
              <View key={index} style={styles.foodCard}>
                <Text style={styles.foodName}>{food}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 2,
    marginTop: 40,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  seasonHeader: {
    alignItems: 'center',
    marginVertical: 24,
  },
  emoji: {
    fontSize: 80,
    marginBottom: 16,
  },
  seasonTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  seasonSubtitle: {
    fontSize: 18,
    color: '#f0f0f0',
    marginBottom: 8,
  },
  seasonMonths: {
    fontSize: 16,
    color: '#e0e0e0',
    fontStyle: 'italic',
  },
  descriptionCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  description: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    lineHeight: 24,
  },
  foodsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
    textAlign: 'center',
  },
  foodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  foodCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
    width: '48%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  foodName: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
})
