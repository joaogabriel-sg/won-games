import Link from 'next/link'
import { ChevronDown } from 'styled-icons/boxicons-regular'
import {
  AccountCircle,
  ExitToApp,
  FavoriteBorder
} from 'styled-icons/material-outlined'

import Dropdown from 'components/Dropdown'

import * as S from './styles'

export type UserDropdownProps = {
  username: string
}

const UserDropdown = ({ username }: UserDropdownProps) => (
  <>
    <Dropdown
      title={
        <>
          <AccountCircle size={24} />
          <S.Username>{username}</S.Username>
          <ChevronDown size={24} />
        </>
      }
    >
      <S.Nav>
        <Link href="/profile/me" passHref>
          <S.Link title="My profile">
            <AccountCircle />
            <span>My profile</span>
          </S.Link>
        </Link>

        <Link href="/wishlist" passHref>
          <S.Link title="Wishlist">
            <FavoriteBorder />
            <span>Wishlist</span>
          </S.Link>
        </Link>

        <Link href="/logout" passHref>
          <S.Link title="Sign out">
            <ExitToApp />
            <span>Sign out</span>
          </S.Link>
        </Link>
      </S.Nav>
    </Dropdown>
  </>
)

export default UserDropdown
