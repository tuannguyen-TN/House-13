import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import SeasonCard from '../../components/SeasonCard'
import { SEASONS } from '../../constants/seasons'
import { StatusBar } from 'expo-status-bar'

export default function HomeScreen() {
  const router = useRouter()

  const handleSeasonPress = (seasonId: string) => {
    router.push(`/season/${seasonId}`)
  }

  return (
    <LinearGradient colors={['#667eea', '#764ba2']} style={styles.container}>
      <StatusBar style="light" />
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

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Tap a season to explore its recommended foods
          </Text>
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
  footer: {
    alignItems: 'center',
    marginTop: 24,
  },
  footerText: {
    fontSize: 14,
    color: '#e0e0e0',
    fontStyle: 'italic',
  },
})
