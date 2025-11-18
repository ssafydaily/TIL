
import { frontSidebar } from './front/sidebar.mjs'
import { backendSidebar } from './backend/sidebar.mjs'

import { pjt } from './pjt.mjs'
import { python } from './python.mjs'
import { java } from './java.mjs'
import { algo } from './algo.mjs'
import { data } from './data.mjs'

export const sidebar = {
  ...frontSidebar,
  ...backendSidebar,

  ...python,
  ...pjt,
  ...java,
  ...algo,
  ...data, 
}

