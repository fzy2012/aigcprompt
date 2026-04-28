"use client"

import { useState, useEffect, useCallback } from "react"

const FAVORITES_KEY = "aigc-prompt-favorites"

export function useFavorites() {
  const [favorites, setFavorites] = useState<number[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY)
      if (stored) {
        setFavorites(JSON.parse(stored))
      }
    } catch {
      console.warn("Failed to load favorites from localStorage")
    }
    setIsLoaded(true)
  }, [])

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
      } catch {
        console.warn("Failed to save favorites to localStorage")
      }
    }
  }, [favorites, isLoaded])

  const isFavorite = useCallback(
    (id: number) => favorites.includes(id),
    [favorites]
  )

  const addFavorite = useCallback((id: number) => {
    setFavorites((prev) => {
      if (prev.includes(id)) return prev
      return [...prev, id]
    })
  }, [])

  const removeFavorite = useCallback((id: number) => {
    setFavorites((prev) => prev.filter((fid) => fid !== id))
  }, [])

  const toggleFavorite = useCallback((id: number) => {
    setFavorites((prev) => {
      if (prev.includes(id)) {
        return prev.filter((fid) => fid !== id)
      }
      return [...prev, id]
    })
  }, [])

  const clearFavorites = useCallback(() => {
    setFavorites([])
  }, [])

  return {
    favorites,
    isLoaded,
    isFavorite,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    clearFavorites,
  }
}
