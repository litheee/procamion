import { Logo } from '@/shared/ui'

import classes from './Footer.module.scss'
import Link from 'next/link'

export const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className='wrapper'>
        <div className={classes.top}>
          <Logo width={432} height={55} />

          <div className={classes.topRight}>
            <div className={classes.links}>
              <p>Procamion</p>

              <ul className={classes.linksList}>
                <li>
                  <Link href='/search'>Home</Link>
                </li>

                <li>
                  <Link href='/search'>Advantages</Link>
                </li>

                <li>
                  <Link href='/search'>Contact us</Link>
                </li>
              </ul>
            </div>

            <div className={classes.links}>
              <p>Shipper & Carrier</p>

              <ul className={classes.linksList}>
                <li>
                  <Link href='/search'>Registration</Link>
                </li>

                <li>
                  <Link href='/search'>For shippers</Link>
                </li>

                <li>
                  <Link href='/search'>Far carriers</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className={classes.bottom}>
          <div className={classes.bottomLeft}>
            <Link href='/search'>Site Terms of Use</Link>
            <Link href='/search'>Personal data processing policy</Link>
          </div>

          <small>«Procamion» © 2022–2023</small>
        </div>
      </div>
    </footer>
  )
}
