import { Inter, Noto_Sans, Roboto } from 'next/font/google'

export const inter = Inter({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-inter'
})

export const notoSans = Noto_Sans({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-noto-sans'
})

export const roboto = Roboto({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-roboto'
})
