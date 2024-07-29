import { View, Text } from 'react-native'
import React from 'react'
import { FontAwesome5 } from '@expo/vector-icons'

export default function ItemBooking({ email, phone, address }) {
  return (
    <View className="bg-gray-200 rounded-xl space-y-2 justify-items-center mt-6 px-4 pt-4 ">
      {phone && (
        <View className="flex-row gap-2  items-center space-x-6">
          <FontAwesome5 name="phone" size={24} color="#428288" />
          <Text className="text-lg">{phone}</Text>
        </View>
      )}
      {email && (
        <View className="flex-row items-center space-x-6">
          <FontAwesome5 name="envelope" size={24} color="#428288" />
          <Text className="text-lg">{email}</Text>
        </View>
      )}
      {address && (
        <View className="flex-row items-center space-x-6">
          <FontAwesome5
            className="items-center justify-center px-9"
            name="map-pin"
            size={32}
            color="#428288"
          />
          <Text className="text-lg">{address}</Text>
        </View>
      )}
      <View className="bg-[#06B2BE] rounded-lg m-4 p-4 items-center justify-center">
        <Text className="text-gray-200 text-3xl font-semibold uppercase tracking-wider ">
          Book Now
        </Text>
      </View>
    </View>
  )
}
