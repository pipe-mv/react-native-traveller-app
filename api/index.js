import axios from 'axios'
import { PLACES_DATA } from '@env'

const options = (
  bottomLeftLatitude,
  bottomLeftLongitude,
  topRightLatitude,
  topRightLongitude,
  searchType
) => {
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
  bottomLeftLatitude,
  bottomLeftLongitude,
  topRightLatitude,
  topRightLongitude,
  searchType
) => {
  try {
    const {
      data: { data },
    } = await axios.request(
      options(topRightLatitude, topRightLongitude, bottomLeftLatitude, bottomLeftLongitude, searchType)
    )
    // console.log('api',data)
    return data
  } catch (error) {
    console.error(error)
  }
}
