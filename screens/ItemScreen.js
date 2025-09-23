import { useNavigation } from '@react-navigation/native'
import { useLayoutEffect } from 'react'
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesome5, FontAwesome6 } from '@expo/vector-icons'
import ItemMarketInfo from '../components/ItemMarketInfo'
import ItemBooking from '../components/ItemBooking'

const ItemScreen = ({ route }) => {
  const navigation = useNavigation()
  const { param: cardData, index } = route?.params
  const image = cardData?.photo?.images?.medium?.url
    ? cardData?.photo?.images?.medium?.url
    : 'https://cdn.pixabay.com/photo/2015/10/30/12/22/eat-1014025_1280.jpg'

  const {
    price_level,
    price,
    open_now_text,
    name,
    location_string,
    rating,
    bearing,
    description,
    cuisine,
    phone,
    email,
    address,
  } = cardData
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])

  return (
    <SafeAreaView className="flex-1 ">
      <ScrollView className="flex-1 px-4 py6 bg-white relative">
        <View>
          <Image src={image} className="w-full h-72 rounded-2xl" />
          <View className="absolute flex-row inset-x-0 top-5 justify-between px-6">
            <TouchableOpacity
              onPress={() => navigation.navigate('Discover')}
              className="bg-white w-10 h-10  justify-center items-center rounded-md"
            >
              <FontAwesome6 name="chevron-left" size={24} color="#06B2BE" />
            </TouchableOpacity>
            <TouchableOpacity className="bg-[#06B2BE] w-10 h-10 justify-center items-center rounded-md">
              <FontAwesome5 name="heartbeat" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
          <View className="absolute flex-row inset-x-0 bottom-5 items-center justify-between px-6">
            <View className="flex-row space-x-2 items-center">
              {price ? (
                <Text className="text-[32px] text-gray-100 font-bold">{price}</Text>
              ) : (
                <Text className="text-[32px] text-gray-100 font-bold">{price_level}</Text>
              )}
            </View>
            <View className="h-6 bg-teal-100 rounded-md px-2 py-1 items-center justify-center">
              <Text>{open_now_text}</Text>
            </View>
          </View>
        </View>
        <View>
          <Text className="text-[#428288] mt-6 text-[24px] font-bold">{name}</Text>
          <View className="flex-row space-x-2 items-center mt-2">
            <FontAwesome5 name="map-marker-alt" size={25} color="black" />
            <Text className="text-[#8C9EA6] text-[20px] font-bold">
              {' '}
              {location_string?.length > 30 ? `${location_string.slice(0, 30)}..` : location_string}
            </Text>
          </View>
        </View>
        <ItemMarketInfo rating={rating} price_level={price_level} bearing={bearing} />
        {description && (
          <Text className="tracking-wide text-[16px] font-semibold text-[#97A6AF] pt-6">
            {description}
          </Text>
        )}
        {cuisine && (
          <View className="flex-row gap-2 flex-wrap mt-6 items-center">
            {cuisine.map((n, i) => (
              <TouchableOpacity key={i} className="text-black bg-emerald-200 px-1 py-1 rounded-lg">
                <Text>{n.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        <ItemBooking email={email} phone={phone} address={address} />
      </ScrollView>
    </SafeAreaView>
  )
}

export default ItemScreen
