import { Grid } from '.'
import { renderWithTheme } from 'utils/tests/helpers'

describe('<Grid />', () => {
  it('should render correctly', () => {
    const { container } = renderWithTheme(<Grid />)

    expect(container.firstChild).toMatchInlineSnapshot(`
      .c0 {
        display: grid;
        grid-template-columns: repeat(auto-fill,minmax(25rem,1fr));
        gap: 3.2rem;
        margin: 3.2rem 0;
      }

      <div
        class="c0"
      />
    `)
  })
})
