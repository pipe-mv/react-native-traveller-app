export type Place = {
  name?: string | null
  location_string?: string | null
  photo?: {
    images?: {
      medium?: {
        url?: string | null
      } | null
    } | null
  } | null
}
