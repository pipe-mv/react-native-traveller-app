import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
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
import { SafeAreaView } from 'react-native-safe-area-context'
import { default as NotFound } from '../assets/NotFound.png'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import MenuContainer from '../components/MenuContainer'
import { FontAwesome } from '@expo/vector-icons'
import ItemCardContainer from '../components/ItemCardContainer'
import { getPlacesData } from '../api'
// import { I_AM_TRAVELLER } from '@env'

const I_AM_TRAVELLER = process.env.EXPO_PUBLIC_I_AM_TRAVELLER

const randomnumber = Math.floor(Math.random() * 100)
const avatar = `https://randomuser.me/api/portraits/women/${randomnumber}.jpg`

const Discover = () => {
  const navigation = useNavigation()
  const [isLoading, setIsLoading] = useState(false)
  const [mainData, setMainData] = useState([])
  const [topRightLatitude, setTopRightLatitud] = useState(null)
  const [topRightLongitude, setTopRightLongitude] = useState(null)
  const [bottomLeftLatitude, setBottomLeftLatitude] = useState(null)
  const [bottomLeftLongitude, setBottomLeftLongitude] = useState(null)
  const [searchType, setSearchType] = useState('restaurants')

  //   If there are changes in the UI it re-renders the entire UI
  useLayoutEffect(() => {
    navigation.setOptions({
      headershow: false,
    })
  }, [])

  //   Re-render the component once it changes
  useEffect(() => {
    setIsLoading(true)
    getPlacesData(
      bottomLeftLatitude,
      bottomLeftLongitude,
      topRightLatitude,
      topRightLongitude,
      searchType
    ).then((data) => {
      setMainData(data)

      setInterval(() => {
        setIsLoading(false)
      }, 2000)
    })
  }, [bottomLeftLatitude, bottomLeftLongitude, topRightLatitude, topRightLongitude, searchType])

  console.log('Google API key in use:', I_AM_TRAVELLER)

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
        <View className="flex-row items-center bg-white justify-center rounded-xl mx-4 py-1 px-4 shadow-lg">
          <GooglePlacesAutocomplete
            placeholder="Search"
            GooglePlacesDetailsQuery={{ fields: ['geometry'] }}
            fetchDetails={true}
            minLength={2}
            predefinedPlaces={[]}   // ✅ avoids filter on undefined
            debounce={200}
            onFail={(error) => console.error(error)}
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              setBottomLeftLatitude(details?.geometry?.viewport?.southwest?.lat)
              setBottomLeftLongitude(details?.geometry?.viewport?.southwest?.lng)
              setTopRightLatitud(details?.geometry?.viewport?.northeast?.lat)
              setTopRightLongitude(details?.geometry?.viewport?.northeast?.lng)
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
            styles={{
              container: { flex: 1 }, // 👈 prevent crash
            // textInput: {
            //   height: 44,
            //   borderRadius: 5,
            //   paddingHorizontal: 10,
            //   backgroundColor: '#fff',
            //   // flex: 1,          // ✅ allow input to grow
            //   color: '#000',    // optional: makes text readable
            // },
            // listView: { backgroundColor: '#fff' },
            }}
          />
        </View>
        <ScrollView>
          {/* <View className="flex-row items-center justify-between px-4 mt-8"> */}
          <View>
            <MenuContainer setSearchType={setSearchType} />
          </View>
          <View className="flex-row items-center justify-around px-4 pb-4 mt-6">
            <Text className="text-[#2C7379] text-[28px] font-bold">Top Tips</Text>
            <TouchableOpacity
              onPress={() =>
                Alert.alert(`Hold on!
This area is in developing!`)
              }
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
      ) : Array.isArray(mainData) && mainData.length > 0 ? (
        <FlatList
          numColumns={2}
          data={mainData}
          keyExtractor={(mainData) => mainData.location_id}
          renderItem={({ item, index }) => <ItemCardContainer cardData={item} index={index} />}
        />
      ) : (
        <>
          <View className="w-full h-[400px] items-center space-y-8 justify-center">
            <Image source={NotFound} className=" w-32 h-32 object-cover" />
            <Text className="text-2xl text-[#428288] font-semibold">Opps...No Data Found!</Text>
          </View>
        </>
      )}
    </SafeAreaView>
  )
}

export default Discover
