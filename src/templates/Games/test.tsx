import { ReactNode } from 'react'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MockedProvider } from '@apollo/client/testing'
import { renderWithTheme } from 'utils/tests/helpers'

import Games from '.'

import { fetchMoreMock, gamesMock } from './mocks'
import filterItemsMock from 'components/ExploreSidebar/mock'
import apolloCache from 'utils/apolloCache'

jest.mock('templates/Base', () => {
  return {
    __esModule: true,
    default: function Mock({ children }: { children: ReactNode }) {
      return <div data-testid="Mock Base">{children}</div>
    }
  }
})

jest.mock('components/ExploreSidebar', () => {
  return {
    __esModule: true,
    default: function Mock({ children }: { children: ReactNode }) {
      return <div data-testid="Mock ExploreSidebar">{children}</div>
    }
  }
})

describe('<Games />', () => {
  it('should render sections', async () => {
    renderWithTheme(
      <MockedProvider mocks={[gamesMock]} addTypename={false}>
        <Games filterItems={filterItemsMock} />
      </MockedProvider>
    )

    expect(await screen.findByTestId('Mock ExploreSidebar')).toBeInTheDocument()

    expect(await screen.findByText(/sample game/i)).toBeInTheDocument()

    expect(
      screen.getByRole('button', { name: /show more/i })
    ).toBeInTheDocument()
  })

  it('should render more games when show more is clicked', async () => {
    renderWithTheme(
      <MockedProvider mocks={[gamesMock, fetchMoreMock]} cache={apolloCache}>
        <Games filterItems={filterItemsMock} />
      </MockedProvider>
    )

    expect(await screen.findByText(/sample game/i)).toBeInTheDocument()

    userEvent.click(screen.getByRole('button', { name: /show more/i }))

    expect(await screen.findByText(/fetch more game/i)).toBeInTheDocument()
  })
})
