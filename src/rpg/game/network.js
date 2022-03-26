import {io} from 'socket.io-client'
import log from '../lib/logger.js'
import config from '../../../config.js'

// todo: ack of packets
// send them with uids
// store on server until ack from client and other way around

export default class network {
    constructor(game) {
        this._game = game;
        this._socket = io('ws://' + config.gameserver_addr + ':' + config.gameserver_port)
        this.setupInputBuffer()        
    }

    setupInputBuffer() {
        this._inputBuffer = []
        this._socket.on('d', (data) => {
            this.handleDataPacket(data)
        })
    }

    sendData(data) {
        this._socket.emit('d', {
            time_sent: Date.now(),
            data
        })
        log(3, 'data sent', data)
    }

    handleDataPacket(data) {
        if(!data.method) {
            log(3, 'packet has invalid format')
            return false
        }

        if(this._inputBuffer.length >= config.max_network_queue) {
            // delete the last one
            // ask to resend it
            this._inputBuffer.splice(0, 1)
        }
        this._inputBuffer.push({
            time_rec: Date.now(),
            data
        })
        log(3, 'data recieved and stored', this._inputBuffer.length, data)        
    }
}