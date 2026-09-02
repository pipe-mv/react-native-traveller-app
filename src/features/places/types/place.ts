export type PlaceCategory = 'hotels' | 'attractions' | 'restaurants'

export type Cuisine = {
  name?: string | null
}

export type Place = {
  location_id?: string | number | null
  name?: string | null
  location_string?: string | null
  price_level?: string | null
  price?: string | null
  open_now_text?: string | null
  rating?: string | number | null
  bearing?: string | null
  description?: string | null
  cuisine?: Cuisine[] | null
  phone?: string | null
  email?: string | null
  address?: string | null
  photo?: {
    images?: {
      medium?: {
        url?: string | null
      } | null
    } | null
  } | null
}
