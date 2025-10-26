import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Image,
  Modal,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import {
  analyzeFoodCombinations,
  CombinationAnalysis,
  Recipe,
  getRecipeDetails,
} from '../constants/foodCombinations'

export default function CombinationScreen() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [analysis, setAnalysis] = useState<CombinationAnalysis | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)
  const [showRecipeModal, setShowRecipeModal] = useState(false)
  const [healthNotes, setHealthNotes] = useState('')
  const [showNotesModal, setShowNotesModal] = useState(false)

  const pickImageFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant camera roll permissions')
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
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
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled) {
      handleImageSelected(result.assets[0].uri)
    }
  }

  const handleImageSelected = (uri: string) => {
    setSelectedImage(uri)
    setShowNotesModal(true)
  }

  const analyzeIngredients = () => {
    setShowNotesModal(false)
    setIsAnalyzing(true)

    // Simulate API call delay
    setTimeout(() => {
      const result = analyzeFoodCombinations(selectedImage!, healthNotes)
      setAnalysis(result)
      setIsAnalyzing(false)
      setShowResults(true)
    }, 3000)
  }

  const resetAnalyzer = () => {
    setSelectedImage(null)
    setAnalysis(null)
    setShowResults(false)
    setHealthNotes('')
  }

  const openRecipe = (recipe: Recipe) => {
    const fullRecipe = getRecipeDetails(recipe.id)
    setSelectedRecipe(fullRecipe)
    setShowRecipeModal(true)
  }

  return (
    <LinearGradient colors={['#667eea', '#764ba2']} style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['bottom']}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {!selectedImage ? (
            <>
              <View style={styles.header}>
                <Text style={styles.title}>Food Combo Analyzer</Text>
                <Text style={styles.subtitle}>
                  Check if your ingredients work well together
                </Text>
              </View>

              <View style={styles.scannerContainer}>
                <View style={styles.scannerFrame}>
                  <View style={[styles.corner, styles.topLeft]} />
                  <View style={[styles.corner, styles.topRight]} />
                  <View style={[styles.corner, styles.bottomLeft]} />
                  <View style={[styles.corner, styles.bottomRight]} />

                  <Ionicons
                    name="restaurant"
                    size={60}
                    color="rgba(255,255,255,0.3)"
                  />
                  <Text style={styles.scanText}>Capture all ingredients</Text>
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

              <View style={styles.infoBox}>
                <Ionicons name="information-circle" size={20} color="#fff" />
                <Text style={styles.infoText}>
                  Take a photo of all ingredients you plan to use
                </Text>
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
                    Analyzing ingredients...
                  </Text>
                  <Text style={styles.analyzingSubtext}>
                    Checking combinations...
                  </Text>
                </View>
              ) : null}

              {showResults && analysis && (
                <>
                  {/* Detected Ingredients */}
                  <View style={styles.resultCard}>
                    <Text style={styles.cardTitle}>
                      📦 Detected Ingredients
                    </Text>
                    <View style={styles.ingredientsList}>
                      {analysis.detectedIngredients.map((item, index) => (
                        <View key={index} style={styles.ingredientChip}>
                          <Text style={styles.ingredientText}>{item}</Text>
                        </View>
                      ))}
                    </View>
                  </View>

                  {/* Combination Analysis */}
                  <View style={styles.resultCard}>
                    <Text style={styles.cardTitle}>
                      🔍 Combination Analysis
                    </Text>

                    {analysis.goodCombinations.length > 0 && (
                      <View style={styles.combinationSection}>
                        <View style={styles.sectionHeader}>
                          <Ionicons
                            name="checkmark-circle"
                            size={20}
                            color="#52c41a"
                          />
                          <Text style={styles.sectionTitle}>
                            Good Combinations
                          </Text>
                        </View>
                        {analysis.goodCombinations.map((combo, index) => (
                          <View key={index} style={styles.comboItem}>
                            <Text style={styles.comboIngredients}>
                              {combo.ingredients.join(' + ')}
                            </Text>
                            <Text style={styles.comboReason}>
                              {combo.reason}
                            </Text>
                          </View>
                        ))}
                      </View>
                    )}

                    {analysis.badCombinations.length > 0 && (
                      <View style={styles.combinationSection}>
                        <View style={styles.sectionHeader}>
                          <Ionicons name="warning" size={20} color="#ff4d4f" />
                          <Text style={styles.sectionTitle}>Avoid These</Text>
                        </View>
                        {analysis.badCombinations.map((combo, index) => (
                          <View key={index} style={styles.comboItem}>
                            <Text style={styles.comboIngredients}>
                              {combo.ingredients.join(' + ')}
                            </Text>
                            <Text style={styles.comboReason}>
                              {combo.reason}
                            </Text>
                            {combo.alternative && (
                              <Text style={styles.alternative}>
                                💡 Try: {combo.alternative}
                              </Text>
                            )}
                          </View>
                        ))}
                      </View>
                    )}
                  </View>

                  {/* Recipe Suggestions */}
                  <View style={styles.resultCard}>
                    <Text style={styles.cardTitle}>👨‍🍳 Recipe Suggestions</Text>
                    <Text style={styles.recipeSubtitle}>
                      {analysis.isToxic
                        ? 'Recipes with safer combinations'
                        : 'Based on your ingredients'}
                    </Text>

                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                    >
                      <View style={styles.recipeList}>
                        {analysis.suggestedRecipes.map((recipe, index) => (
                          <Pressable
                            key={index}
                            style={styles.recipeCard}
                            onPress={() => openRecipe(recipe)}
                          >
                            <View style={styles.recipeImagePlaceholder}>
                              <Text style={styles.recipeEmoji}>
                                {recipe.emoji}
                              </Text>
                            </View>
                            <Text style={styles.recipeName}>{recipe.name}</Text>
                            <Text style={styles.recipeType}>{recipe.type}</Text>
                          </Pressable>
                        ))}
                      </View>
                    </ScrollView>
                  </View>

                  <Pressable
                    style={styles.scanAgainButton}
                    onPress={resetAnalyzer}
                  >
                    <Text style={styles.scanAgainText}>
                      Analyze New Ingredients
                    </Text>
                  </Pressable>
                </>
              )}
            </View>
          )}
        </ScrollView>
      </SafeAreaView>

      {/* Health Notes Modal */}
      <Modal visible={showNotesModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.notesModal}>
            <Text style={styles.modalTitle}>Health Notes (Optional)</Text>
            <Text style={styles.modalSubtitle}>
              Any specific health conditions or preferences?
            </Text>
            <TextInput
              style={styles.notesInput}
              placeholder="e.g., feeling cold, weak digestion, pregnancy..."
              placeholderTextColor="#999"
              multiline
              value={healthNotes}
              onChangeText={setHealthNotes}
            />
            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.modalButton, styles.skipButton]}
                onPress={analyzeIngredients}
              >
                <Text style={styles.skipButtonText}>Skip</Text>
              </Pressable>
              <Pressable
                style={[styles.modalButton, styles.continueButton]}
                onPress={analyzeIngredients}
              >
                <Text style={styles.continueButtonText}>Continue</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Recipe Detail Modal */}
      <Modal visible={showRecipeModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.recipeModal}>
            <Pressable
              style={styles.closeButton}
              onPress={() => setShowRecipeModal(false)}
            >
              <Ionicons name="close" size={24} color="#333" />
            </Pressable>

            {selectedRecipe && (
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.recipeHeader}>
                  <Text style={styles.recipeModalEmoji}>
                    {selectedRecipe.emoji}
                  </Text>
                  <Text style={styles.recipeModalTitle}>
                    {selectedRecipe.name}
                  </Text>
                </View>

                <Text style={styles.recipeDescription}>
                  {selectedRecipe.description}
                </Text>

                <View style={styles.recipeSection}>
                  <Text style={styles.recipeSectionTitle}>Ingredients</Text>
                  {selectedRecipe.ingredients.map((ing, index) => (
                    <Text key={index} style={styles.ingredientItem}>
                      • {ing}
                    </Text>
                  ))}
                </View>

                <View style={styles.recipeSection}>
                  <Text style={styles.recipeSectionTitle}>How to Prepare</Text>
                  {selectedRecipe.steps.map((step, index) => (
                    <View key={index} style={styles.stepItem}>
                      <Text style={styles.stepNumber}>{index + 1}.</Text>
                      <Text style={styles.stepText}>{step}</Text>
                    </View>
                  ))}
                </View>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
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
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
    padding: 12,
    marginTop: 20,
    gap: 8,
  },
  infoText: {
    color: '#f0f0f0',
    fontSize: 13,
    flex: 1,
  },
  resultContainer: {
    marginTop: 20,
  },
  selectedImage: {
    width: '100%',
    height: 250,
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
  analyzingSubtext: {
    color: '#e0e0e0',
    marginTop: 5,
    fontSize: 14,
  },
  resultCard: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  ingredientsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  ingredientChip: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  ingredientText: {
    fontSize: 14,
    color: '#555',
  },
  combinationSection: {
    marginBottom: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  comboItem: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
  },
  comboIngredients: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  comboReason: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  alternative: {
    fontSize: 13,
    color: '#667eea',
    marginTop: 4,
    fontStyle: 'italic',
  },
  recipeSubtitle: {
    fontSize: 13,
    color: '#666',
    marginBottom: 15,
  },
  recipeList: {
    flexDirection: 'row',
    gap: 12,
  },
  recipeCard: {
    width: 120,
    alignItems: 'center',
  },
  recipeImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 15,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  recipeEmoji: {
    fontSize: 40,
  },
  recipeName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  recipeType: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  notesModal: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 25,
    paddingBottom: 35,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  notesInput: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  skipButton: {
    backgroundColor: '#f0f0f0',
  },
  skipButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  continueButton: {
    backgroundColor: '#667eea',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  recipeModal: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 25,
    paddingBottom: 35,
    maxHeight: '80%',
  },
  closeButton: {
    position: 'absolute',
    right: 20,
    top: 20,
    zIndex: 1,
    padding: 5,
  },
  recipeHeader: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  recipeModalEmoji: {
    fontSize: 60,
    marginBottom: 10,
  },
  recipeModalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  recipeDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 20,
  },
  recipeSection: {
    marginBottom: 25,
  },
  recipeSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  ingredientItem: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
    lineHeight: 20,
  },
  stepItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#667eea',
    marginRight: 8,
    width: 20,
  },
  stepText: {
    fontSize: 14,
    color: '#555',
    flex: 1,
    lineHeight: 20,
  },
})
