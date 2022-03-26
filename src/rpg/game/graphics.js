import $ from 'jquery'
import * as PIXI from 'pixi.js'
import event from './events.js'

export default class graphics {
    constructor(game) {
        this._game = game

        this._pixi = null

        this._status = {
            loaded: false,
            running: false,            
            gamestate: 0,
        }

        this._input = []
    }



    resizePixiRendererToWindowSize() {
        this._pixi.view.width = $(window).width()
        this._pixi.view.height = $(window).height()
    }

    initGraphics() {
        // start PIXI        
        this._pixi = new PIXI.Application(
            {
                width: '100',
                height: '100',
                resizeTo: window,
            }
        )

        // create dom element
        $('#game-screen').append(this._pixi.view)
        $(this._pixi.view).addClass('m-0')

        // set status
        this._status.loaded = true

        // fire completion event
        this._game._events.fireEvent('graphics-loaded')
    }

    startLoop() {
        // if not loaded
        if(!this._status.loaded) {
            console.log('gameloop will start when game is ready')
            
            this._game._events.once('graphics-loaded', () => {
                this.startLoop()
            })            

            $(() => {
                this.initGraphics()
            })  

            return
        }

        if(this._status.running) {
            console.info('gameloop already running')
            return
        }
        try {
            this._pixi.ticker.add((time) => {
                this.loop(time)
            })
        } catch(error) {
            console.log('could not start gameloop', error)
        }
    }

    loop(deltatime) {
        //console.log(deltatime)
        this._status.running = true
        this._pixi.render()
    }

    setupLoader() {
        // todo: load resources from json (sent by server)
        // and request data straight from server
        this._pixi.loader.add('tiles', './res/tiles.png')
    }
}