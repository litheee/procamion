'use client'

import { useState } from 'react'
import Image from 'next/image'
import cn from 'classnames'
import { Dropdown } from '@mui/base/Dropdown'
import { Menu } from '@mui/base/Menu'
import { MenuButton } from '@mui/base/MenuButton'
import { MenuItem } from '@mui/base/MenuItem'

import classes from './LangSelect.module.scss'

type LangSelectProps = {}

export const LangSelect = ({}: LangSelectProps) => {
  const languages = [
    { label: 'EN', value: 'EN', src: '/icons/flags/en.svg' },
    { label: 'IT', value: 'IT', src: '/icons/flags/it.svg' },
    { label: 'GE', value: 'GE', src: '/icons/flags/ge.svg' }
  ]

  const [selectedLang, setSelectedLang] = useState(languages[0])

  return (
    <Dropdown>
      <MenuButton className={classes.menuButton}>
        <Image width={32} height={32} src={selectedLang.src} alt={selectedLang.label} />

        {selectedLang.label}
      </MenuButton>

      <Menu className={classes.menu}>
        {languages.map((language) => {
          const { label, value, src } = language

          return (
            <MenuItem
              key={label}
              className={cn(classes.menuItem, { [classes.active]: value === selectedLang.value })}
              onClick={() => {
                setSelectedLang(language)
              }}
            >
              <Image width={20} height={20} src={src} alt={label} />

              {label}
            </MenuItem>
          )
        })}
      </Menu>
    </Dropdown>
  )
}
