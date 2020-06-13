import * as Background from './background.js'
import * as UI from './ui.js'
import * as MDCWeb from './material_components_web.js'
import * as LocalSongs from './local_songs.js'
import * as Search from './search.js'
import 'regenerator-runtime/runtime'

MDCWeb.init()
LocalSongs.init()
Search.init()

UI.declareTemplates()
UI.applyUIforLargerScreens()
Background.animate()
setInterval(Background.animate, 10000)