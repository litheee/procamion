import type { CargoResponse } from '../types/cargo.types'

export const transfromCargo = (cargo: CargoResponse) => {
  const {
    city_from: departureCity,
    city_to: arrivalCity,
    country_from: departureCountry,
    country_to: arrivalCountry,
    created_at: createDate,
    currency,
    departure_date: departureDate,
    ftl_price: ftlPrice,
    id,
    ltl_price: ltlPrice,
    number_of_pallets: palletsNumber,
    status,
    temperature,
    type: loadType,
    updated_at: updateDate,
    description: comment
  } = cargo

  return {
    id,
    departureCountry,
    arrivalCity,
    arrivalCountry,
    departureCity,
    departureDate,
    ftlPrice,
    ltlPrice,
    currency,
    palletsNumber,
    status,
    temperature,
    loadType,
    updateDate,
    createDate,
    comment
  }
}
