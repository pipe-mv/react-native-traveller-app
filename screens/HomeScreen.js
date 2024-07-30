import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { default as HerosImage } from '../assets/heros.png'
import * as Animatable from 'react-native-animatable'
import { default as Airplane } from '../assets/airplane.png'

const HomeScreen = () => {
  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])

  return (
    <SafeAreaView className="bg-white flex-1 relative">
      {/* First Session */}
      <View className="flex-row px-6 mt-8 items-center space-x-2">
        <View className="w-16 h-16 bg-black rounded-full items-center justify-center  mx-4">
          <Image
            source={Airplane}
            title="Travel icons created by Freepik - Flaticon"
            className="w-20 h-20 items-center justify-center  bg-transparent px-10"
          />
        </View>
        <Text className="text[#2A2B4B] text-3xl font-semibold">Traveller</Text>
      </View>
      {/* Second Session */}
      <View className="px-6 mt-8 space-y-3">
        <Text className="text-[#3C6072] text-[42px]">Explore the World:</Text>
        <Text className="text-[#00BCC9] text-[38px] font-bold">Your Next Adventure Awaits</Text>

        <Text className="text-[#3C6072] text-base">
          Embrace the spirit of exploration. Let your curiosity lead the way, and let us be your
          guide to unforgettable experiences. Whether you're a seasoned traveler or embarking on
          your first big adventure, we have everything you need to make your journey remarkable.
        </Text>
      </View>
      {/* Circle Section */}
      <View className="w-[300px] h-[300px] bg-[#00BCC9] rounded-full absolute bottom-20 -right-36"></View>
      <View className="w-[400px] h-[400px] bg-[#E99265] rounded-full absolute -bottom-10 -left-36"></View>
      {/* Image container */}
      <View className="flex-1 relative items-center justify-center">
        <Animatable.Image
          animation="fadeIn"
          easing="ease-in-out"
          source={HerosImage}
          className="w-[400px] h-[450px] mt-40 "
        />

        <TouchableOpacity
          onPress={() => navigation.navigate('Discover')}
          className="absolute bottom-20 w-24 h-24 border-l-2 border-r-2 border-t-4 border-[#00BCC9] rounded-full items-center justify-center"
        >
          <Animatable.View
            animation={'pulse'}
            easing="ease-in-out"
            iterationCount={'infinite'}
            className="w-20 h-20 items-center justify-center rounded-full bg-[#00BCC9]"
          >
            <Text className="text-gray-50 text-[36px] font-semibold">Go</Text>
          </Animatable.View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen
