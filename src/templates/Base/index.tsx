import { ReactNode } from 'react'
import { useSession } from 'next-auth/client'

import { Container } from 'components/Container'
import Menu from 'components/Menu'
import Footer from 'components/Footer'

import * as S from './styles'

type BaseProps = {
  children: ReactNode
}

const Base = ({ children }: BaseProps) => {
  const [session, loading] = useSession()

  return (
    <S.Wrapper>
      <Container>
        <Menu username={session?.user?.name} loading={loading} />
      </Container>

      <S.Content>{children}</S.Content>

      <S.SectionFooter>
        <Container>
          <Footer />
        </Container>
      </S.SectionFooter>
    </S.Wrapper>
  )
}

export default Base
