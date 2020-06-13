import * as Background from './background.js'
import * as UI from './ui.js'
import * as Components from './components.js'
import * as MDCWeb from './material_components_web.js'
import * as LocalSong from './local_songs.js'

MDCWeb.init()
LocalSong.init()

Components.declareTemplates()
UI.applyUIforLargerScreens()
Background.animate()
setInterval(Background.animate, 10000)