export type Coordinate = {
  lat?: number
  lng?: number
}

export type SearchViewport = {
  northeast?: Coordinate
  southwest?: Coordinate
}

export type SearchBounds = {
  topRightLatitude: number | null
  topRightLongitude: number | null
  bottomLeftLatitude: number | null
  bottomLeftLongitude: number | null
}
