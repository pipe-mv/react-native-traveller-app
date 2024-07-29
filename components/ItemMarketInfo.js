import { View, Text } from 'react-native'
import React from 'react'
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons'

export default function ItemMarketInfo({ rating, price_level, bearing }) {
  return (
    <View className="flex-row pt-6 justify-between">
      <View className="flex-row items-center space-x-2 ">
        <View className="h-12 w-12 rounded-2xl bg-red-100 items-center justify-center shadow-md">
          <FontAwesome name="star" size={24} color="#D58574" />
        </View>
        <View>
          <Text className="text-[#515151]">{rating}</Text>
          <Text className="text-[#515151]">Ratings</Text>
        </View>
      </View>
      <View className="flex-row items-center space-x-2 ">
        <View className="h-12 w-12 rounded-2xl bg-red-100 items-center justify-center shadow-md">
          <FontAwesome5 name="dollar-sign" size={24} color="#D58574" />
        </View>
        <View>
          <Text className="text-[#515151]">{price_level}</Text>
          <Text className="text-[#515151]">Price Level</Text>
        </View>
      </View>
      <View className="flex-row items-center space-x-2 ">
        <View className="h-12 w-12 rounded-2xl bg-red-100 items-center justify-center shadow-md">
          <FontAwesome5 name="map-signs" size={24} color="#D58574" />
        </View>
        <View>
          <Text className="text-[#515151]">{bearing}</Text>
          <Text className="text-[#515151]">Bearing</Text>
        </View>
      </View>
    </View>
  )
}
