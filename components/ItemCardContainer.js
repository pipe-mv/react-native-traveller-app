import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { FontAwesome6 } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

export default function ItemCardContainer({ cardData, index }) {
//   console.log('line 6', cardData)
  // console.log(index)
  const image = cardData?.photo?.images?.medium?.url
    ? cardData?.photo?.images?.medium?.url
    : 'https://cdn.pixabay.com/photo/2015/10/30/12/22/eat-1014025_1280.jpg'
  const title = cardData.name ? cardData.name : ''
  const location = cardData.location_string ? cardData.location_string : ''

  const navigation = useNavigation()
  return (
    <>
      <TouchableOpacity
        onPress={() => navigation.navigate("ItemScreen", { param: cardData, index })}
        className="flex w-[190px] px-4 mt-2 shadow-md items-center justify-between flex-wrap"
      >
        <View className="w-[170px] bg-white py-2 px-2 shadow-md my-2 rounded-md">
          <Image src={image} className="w-full h-36 rounded-md object-cover" />
          <Text className="text-[#428288] text-[16px] font-bold">
            {title?.length > 14 ? `${title.slice(0, 15)}..` : title}
          </Text>
          <View className="flex-row items-center space-x-1">
            <FontAwesome6 name="map-location-dot" size={20} color="#8597A2" />
            <Text className="text-[#428288] text-[12px] font-bold">
              {location?.length > 16 ? `${location.slice(0, 16)}..` : location}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </>
  )
}
