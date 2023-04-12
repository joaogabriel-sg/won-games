import { ReactNode } from 'react'
import { screen } from '@testing-library/react'

import OrdersList from '.'
import itemsMock from './mock'
import { renderWithTheme } from 'utils/tests/helpers'

jest.mock('components/GameItem', () => {
  return {
    __esModule: true,
    default: function Mock({ children }: { children: ReactNode }) {
      return <div data-testid="Mock GameItem">{children}</div>
    }
  }
})

jest.mock('components/Empty', () => {
  return {
    __esModule: true,
    default: function Mock() {
      return <div data-testid="Mock Empty"></div>
    }
  }
})

describe('<OrdersList />', () => {
  it('should render the game items', () => {
    renderWithTheme(<OrdersList items={itemsMock} />)

    expect(
      screen.getByRole('heading', { name: /my orders/i })
    ).toBeInTheDocument()

    expect(screen.getAllByTestId('Mock GameItem')).toHaveLength(2)
  })

  it('should render empty state', () => {
    renderWithTheme(<OrdersList />)

    expect(screen.getByTestId('Mock Empty')).toBeInTheDocument()
  })
})
