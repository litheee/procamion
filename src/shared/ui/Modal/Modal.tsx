'use client'

import MuiModal, { ModalProps as MuiModalProps } from '@mui/material/Modal'
import cn from 'classnames'
import Image from 'next/image'
import type { ReactNode } from 'react'

import classes from './Modal.module.scss'
import { Typography } from '@mui/material'

type ModalProps = MuiModalProps & {
  title: string | ReactNode
  onClose: () => void
}

export const Modal = ({ children, title, className, ...props }: ModalProps) => {
  return (
    <MuiModal
      {...props}
      classes={{
        backdrop: classes.backdrop,
        root: cn(classes.modal, className)
      }}
    >
      <div className={classes.content}>
        <div className={classes.top}>
          {typeof title === 'string' ? (
            <Typography variant='h4' fontSize={18} fontWeight={700}>
              {title}
            </Typography>
          ) : (
            title
          )}

          <button
            className={classes.closeButton}
            onClick={(e) => {
              props.onClose(e, 'backdropClick')
            }}
          >
            <Image width={24} height={24} src='/icons/cross-circle.svg' alt='close' />
          </button>
        </div>

        {children}
      </div>
    </MuiModal>
  )
}
