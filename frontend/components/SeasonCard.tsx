import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ImageBackground,
  Dimensions,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolate,
} from 'react-native-reanimated'
import { Season } from '../constants/seasons'

const { width } = Dimensions.get('window')
const CARD_WIDTH = (width - 48) / 2
const CARD_HEIGHT = CARD_WIDTH * 1.3

interface SeasonCardProps {
  season: Season
  onPress: () => void
  index: number
}

export default function SeasonCard({
  season,
  onPress,
  index,
}: SeasonCardProps) {
  const scale = useSharedValue(1)
  const pressed = useSharedValue(0)

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: withSpring(scale.value) },
        {
          translateY: interpolate(pressed.value, [0, 1], [0, 2]),
        },
      ],
    }
  })

  const handlePressIn = () => {
    scale.value = 0.95
    pressed.value = withSpring(1)
  }

  const handlePressOut = () => {
    scale.value = 1
    pressed.value = withSpring(0)
  }

  return (
    <Animated.View style={[styles.cardContainer, animatedStyle]}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.pressable}
      >
        <ImageBackground
          source={season.image}
          style={styles.imageBackground}
          imageStyle={styles.image}
        >
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)']}
            style={styles.gradient}
          >
            <View style={styles.cardContent}>
              <Text style={styles.emoji}>{season.emoji}</Text>
              <Text style={styles.seasonName}>{season.name}</Text>
              <Text style={styles.seasonSubtitle}>{season.subtitle}</Text>
            </View>
          </LinearGradient>
        </ImageBackground>
      </Pressable>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    marginBottom: 16,
  },
  pressable: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  image: {
    borderRadius: 20,
  },
  gradient: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 16,
  },
  cardContent: {
    alignItems: 'center',
  },
  emoji: {
    fontSize: 40,
    marginBottom: 8,
  },
  seasonName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  seasonSubtitle: {
    fontSize: 14,
    color: '#f0f0f0',
    marginBottom: 8,
  },
  monthsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  months: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
})
