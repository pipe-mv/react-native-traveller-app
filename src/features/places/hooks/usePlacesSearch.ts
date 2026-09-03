import { useCallback, useEffect, useState } from 'react'
import { getPlacesData } from '../api/placesApi'
import type { SearchBounds, SearchViewport } from '../types/geography'
import type { Place, PlaceCategory } from '../types/place'

const initialBounds: SearchBounds = {
  topRightLatitude: null,
  topRightLongitude: null,
  bottomLeftLatitude: null,
  bottomLeftLongitude: null,
}

export default function usePlacesSearch() {
  const [isLoading, setIsLoading] = useState(false)
  const [places, setPlaces] = useState<Place[]>([])
  const [searchType, setSearchType] = useState<PlaceCategory>('restaurants')
  const [bounds, setBounds] = useState<SearchBounds>(initialBounds)

  const setSearchViewport = useCallback((viewport?: SearchViewport | null) => {
    setBounds({
      bottomLeftLatitude: viewport?.southwest?.lat ?? null,
      bottomLeftLongitude: viewport?.southwest?.lng ?? null,
      topRightLatitude: viewport?.northeast?.lat ?? null,
      topRightLongitude: viewport?.northeast?.lng ?? null,
    })
  }, [])

  useEffect(() => {
    let isActive = true

    const loadPlaces = async () => {
      setIsLoading(true)

      try {
        const data = await getPlacesData(bounds, searchType)

        if (isActive) {
          setPlaces(Array.isArray(data) ? data : [])
        }
      } finally {
        if (isActive) {
          setIsLoading(false)
        }
      }
    }

    loadPlaces()

    return () => {
      isActive = false
    }
  }, [bounds, searchType])

  return {
    isLoading,
    places,
    setSearchType,
    setSearchViewport,
  }
}
