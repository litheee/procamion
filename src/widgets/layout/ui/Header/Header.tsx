'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import cn from 'classnames'

import { LangSelect } from '@/features/lang'
import { UserDropdown, UserEntry } from '@/entities/user'
import { Logo } from '@/shared/ui'

import { ROUTE_NAMES } from '../../../../../config'
import { useAuth } from '@/shared/hooks/useAuth'

import classes from './Header.module.scss'

export const Header = () => {
  const { isAuth } = useAuth()
  const pathname = usePathname()

  return (
    <header className={classes.header}>
      <div className='wrapper'>
        <Logo />

        <Link
          href={ROUTE_NAMES.SEARCH}
          className={cn(classes.link, {
            [classes.active]: pathname === ROUTE_NAMES.SEARCH
          })}
        >
          Search board
        </Link>

        <div className={classes.right}>
          <LangSelect />

          {isAuth ? <UserDropdown /> : <UserEntry />}
        </div>
      </div>
    </header>
  )
}
