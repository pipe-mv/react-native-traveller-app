import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'
import { PLACES_DATA } from '@env'
import type { Place, PlaceCategory } from '../types/place'

type Coordinate = number | string | null | undefined

type PlacesResponse = {
  data: Place[]
}

const options = (
  bottomLeftLatitude: Coordinate,
  bottomLeftLongitude: Coordinate,
  topRightLatitude: Coordinate,
  topRightLongitude: Coordinate,
  searchType: PlaceCategory
): AxiosRequestConfig => {
  return {
    method: 'GET',
    url: `https://travel-advisor.p.rapidapi.com/${searchType}/list-in-boundary`,
    params: {
      tr_latitude: topRightLatitude ? topRightLatitude : '-37.51127',
      tr_longitude: topRightLongitude ? topRightLongitude : '145.51252',
      bl_latitude: bottomLeftLatitude ? bottomLeftLatitude : '-38.43385',
      bl_longitude: bottomLeftLongitude ? bottomLeftLongitude : '144.5937',
      restaurant_tagcategory_standalone: '10591',
      restaurant_tagcategory: '10591',
      limit: '30',
      currency: 'USD',
      open_now: 'false',
      lunit: 'km',
      lang: 'en_US',
    },
    headers: {
      'x-rapidapi-key': PLACES_DATA,
      'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
    },
  }
}

export const getPlacesData = async (
  bottomLeftLatitude: Coordinate,
  bottomLeftLongitude: Coordinate,
  topRightLatitude: Coordinate,
  topRightLongitude: Coordinate,
  searchType: PlaceCategory
): Promise<Place[] | undefined> => {
  try {
    const {
      data: { data },
    } = await axios.request<PlacesResponse>(
      options(bottomLeftLatitude, bottomLeftLongitude, topRightLatitude, topRightLongitude, searchType)
    )
    // console.log('api',data)
    return data
  } catch (error) {
    console.error(error)
  }
}
