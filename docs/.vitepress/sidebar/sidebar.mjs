import { vuejs } from './vuejs.mjs'
import { drf } from './drf.mjs'
import { django } from './django.mjs'
import { javascript } from './javscript.mjs'
import { pjt } from './pjt.mjs'
export const sidebar = {
  ...django,
  ...drf,
  ...javascript,
  ...vuejs,
  ...pjt,
}

