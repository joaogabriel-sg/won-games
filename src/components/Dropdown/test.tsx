import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithTheme } from 'utils/tests/helpers'

import Dropdown from '.'

describe('<Dropdown />', () => {
  beforeEach(() => {
    const title = <h1 aria-label="toggle dropdown">Click here</h1>

    renderWithTheme(
      <Dropdown title={title}>
        <span>content</span>
      </Dropdown>
    )
  })

  it('should render title', () => {
    expect(screen.getByLabelText(/toggle dropdown/)).toBeInTheDocument()
  })

  it('should handle open/close dropdown', async () => {
    const content = screen.getByText(/content/).parentElement!

    expect(content).toHaveStyle({ opacity: 0 })
    expect(content.getAttribute('aria-hidden')).toBe('true')

    await userEvent.click(screen.getByLabelText(/toggle dropdown/))

    expect(content).toHaveStyle({ opacity: 1 })
    expect(content.getAttribute('aria-hidden')).toBe('false')
  })

  it('should handle open/close dropdown when clicking on overlay', async () => {
    const content = screen.getByText(/content/).parentElement!
    const overlay = content.nextElementSibling!

    await userEvent.click(screen.getByLabelText(/toggle dropdown/))

    expect(overlay).toHaveStyle({ opacity: 1 })
    expect(overlay.getAttribute('aria-hidden')).toBe('false')

    await userEvent.click(overlay)

    expect(overlay).toHaveStyle({ opacity: 0 })
    expect(overlay.getAttribute('aria-hidden')).toBe('true')
  })
})
