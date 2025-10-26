import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import { detectFood, FoodItem } from '../../constants/foods'

export default function ScannerScreen() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [detectedFood, setDetectedFood] = useState<FoodItem | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showResult, setShowResult] = useState(false)

  const pickImageFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant camera roll permissions')
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })

    if (!result.canceled) {
      handleImageSelected(result.assets[0].uri)
    }
  }

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync()

    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant camera permissions')
      return
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })

    if (!result.canceled) {
      handleImageSelected(result.assets[0].uri)
    }
  }

  const handleImageSelected = (uri: string) => {
    setSelectedImage(uri)
    analyzeImage(uri)
  }

  const analyzeImage = async (uri: string) => {
    setIsAnalyzing(true)

    // Simulate API call delay
    setTimeout(() => {
      const food = detectFood(uri)
      setDetectedFood(food)
      setIsAnalyzing(false)
      setShowResult(true)
    }, 2000)
  }

  const resetScanner = () => {
    setSelectedImage(null)
    setDetectedFood(null)
    setShowResult(false)
  }

  const getEnergyColor = (energy: string) => {
    switch (energy) {
      case 'cold':
        return '#4facfe'
      case 'warm':
        return '#fa709a'
      case 'neutral':
        return '#43e97b'
      default:
        return '#999'
    }
  }

  const getEnergyEmoji = (energy: string) => {
    switch (energy) {
      case 'cold':
        return '❄️'
      case 'warm':
        return '🔥'
      case 'neutral':
        return '☯️'
      default:
        return '❓'
    }
  }

  return (
    <LinearGradient colors={['#667eea', '#764ba2']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {!selectedImage ? (
            <>
              <View style={styles.header}>
                <Text style={styles.title}>Food Energy Scanner</Text>
                <Text style={styles.subtitle}>
                  Discover the energetic properties of your food
                </Text>
              </View>

              <View style={styles.scannerContainer}>
                <View style={styles.scannerFrame}>
                  <View style={[styles.corner, styles.topLeft]} />
                  <View style={[styles.corner, styles.topRight]} />
                  <View style={[styles.corner, styles.bottomLeft]} />
                  <View style={[styles.corner, styles.bottomRight]} />

                  <Ionicons
                    name="scan"
                    size={80}
                    color="rgba(255,255,255,0.3)"
                  />
                  <Text style={styles.scanText}>
                    Select or capture food image
                  </Text>
                </View>
              </View>

              <View style={styles.buttonContainer}>
                <Pressable style={styles.actionButton} onPress={takePhoto}>
                  <LinearGradient
                    colors={['#f093fb', '#f5576c']}
                    style={styles.gradientButton}
                  >
                    <Ionicons name="camera" size={24} color="#fff" />
                    <Text style={styles.buttonText}>Take Photo</Text>
                  </LinearGradient>
                </Pressable>

                <Pressable
                  style={styles.actionButton}
                  onPress={pickImageFromGallery}
                >
                  <LinearGradient
                    colors={['#4facfe', '#00f2fe']}
                    style={styles.gradientButton}
                  >
                    <Ionicons name="images" size={24} color="#fff" />
                    <Text style={styles.buttonText}>Choose from Gallery</Text>
                  </LinearGradient>
                </Pressable>
              </View>
            </>
          ) : (
            <View style={styles.resultContainer}>
              <Image
                source={{ uri: selectedImage }}
                style={styles.selectedImage}
              />

              {isAnalyzing ? (
                <View style={styles.analyzingContainer}>
                  <ActivityIndicator size="large" color="#fff" />
                  <Text style={styles.analyzingText}>
                    Analyzing food properties...
                  </Text>
                </View>
              ) : null}

              {showResult && detectedFood && (
                <View style={styles.resultCard}>
                  <View style={styles.foodHeader}>
                    <Text style={styles.foodName}>{detectedFood.name}</Text>
                    <View
                      style={[
                        styles.energyBadge,
                        {
                          backgroundColor: getEnergyColor(detectedFood.energy),
                        },
                      ]}
                    >
                      <Text style={styles.energyEmoji}>
                        {getEnergyEmoji(detectedFood.energy)}
                      </Text>
                      <Text style={styles.energyText}>
                        {detectedFood.energy.toUpperCase()}
                      </Text>
                    </View>
                  </View>

                  <Text style={styles.description}>
                    {detectedFood.description}
                  </Text>

                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>✨ Benefits</Text>
                    {detectedFood.benefits.map((benefit, index) => (
                      <Text key={index} style={styles.listItem}>
                        • {benefit}
                      </Text>
                    ))}
                  </View>

                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>⚠️ Cautions</Text>
                    {detectedFood.cautions.map((caution, index) => (
                      <Text key={index} style={styles.listItem}>
                        • {caution}
                      </Text>
                    ))}
                  </View>

                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                      📖 Suggested Recipes
                    </Text>
                    <View style={styles.recipeContainer}>
                      {detectedFood.recipes.map((recipe, index) => (
                        <View key={index} style={styles.recipeChip}>
                          <Text style={styles.recipeText}>{recipe}</Text>
                        </View>
                      ))}
                    </View>
                  </View>

                  <Pressable
                    style={styles.scanAgainButton}
                    onPress={resetScanner}
                  >
                    <Text style={styles.scanAgainText}>Scan Another Food</Text>
                  </Pressable>
                </View>
              )}
            </View>
          )}
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
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#f0f0f0',
    textAlign: 'center',
  },
  scannerContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  scannerFrame: {
    width: 250,
    height: 250,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: '#fff',
    borderWidth: 3,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderTopLeftRadius: 20,
  },
  topRight: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    borderTopRightRadius: 20,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomLeftRadius: 20,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomRightRadius: 20,
  },
  scanText: {
    color: 'rgba(255,255,255,0.7)',
    marginTop: 20,
    fontSize: 14,
  },
  buttonContainer: {
    gap: 15,
  },
  actionButton: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  gradientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    gap: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  resultContainer: {
    marginTop: 20,
  },
  selectedImage: {
    width: '100%',
    height: 300,
    borderRadius: 20,
    marginBottom: 20,
  },
  analyzingContainer: {
    alignItems: 'center',
    padding: 20,
  },
  analyzingText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 16,
  },
  resultCard: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 20,
    padding: 20,
  },
  foodHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  foodName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  energyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 5,
  },
  energyEmoji: {
    fontSize: 16,
  },
  energyText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  listItem: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
    lineHeight: 20,
  },
  recipeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  recipeChip: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  recipeText: {
    fontSize: 13,
    color: '#555',
  },
  scanAgainButton: {
    backgroundColor: '#667eea',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  scanAgainText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
})
