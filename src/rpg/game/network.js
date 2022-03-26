import {io} from 'socket.io-client'
import log from '../lib/logger.js'
import config from '../../../config.js'

export default class network {
    constructor(game) {
        this._game = game;
        this._socket = io('ws://' + config.gameserver_addr + ':' + config.gameserver_port)
        this.setupInputBuffer()        
    }

    setupInputBuffer() {
        this._inputBuffer = []
        this._socket.onAny((...data) => {
            this.handleDataPacket(...data)
        })
    }

    sendData(...data) {
        this._socket.emit('d', {
            time: Date.now(),
            ...data
        })
        log(3, 'data sent', ...data)

    }

    handleDataPacket(...data) {
        this._inputBuffer.push({
            time_rec: Date.now(),
            ...data
        })
        log(3, 'data recieved and stored', this._inputBuffer.length)        
    }
}