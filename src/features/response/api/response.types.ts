export type CreateResponsePayload = {
  applicationId: string
  comment: string
}

export type EditResponsePayload = {
  responseId: string
  comment: string
}

export type ChooseCargoResponsePayload = {
  cargoId: string
  responseId: string
}

export type ChooseRouteResponsePayload = {
  routeId: string
  responseId: string
}

export type RejectCargoResponsePayload = {
  cargoId: string
  responseId: string
}

export type RejectRouteResponsePayload = {
  routeId: string
  responseId: string
}
