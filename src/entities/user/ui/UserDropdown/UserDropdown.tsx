'use client'

import { useState } from 'react'
import Link from 'next/link'
import cn from 'classnames'
import Typography from '@mui/material/Typography'
import { Dropdown } from '@mui/base/Dropdown'
import { Menu } from '@mui/base/Menu'
import { MenuButton } from '@mui/base/MenuButton'
import { MenuItem } from '@mui/base/MenuItem'

import { UserAvatar } from '../UserAvatar/UserAvatar'

import { ROUTE_NAMES } from '../../../../../config'
import { useAuth } from '@/shared/hooks/useAuth'
import { useUser } from '@/shared/hooks/useUser'

import classes from './UserDropdown.module.scss'

export const UserDropdown = () => {
  const [isDropdownOpen, setDropdwonOpen] = useState(false)
  const { user } = useUser()
  const { logout } = useAuth()

  return (
    <div className={classes.userDropdown}>
      <UserAvatar />

      <Typography className={classes.fullName}>
        {user.firstName} {user.lastName}
      </Typography>

      <Dropdown
        onOpenChange={(_, isOpen) => {
          setDropdwonOpen(isOpen)
        }}
      >
        <MenuButton
          className={cn(classes.hamburger, {
            [classes.open]: isDropdownOpen
          })}
        >
          <span />
          <span />
          <span />
        </MenuButton>

        <Menu
          className={classes.menu}
          slotProps={{
            root: {
              placement: 'bottom-end'
            }
          }}
        >
          <MenuItem>
            <Link href={ROUTE_NAMES.PROFILE}>Profile</Link>
          </MenuItem>

          <MenuItem>
            <Link href={ROUTE_NAMES.PROFILE_APPLICATIONS}>My applications</Link>
          </MenuItem>

          <MenuItem>
            <Link href={ROUTE_NAMES.PROFILE_RESPONSES}>My responses</Link>
          </MenuItem>

          <MenuItem>
            <Link href={ROUTE_NAMES.PROFILE_SETTINGS}>Settings</Link>
          </MenuItem>

          <MenuItem>
            <button type='button' onClick={logout}>
              Logout
            </button>
          </MenuItem>
        </Menu>
      </Dropdown>
    </div>
  )
}
