import styled from 'styled-components'

import * as GameItemStyles from 'components/GameItem/styles'

export const Wrapper = styled.main`
  ${GameItemStyles.Wrapper} {
    &:last-child {
      border-bottom: 0;
    }
  }
`
