import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import SeasonCard from '../components/SeasonCard'
import { SEASONS } from '../constants/seasons'

export default function HomeScreen() {
  const router = useRouter()

  const handleSeasonPress = (seasonId: string) => {
    router.push(`/season/${seasonId}`)
  }

  return (
    <LinearGradient colors={['#667eea', '#764ba2']} style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['bottom']}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.subtitle}>
              Discover foods that harmonize with each season
            </Text>
          </View>

          <View style={styles.grid}>
            {SEASONS.map((season, index) => (
              <SeasonCard
                key={season.id}
                season={season}
                index={index}
                onPress={() => handleSeasonPress(season.id)}
              />
            ))}
          </View>

          <View style={styles.quickTips}>
            <Text style={styles.tipTitle}>Quick Tip</Text>
            <Text style={styles.tipText}>
              Swipe from left or tap the menu icon to explore more features!
            </Text>
          </View>
        </ScrollView>
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
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#f0f0f0',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickTips: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    alignItems: 'center',
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 5,
  },
  tipText: {
    fontSize: 13,
    color: '#f0f0f0',
    textAlign: 'center',
  },
})
