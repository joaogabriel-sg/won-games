import { Grid } from '.'
import { render } from 'utils/test-utils'

describe('<Grid />', () => {
  it('should render correctly', () => {
    const { container } = render(<Grid />)

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
