import { ReactElement } from 'react'
import { RenderOptions, render } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'

import {
  CartContext,
  CartContextData,
  CartContextDefaultValues
} from 'hooks/use-cart'
import {
  WishlistContext,
  WishlistContextData,
  WishlistContextDefaultValues
} from 'hooks/use-wishlist'

import theme from 'styles/theme'

type CustomRenderProps = {
  cartProviderProps?: CartContextData
  wishlistProviderProps?: WishlistContextData
} & Omit<RenderOptions, 'queries'>

const customRender = (
  ui: ReactElement,
  {
    cartProviderProps = CartContextDefaultValues,
    wishlistProviderProps = WishlistContextDefaultValues,
    ...renderOptions
  }: CustomRenderProps = {}
) =>
  render(
    <ThemeProvider theme={theme}>
      <CartContext.Provider value={cartProviderProps}>
        <WishlistContext.Provider value={wishlistProviderProps}>
          {ui}
        </WishlistContext.Provider>
      </CartContext.Provider>
    </ThemeProvider>,
    renderOptions
  )

export * from '@testing-library/react'
export { customRender as render }
