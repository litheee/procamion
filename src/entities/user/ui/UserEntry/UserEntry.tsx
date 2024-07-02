import { Button } from '@/shared/ui'

import classes from './UserEntry.module.scss'
import Link from 'next/link'
import { ROUTE_NAMES } from '../../../../../config'

type UserEntryProps = {}

export const UserEntry = ({}: UserEntryProps) => {
  return (
    <div className={classes.userEntry}>
      <Link href={ROUTE_NAMES.SIGN_UP}>
        <Button size='small'>Sign Up</Button>
      </Link>

      <Link href={ROUTE_NAMES.SIGN_IN}>
        <Button size='small' color='primary'>
          Sign In
        </Button>
      </Link>
    </div>
  )
}
