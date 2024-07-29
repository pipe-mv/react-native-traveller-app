import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { default as Hotels } from '../assets/hotels.png'
import { default as Attractions } from '../assets/fair.png'
import { default as Restaurants } from '../assets/icon-restaurants.png'

export default function MenuContainer({ setSearchType }) {
  const handlePress = (type) => {
    setSearchType(type)
  }
  return (
    <View className="flex-row items-center justify-between px-4 mt-8">
      <TouchableOpacity onPress={() => handlePress('hotels')}>
        <View className="w-26 h-26 shadow-sm rounded-full justify-center items-center ">
          <Image source={Hotels} className="w-24 h-24" />
          <Text className="text-[#00BCC9] font-semibold text-xl text-center">Hotels</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handlePress('attractions')}>
        <View className="w-26 h-26 shadow-sm rounded-full justify-center items-center">
          <Image source={Attractions} className="w-24 h-24" />
          <Text className="text-[#00BCC9] font-semibold text-xl text-center">Attractions</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handlePress('restaurants')}>
        <View className="w-26 h-26 shadow-sm rounded-full justify-center items-center">
          <Image source={Restaurants} className="w-24 h-24" />
          <Text className="text-[#00BCC9] font-semibold text-xl text-center">Restaurants</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}
