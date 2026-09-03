import { useLayoutEffect } from 'react'
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Alert,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { FontAwesome } from '@expo/vector-icons'
import { default as NotFound } from '../../../../assets/NotFound.png'
import type { RootStackParamList } from '../../../app/navigation/types'
import CategorySelector from '../components/CategorySelector'
import PlaceCard from '../components/PlaceCard'
import usePlacesSearch from '../hooks/usePlacesSearch'
import { EXPO_PUBLIC_I_AM_TRAVELLER as I_AM_TRAVELLER } from '@env'

type DiscoverNavigation = NativeStackNavigationProp<RootStackParamList, 'Discover'>

const randomnumber = Math.floor(Math.random() * 100)
const avatar = `https://randomuser.me/api/portraits/women/${randomnumber}.jpg`

const DiscoverScreen = () => {
  const navigation = useNavigation<DiscoverNavigation>()
  const { isLoading, places, setSearchType, setSearchViewport } = usePlacesSearch()

  //   If there are changes in the UI it re-renders the entire UI
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [navigation])

  return (
    <SafeAreaView>
      <View className="flex-row items-center justify-between px-8">
        <View>
          <Text className="text-[40px] text-[#0B646B] font-bold">Explore</Text>
          <Text className="text-[#527283] text-[36px]">the world</Text>
        </View>
        <View className="w-12 h-12 bg-gray-400 rounded-md items-center justify-center shadow-lg">
          <Image src={avatar} className="w-full h-full rounded-md" />
        </View>
      </View>
      <View>
        <View className="bg-white rounded-xl mx-4 py-1 px-4 shadow-lg z-50">
          <GooglePlacesAutocomplete
            placeholder="Search"
            GooglePlacesDetailsQuery={{ fields: 'geometry' }}
            fetchDetails={true}
            keyboardShouldPersistTaps="always"
            minLength={2}
            predefinedPlaces={[]} // ✅ avoids filter on undefined
            debounce={200}
            onFail={(error) => console.error(error)}
            onPress={(data, details) => {
              // 'details' is provided when fetchDetails = true
              console.log('Selected place:', data)
              console.log('Details:', details) // this now contains the geometry

              setSearchViewport(details?.geometry?.viewport)
            }}
            query={{
              key: I_AM_TRAVELLER,
              language: 'en',
            }}
            textInputProps={{
              placeholderTextColor: '#999',
              onFocus: () => console.log('Input focused'),
              onBlur: () => console.log('Input blurred'),
            }}
            enablePoweredByContainer={false}
            styles={{
              container: { flex: 0, zIndex: 10 },
              listView: { zIndex: 20, elevation: 5 },
            }}
            // suppressDefaultStyles
          />
        </View>
        <ScrollView keyboardShouldPersistTaps="always">
          <View>
            <CategorySelector setSearchType={setSearchType} />
          </View>
          <View className="flex-row items-center justify-around px-4 pb-4 mt-6">
            <Text className="text-[#2C7379] text-[28px] font-bold">Top Tips</Text>
            <TouchableOpacity
              onPress={() => Alert.alert(`Hold on! This area is in developing!`)}
              className="flex-row items-center justify-center space-x-2"
            >
              <Text className="text-[#A0C4C7] text-[20px] font-bold">Discover</Text>
              <FontAwesome name="long-arrow-right" size={24} color="#A0C4C7" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      {isLoading ? (
        <View className="">
          <ActivityIndicator size="large" color="#0B646B" />
        </View>
      ) : places.length > 0 ? (
        <FlatList
          numColumns={2}
          data={places}
          keyExtractor={(place, index) => `${place.location_id ?? 'place'}-${index}`}
          renderItem={({ item, index }) => <PlaceCard cardData={item} index={index} />}
        />
      ) : (
        <View className="w-full h-[400px] items-center space-y-8 justify-center">
          <Image source={NotFound} className=" w-32 h-32 object-cover" />
          <Text className="text-2xl text-[#428288] font-semibold">Opps...No Data Found!</Text>
        </View>
      )}
    </SafeAreaView>
  )
}

export default DiscoverScreen
