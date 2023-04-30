import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import { useSession } from 'next-auth/client'

import { GameCardProps } from 'components/GameCard'

import { useQueryWishlist } from 'graphql/queries/wishlist'
import { gamesMapper } from 'utils/mappers'
import { QueryWishlist_wishlists_games } from 'graphql/generated/QueryWishlist'
import { useMutation } from '@apollo/client'
import {
  MUTATION_CREATE_WISHLIST,
  MUTATION_UPDATE_WISHLIST
} from 'graphql/mutations/wishlist'
import {
  MutationCreateWishlist,
  MutationCreateWishlistVariables
} from 'graphql/generated/MutationCreateWishlist'
import {
  MutationUpdateWishlist,
  MutationUpdateWishlistVariables
} from 'graphql/generated/MutationUpdateWishlist'

export type WishlistContextData = {
  items: GameCardProps[]
  loading: boolean
  isInWishlist: (id: string) => boolean
  addToWishlist: (id: string) => void
  removeFromWishlist: (id: string) => void
}

export const WishlistContextDefaultValues: WishlistContextData = {
  items: [],
  loading: false,
  isInWishlist: () => false,
  addToWishlist: () => null,
  removeFromWishlist: () => null
}

export const WishlistContext = createContext<WishlistContextData>(
  WishlistContextDefaultValues
)

export type WishlistProviderProps = {
  children: ReactNode
}

export const WishlistProvider = ({ children }: WishlistProviderProps) => {
  const [session] = useSession()
  const [wishlistId, setWishlistId] = useState<string | null>(null)
  const [wishlistItems, setWishlistItems] = useState<
    QueryWishlist_wishlists_games[]
  >([])

  const [createList, { loading: loadingCreate }] = useMutation<
    MutationCreateWishlist,
    MutationCreateWishlistVariables
  >(MUTATION_CREATE_WISHLIST, {
    context: { session },
    onCompleted: (data) => {
      setWishlistId(data?.createWishlist?.wishlist?.id || null)
      setWishlistItems(data?.createWishlist?.wishlist?.games || [])
    }
  })

  const [updateList, { loading: loadingUpdate }] = useMutation<
    MutationUpdateWishlist,
    MutationUpdateWishlistVariables
  >(MUTATION_UPDATE_WISHLIST, {
    context: { session },
    onCompleted: (data) => {
      setWishlistItems(data?.updateWishlist?.wishlist?.games || [])
    }
  })

  const { data, loading: loadingQuery } = useQueryWishlist({
    skip: !session?.user?.email,
    context: { session },
    variables: {
      identifier: session?.user?.email as string
    }
  })

  useEffect(() => {
    setWishlistId(data?.wishlists[0]?.id || null)
    setWishlistItems(data?.wishlists[0]?.games || [])
  }, [data])

  const wishlistIds = useMemo(
    () => wishlistItems.map((game) => game.id),
    [wishlistItems]
  )

  const isInWishlist = (id: string) => {
    return wishlistItems?.some((game) => game.id === id)
  }

  const addToWishlist = (id: string) => {
    if (!wishlistId) {
      return createList({
        variables: { input: { data: { games: [...wishlistIds, id] } } }
      })
    }

    return updateList({
      variables: {
        input: {
          where: { id: wishlistId },
          data: { games: [...wishlistIds, id] }
        }
      }
    })
  }

  const removeFromWishlist = (id: string) => {
    if (!wishlistId) return

    return updateList({
      variables: {
        input: {
          where: { id: wishlistId },
          data: { games: wishlistIds.filter((gameId) => gameId !== id) }
        }
      }
    })
  }

  return (
    <WishlistContext.Provider
      value={{
        items: gamesMapper(wishlistItems),
        loading: loadingQuery || loadingCreate || loadingUpdate,
        isInWishlist,
        addToWishlist,
        removeFromWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => useContext(WishlistContext)
