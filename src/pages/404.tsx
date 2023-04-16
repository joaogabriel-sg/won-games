import Base from 'templates/Base'
import { Container } from 'components/Container'
import Empty from 'components/Empty'

export default function NotFound() {
  return (
    <Base>
      <Container>
        <Empty
          title="404: Not found"
          description="Ops... this page does not exist. Go back to the store and enjoy our offers."
          hasLink
        />
      </Container>
    </Base>
  )
}
