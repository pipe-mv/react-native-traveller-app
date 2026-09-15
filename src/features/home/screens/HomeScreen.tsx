import { useLayoutEffect } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import * as Animatable from 'react-native-animatable'
import { default as HerosImage } from '../../../../assets/heros.png'
import Airplane from '../../../../assets/airplane-1024.png'
import type { RootStackParamList } from '../../../app/navigation/types'
import { useHomeScreenStyles } from './HomeScreen.styles'

type HomeNavigation = NativeStackNavigationProp<RootStackParamList, 'Home'>

const HomeScreen = () => {
  const navigation = useNavigation<HomeNavigation>()
  const styles = useHomeScreenStyles()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [navigation])

  return (
    <SafeAreaView edges={['top', 'left', 'right']} className="bg-white flex-1 relative">
      {/* First Session */}
      <View className="flex-row items-center" style={styles.header}>
        <View
          className="bg-black rounded-full items-center justify-center"
          style={styles.logoContainer}
        >
          <Image
            source={Airplane}
            accessibilityLabel="Traveller airplane logo created by Freepik - Flaticon"
            style={styles.logo}
          />
        </View>
        <Text className="text-[#2A2B4B] font-semibold" style={styles.brandTitle}>
          Traveller
        </Text>
      </View>
      {/* Second Session */}
      <View style={styles.introduction}>
        <Text className="text-[#3C6072]" style={styles.introductionTitle}>
          Explore the World:
        </Text>
        <Text className="text-[#00BCC9] font-bold" style={styles.introductionSubtitle}>
          Your Next Adventure Awaits
        </Text>

        <Text className="text-[#3C6072]" style={styles.description}>
          Embrace the spirit of exploration. Let your curiosity lead the way, and let us be your
          guide to unforgettable experiences. Whether you're a seasoned traveler or embarking on
          your first big adventure, we have everything you need to make your journey remarkable.
        </Text>
      </View>
      {/* Image container */}
      <View className="flex-1 relative items-center overflow-hidden">
        {/* Circle Section */}
        <View className="bg-[#00BCC9] rounded-full absolute" style={styles.tealCircle} />
        <View className="bg-[#E99265] rounded-full absolute" style={styles.orangeCircle} />
        <View className="absolute bottom-0 overflow-hidden" style={styles.heroWindow}>
          <Animatable.Image
            animation="fadeIn"
            easing="ease-in-out"
            source={HerosImage}
            resizeMode="contain"
            style={styles.heroImage}
          />
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('Discover')}
          className="absolute border-l-2 border-r-2 border-t-4 border-[#00BCC9] rounded-full items-center justify-center"
          style={styles.button}
        >
          <Animatable.View
            animation="pulse"
            easing="ease-in-out"
            iterationCount="infinite"
            className="items-center justify-center rounded-full bg-[#00BCC9]"
            style={styles.buttonInner}
          >
            <Text className="text-gray-50 font-semibold" style={styles.buttonText}>
              Go
            </Text>
          </Animatable.View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen
