import userEvent from '@testing-library/user-event'
import { render, screen, waitFor } from 'utils/test-utils'

import UserDropdown from '.'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const useRouter = jest.spyOn(require('next/router'), 'useRouter')
useRouter.mockImplementation(() => ({}))

jest.mock('next/link', () => ({
  __esModule: true,
  default: function Mock({ children }: { children: React.ReactNode }) {
    return <div>{children}</div>
  }
}))

describe('<UserDropdown />', () => {
  it('should render the username', () => {
    render(<UserDropdown username="jgsg" />)

    expect(screen.getByText(/jgsg/i)).toBeInTheDocument()
  })

  it('should render the menu', async () => {
    render(<UserDropdown username="jgsg" />)

    await userEvent.click(screen.getByText(/jgsg/i))

    await waitFor(() => {
      expect(screen.getByText(/my profile/i)).toBeInTheDocument()
      expect(screen.getByText(/wishlist/i)).toBeInTheDocument()
      expect(
        screen.getByRole('button', { name: /sign out/i })
      ).toBeInTheDocument()
    })
  })
})
