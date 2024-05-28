import { vuejs } from './vuejs.mjs'
import { drf } from './drf.mjs'
import { django } from './django.mjs'
import { javascript } from './javscript.mjs'
import { pjt } from './pjt.mjs'
import { python } from './python.mjs'
import { css } from './css.mjs'
import { react } from './react'

export const sidebar = {
  ...css,
  ...python,
  ...django,
  ...drf,
  ...javascript,
  ...vuejs,
  ...react,
  ...pjt,
}

