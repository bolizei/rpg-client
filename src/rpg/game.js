import player from './game/player.js'
import ui from './game/ui.js'
import log from './lib/logger.js'
import network from './game/network.js'
import graphics from './game/graphics.js'
import events from './game/events.js'
import settings from './lib/settings.js'

export default class game {
    constructor() {
        this._settings = new settings()
        // setup network
        this._network = new network(this)
        // setup UI
        this._ui = new ui(this)
        // setup graphics
        this._graphics = new graphics(this)
        // setup events
        this._events = new events(this)
        // setup player
        this._player = new player(this)    
    }
}