import type { ResponseList } from '@/shared/api/types'
import type { Currency } from '@/shared/const/local.const'

export type RouteResponse = {
  id: string
  created_at: string
  updated_at: string
  description: string
  country_from: string
  country_to: string
  city_from: string
  city_to: string
  departure_date: string
  temperature: number
  number_of_pallets: number
  ltl_price: number
  ftl_price: number
  currency: Currency
}

export type RoutesListResponse = ResponseList<RouteResponse>
