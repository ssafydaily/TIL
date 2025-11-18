import { drf } from './drf.mjs'
import { django } from './django.mjs'
import { fastapi } from './fastapi.mjs'

export const backendSidebar = {
  ...django,
  ...drf,
  ...fastapi,
}

