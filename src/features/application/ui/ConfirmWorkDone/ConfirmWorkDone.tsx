'use client'

import { Button } from '@/shared/ui'
import { useApplicationChangeStatus } from '../../model/useApplicationChangeStatus'

import { ApplicationStatus } from '@/entities/application'

import classes from './ConfirmWorkDone.module.scss'
import { AvatarIcon } from '../../../../../public/icons/sidebar/Avatar'

type UserInfo = {
  id: string
  first_name: string
  last_name: string
  email: string
  phone_number: string
}

type ConfirmWorkDoneProps = {
  applicationId: string
  status?: ApplicationStatus
  user: UserInfo
  message: string
  onSuccess: () => void
  onClose: () => void
}

export const ConfirmWorkDone = ({
  applicationId,
  status,
  user,
  message,
  onClose,
  onSuccess
}: ConfirmWorkDoneProps) => {
  const { changeStatus, isChanging } = useApplicationChangeStatus({
    onSuccess
  })

  const isApplicationFinished = status === ApplicationStatus.FINISHED

  const { phone_number: phone } = user
  const phoneFormatted = `${phone.slice(0, -10)}-${phone.slice(-10, -7)}-${phone.slice(
    -7,
    -4
  )}-${phone.slice(-4)}`

  return (
    <div>
      <div className={classes.responseBody}>
        <div className={classes.responseUser}>
          <div className={classes.responseUserAvatar}>
            <AvatarIcon />
          </div>

          <div className={classes.responseUserInfo}>
            <p>
              {user.first_name} {user.last_name}
            </p>

            <p>{user.email}</p>

            <p>{phoneFormatted}</p>
          </div>
        </div>

        <div className={classes.responseComment}>
          <p>Comment</p>
          <p>{message}</p>
        </div>
      </div>

      {!isApplicationFinished ? (
        <div className={classes.actions}>
          <Button
            type='button'
            color='secondary'
            size='small'
            isLoading={isChanging}
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            type='button'
            color='success'
            size='small'
            isLoading={isChanging}
            onClick={() => {
              changeStatus({
                applicationId,
                status: ApplicationStatus.FINISHED
              })
            }}
          >
            Solved
          </Button>
        </div>
      ) : null}
    </div>
  )
}
