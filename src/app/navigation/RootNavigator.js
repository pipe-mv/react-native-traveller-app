import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import HomeScreen from '../../features/home/screens/HomeScreen'
import DiscoverScreen from '../../features/places/screens/DiscoverScreen'
import PlaceDetailsScreen from '../../features/places/screens/PlaceDetailsScreen'

const Stack = createNativeStackNavigator()

export default function RootNavigator() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Discover" component={DiscoverScreen} />
          <Stack.Screen name="ItemScreen" component={PlaceDetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}
