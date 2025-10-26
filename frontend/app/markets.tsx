import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
  Modal,
  Linking,
  Platform,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import {
  INGREDIENTS,
  findMarketsByIngredient,
  searchIngredients,
  getIngredientById,
  getMarketTypeColor,
  getMarketTypeLabel,
  MarketLocation,
  Ingredient,
} from '../constants/marketLocations'

export default function MarketsScreen() {
  const [searchQuery, setSearchQuery] = useState('')
  const [zipCode, setZipCode] = useState('13210')
  const [selectedIngredient, setSelectedIngredient] =
    useState<Ingredient | null>(null)
  const [searchResults, setSearchResults] = useState<Ingredient[]>([])
  const [nearbyMarkets, setNearbyMarkets] = useState<MarketLocation[]>([])
  const [showIngredientPicker, setShowIngredientPicker] = useState(false)
  const [selectedMarket, setSelectedMarket] = useState<MarketLocation | null>(
    null
  )
  const [showMarketModal, setShowMarketModal] = useState(false)

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const results = searchIngredients(searchQuery)
      setSearchResults(results)
      setShowIngredientPicker(true)
    }
  }

  const handleIngredientSelect = (ingredient: Ingredient) => {
    setSelectedIngredient(ingredient)
    setSearchQuery(ingredient.name)
    setShowIngredientPicker(false)

    // Find markets with this ingredient
    const markets = findMarketsByIngredient(ingredient.id, zipCode)
    setNearbyMarkets(markets)
  }

  const handleReset = () => {
    setSearchQuery('')
    setSelectedIngredient(null)
    setNearbyMarkets([])
    setSearchResults([])
  }

  const openMarketDetails = (market: MarketLocation) => {
    setSelectedMarket(market)
    setShowMarketModal(true)
  }

  const openMaps = (market: MarketLocation) => {
    const scheme = Platform.select({
      ios: 'maps:',
      android: 'geo:',
    })
    const url = Platform.select({
      ios: `${scheme}?q=${market.name}&ll=${market.coordinates.latitude},${market.coordinates.longitude}`,
      android: `${scheme}${market.coordinates.latitude},${market.coordinates.longitude}?q=${market.name}`,
    })

    Linking.openURL(url || '')
  }

  const callMarket = (phone: string) => {
    Linking.openURL(`tel:${phone}`)
  }

  const renderStars = (rating: number) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i <= rating ? 'star' : 'star-outline'}
          size={14}
          color="#ffc107"
        />
      )
    }
    return stars
  }

  return (
    <LinearGradient colors={['#667eea', '#764ba2']} style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['bottom']}>
        <View style={styles.content}>
          {/* Search Header */}
          <View style={styles.searchHeader}>
            <View style={styles.searchRow}>
              <View style={styles.searchInputContainer}>
                <Ionicons
                  name="search"
                  size={20}
                  color="#999"
                  style={styles.searchIcon}
                />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search ingredient..."
                  placeholderTextColor="#999"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  onSubmitEditing={handleSearch}
                />
                {searchQuery.length > 0 && (
                  <Pressable onPress={handleReset} style={styles.clearButton}>
                    <Ionicons name="close-circle" size={20} color="#999" />
                  </Pressable>
                )}
              </View>

              <View style={styles.zipInputContainer}>
                <Ionicons
                  name="location"
                  size={16}
                  color="#999"
                  style={styles.zipIcon}
                />
                <TextInput
                  style={styles.zipInput}
                  placeholder="Zip"
                  placeholderTextColor="#999"
                  value={zipCode}
                  onChangeText={setZipCode}
                  keyboardType="number-pad"
                  maxLength={5}
                />
              </View>

              <Pressable style={styles.searchButton} onPress={handleSearch}>
                <LinearGradient
                  colors={['#4facfe', '#00f2fe']}
                  style={styles.searchButtonGradient}
                >
                  <Ionicons name="search" size={20} color="#fff" />
                </LinearGradient>
              </Pressable>
            </View>

            {selectedIngredient && (
              <View style={styles.selectedIngredient}>
                <Text style={styles.selectedEmoji}>
                  {selectedIngredient.icon}
                </Text>
                <View style={styles.selectedInfo}>
                  <Text style={styles.selectedName}>
                    {selectedIngredient.name}
                  </Text>
                  <Text style={styles.selectedChinese}>
                    {selectedIngredient.chineseName}
                  </Text>
                </View>
              </View>
            )}
          </View>

          {/* Results */}
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {nearbyMarkets.length === 0 && !selectedIngredient ? (
              <View style={styles.emptyState}>
                <Ionicons
                  name="storefront-outline"
                  size={80}
                  color="rgba(255,255,255,0.3)"
                />
                <Text style={styles.emptyTitle}>Find Local Markets</Text>
                <Text style={styles.emptyText}>
                  Search for an ingredient to discover nearby stores that have
                  it in stock
                </Text>

                <View style={styles.popularIngredients}>
                  <Text style={styles.popularTitle}>Popular Ingredients:</Text>
                  <View style={styles.popularList}>
                    {INGREDIENTS.slice(0, 6).map((ingredient) => (
                      <Pressable
                        key={ingredient.id}
                        style={styles.popularChip}
                        onPress={() => {
                          setSearchQuery(ingredient.name)
                          handleIngredientSelect(ingredient)
                        }}
                      >
                        <Text style={styles.popularEmoji}>
                          {ingredient.icon}
                        </Text>
                        <Text style={styles.popularText}>
                          {ingredient.name}
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                </View>
              </View>
            ) : nearbyMarkets.length === 0 && selectedIngredient ? (
              <View style={styles.noResults}>
                <Ionicons
                  name="sad-outline"
                  size={60}
                  color="rgba(255,255,255,0.5)"
                />
                <Text style={styles.noResultsTitle}>No Markets Found</Text>
                <Text style={styles.noResultsText}>
                  We could not find any stores with {selectedIngredient.name} in
                  your area. Try a different ingredient!
                </Text>
              </View>
            ) : (
              <>
                <Text style={styles.resultsTitle}>
                  {nearbyMarkets.length}{' '}
                  {nearbyMarkets.length === 1 ? 'market' : 'markets'} nearby
                </Text>

                {nearbyMarkets.map((market) => (
                  <Pressable
                    key={market.id}
                    style={styles.marketCard}
                    onPress={() => openMarketDetails(market)}
                  >
                    <View style={styles.marketHeader}>
                      <View style={styles.marketTitleRow}>
                        <Text style={styles.marketName}>{market.name}</Text>
                        <View style={styles.ratingContainer}>
                          <Ionicons name="star" size={14} color="#ffc107" />
                          <Text style={styles.ratingText}>{market.rating}</Text>
                        </View>
                      </View>
                      <View
                        style={[
                          styles.marketTypeBadge,
                          { backgroundColor: getMarketTypeColor(market.type) },
                        ]}
                      >
                        <Text style={styles.marketTypeText}>
                          {getMarketTypeLabel(market.type)}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.marketInfo}>
                      <View style={styles.infoRow}>
                        <Ionicons name="location" size={16} color="#666" />
                        <Text style={styles.infoText}>{market.address}</Text>
                      </View>

                      <View style={styles.infoRow}>
                        <Ionicons name="walk" size={16} color="#666" />
                        <Text style={styles.infoText}>
                          {market.distance} miles away
                        </Text>
                        <Text style={styles.priceRange}>
                          {market.priceRange}
                        </Text>
                      </View>

                      <View style={styles.infoRow}>
                        <Ionicons name="time" size={16} color="#666" />
                        <Text style={styles.infoText}>{market.hours}</Text>
                      </View>
                    </View>

                    <View style={styles.specialtiesContainer}>
                      {market.specialties.map((specialty, idx) => (
                        <View key={idx} style={styles.specialtyChip}>
                          <Text style={styles.specialtyText}>{specialty}</Text>
                        </View>
                      ))}
                    </View>

                    <View style={styles.marketActions}>
                      <Pressable
                        style={styles.actionButton}
                        onPress={() => openMaps(market)}
                      >
                        <Ionicons name="navigate" size={18} color="#667eea" />
                        <Text style={styles.actionText}>Directions</Text>
                      </Pressable>

                      <Pressable
                        style={styles.actionButton}
                        onPress={() => callMarket(market.phone)}
                      >
                        <Ionicons name="call" size={18} color="#667eea" />
                        <Text style={styles.actionText}>Call</Text>
                      </Pressable>

                      <Pressable
                        style={styles.actionButton}
                        onPress={() => openMarketDetails(market)}
                      >
                        <Ionicons
                          name="information-circle"
                          size={18}
                          color="#667eea"
                        />
                        <Text style={styles.actionText}>Details</Text>
                      </Pressable>
                    </View>
                  </Pressable>
                ))}
              </>
            )}
          </ScrollView>
        </View>
      </SafeAreaView>

      {/* Ingredient Picker Modal */}
      <Modal visible={showIngredientPicker} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.pickerModal}>
            <View style={styles.pickerHeader}>
              <Text style={styles.pickerTitle}>Select Ingredient</Text>
              <Pressable onPress={() => setShowIngredientPicker(false)}>
                <Ionicons name="close" size={24} color="#333" />
              </Pressable>
            </View>

            <ScrollView style={styles.pickerScroll}>
              {searchResults.map((ingredient) => (
                <Pressable
                  key={ingredient.id}
                  style={styles.ingredientOption}
                  onPress={() => handleIngredientSelect(ingredient)}
                >
                  <Text style={styles.ingredientEmoji}>{ingredient.icon}</Text>
                  <View style={styles.ingredientInfo}>
                    <Text style={styles.ingredientName}>{ingredient.name}</Text>
                    <Text style={styles.ingredientChinese}>
                      {ingredient.chineseName}
                    </Text>
                  </View>
                  <View style={styles.categoryBadge}>
                    <Text style={styles.categoryText}>
                      {ingredient.category}
                    </Text>
                  </View>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Market Details Modal */}
      <Modal visible={showMarketModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.detailsModal}>
            <Pressable
              style={styles.closeButton}
              onPress={() => setShowMarketModal(false)}
            >
              <Ionicons name="close" size={24} color="#333" />
            </Pressable>

            {selectedMarket && (
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.detailsHeader}>
                  <Text style={styles.detailsTitle}>{selectedMarket.name}</Text>
                  <View style={styles.detailsRating}>
                    {renderStars(Math.floor(selectedMarket.rating))}
                    <Text style={styles.detailsRatingText}>
                      {selectedMarket.rating} / 5.0
                    </Text>
                  </View>
                </View>

                <View style={styles.detailsSection}>
                  <Text style={styles.detailsSectionTitle}>📍 Location</Text>
                  <Text style={styles.detailsText}>
                    {selectedMarket.address}
                  </Text>
                  <Text style={styles.detailsDistance}>
                    {selectedMarket.distance} miles away
                  </Text>
                </View>

                <View style={styles.detailsSection}>
                  <Text style={styles.detailsSectionTitle}>🕐 Hours</Text>
                  <Text style={styles.detailsText}>{selectedMarket.hours}</Text>
                </View>

                <View style={styles.detailsSection}>
                  <Text style={styles.detailsSectionTitle}>📞 Contact</Text>
                  <Text style={styles.detailsText}>{selectedMarket.phone}</Text>
                </View>

                <View style={styles.detailsSection}>
                  <Text style={styles.detailsSectionTitle}>✨ Specialties</Text>
                  <View style={styles.specialtiesList}>
                    {selectedMarket.specialties.map((specialty, idx) => (
                      <Text key={idx} style={styles.specialtyItem}>
                        • {specialty}
                      </Text>
                    ))}
                  </View>
                </View>

                <View style={styles.detailsSection}>
                  <Text style={styles.detailsSectionTitle}>🛒 In Stock</Text>
                  <View style={styles.stockList}>
                    {selectedMarket.hasInStock.map((ingredientId) => {
                      const ingredient = getIngredientById(ingredientId)
                      return ingredient ? (
                        <View key={ingredientId} style={styles.stockItem}>
                          <Text style={styles.stockEmoji}>
                            {ingredient.icon}
                          </Text>
                          <Text style={styles.stockName}>
                            {ingredient.name}
                          </Text>
                        </View>
                      ) : null
                    })}
                  </View>
                </View>

                <View style={styles.detailsActions}>
                  <Pressable
                    style={styles.detailsActionButton}
                    onPress={() => {
                      openMaps(selectedMarket)
                      setShowMarketModal(false)
                    }}
                  >
                    <LinearGradient
                      colors={['#4facfe', '#00f2fe']}
                      style={styles.detailsActionGradient}
                    >
                      <Ionicons name="navigate" size={20} color="#fff" />
                      <Text style={styles.detailsActionText}>
                        Get Directions
                      </Text>
                    </LinearGradient>
                  </Pressable>

                  <Pressable
                    style={styles.detailsActionButton}
                    onPress={() => {
                      callMarket(selectedMarket.phone)
                      setShowMarketModal(false)
                    }}
                  >
                    <LinearGradient
                      colors={['#f093fb', '#f5576c']}
                      style={styles.detailsActionGradient}
                    >
                      <Ionicons name="call" size={20} color="#fff" />
                      <Text style={styles.detailsActionText}>Call Now</Text>
                    </LinearGradient>
                  </Pressable>
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
  content: {
    flex: 1,
  },
  searchHeader: {
    padding: 16,
    paddingTop: 10,
  },
  searchRow: {
    flexDirection: 'row',
    gap: 8,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 45,
    fontSize: 16,
    color: '#333',
  },
  clearButton: {
    padding: 4,
  },
  zipInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 10,
    width: 90,
  },
  zipIcon: {
    marginRight: 4,
  },
  zipInput: {
    flex: 1,
    height: 45,
    fontSize: 16,
    color: '#333',
  },
  searchButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  searchButtonGradient: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedIngredient: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 12,
    padding: 12,
    marginTop: 12,
  },
  selectedEmoji: {
    fontSize: 32,
    marginRight: 12,
  },
  selectedInfo: {
    flex: 1,
  },
  selectedName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  selectedChinese: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingTop: 0,
  },
  emptyState: {
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 16,
    color: '#f0f0f0',
    textAlign: 'center',
    paddingHorizontal: 30,
    lineHeight: 22,
  },
  popularIngredients: {
    marginTop: 40,
    width: '100%',
  },
  popularTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 15,
  },
  popularList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  popularChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    gap: 6,
  },
  popularEmoji: {
    fontSize: 18,
  },
  popularText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
  },
  noResults: {
    alignItems: 'center',
    paddingTop: 60,
  },
  noResultsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
    marginBottom: 10,
  },
  noResultsText: {
    fontSize: 15,
    color: '#f0f0f0',
    textAlign: 'center',
    paddingHorizontal: 30,
    lineHeight: 22,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  marketCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  marketHeader: {
    marginBottom: 12,
  },
  marketTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  marketName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  marketTypeBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  marketTypeText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
  marketInfo: {
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  priceRange: {
    fontSize: 14,
    fontWeight: '600',
    color: '#52c41a',
  },
  specialtiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 12,
  },
  specialtyChip: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  specialtyText: {
    fontSize: 12,
    color: '#666',
  },
  marketActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionText: {
    fontSize: 14,
    color: '#667eea',
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  pickerModal: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    maxHeight: '70%',
  },
  pickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  pickerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  pickerScroll: {
    maxHeight: 400,
  },
  ingredientOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  ingredientEmoji: {
    fontSize: 32,
    marginRight: 12,
  },
  ingredientInfo: {
    flex: 1,
  },
  ingredientName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  ingredientChinese: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  categoryBadge: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  categoryText: {
    fontSize: 11,
    color: '#666',
    textTransform: 'capitalize',
  },
  detailsModal: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 25,
    paddingBottom: 35,
    maxHeight: '85%',
  },
  closeButton: {
    position: 'absolute',
    right: 20,
    top: 20,
    zIndex: 1,
    padding: 5,
  },
  detailsHeader: {
    marginTop: 20,
    marginBottom: 20,
  },
  detailsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  detailsRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailsRatingText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  detailsSection: {
    marginBottom: 20,
  },
  detailsSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  detailsText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  detailsDistance: {
    fontSize: 13,
    color: '#999',
    marginTop: 4,
  },
  specialtiesList: {
    marginTop: 5,
  },
  specialtyItem: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
    lineHeight: 20,
  },
  stockList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 5,
  },
  stockItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    gap: 6,
  },
  stockEmoji: {
    fontSize: 16,
  },
  stockName: {
    fontSize: 13,
    color: '#555',
  },
  detailsActions: {
    gap: 12,
    marginTop: 10,
  },
  detailsActionButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  detailsActionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    gap: 8,
  },
  detailsActionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
})
