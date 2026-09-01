import type { Place } from '../../features/places/types/place'

export type RootStackParamList = {
  Home: undefined
  Discover: undefined
  ItemScreen: {
    param: Place
    index: number
  }
}
