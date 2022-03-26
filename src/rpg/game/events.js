export default class events {
    constructor(game, logging = false) {
        this._game = game
        this._events = []
        this._logging = logging        
    }

    on(eventname, listener, once = false) {
        if(!this._events[eventname]) {
            this._events[eventname] = []
        }
        this._events[eventname].push({'listener': listener, 'once': once})
        this._logging && console.log('added eventlistener to ', eventname, 'once:', once)
    }

    once(eventname, listener) {
        this.on(eventname, listener, true)
    }

    countListeners(eventname) {
        return this._events[eventname] ? this._events[eventname].length : 0
    }

    fireEvent(eventname, data) {
        this._logging && console.log('called fire event', eventname)
        let c = this.countListeners(eventname)
        if(c > 0) {
            this._logging && console.log('fire ' + c + ' events for', eventname)

            for(let i = 0; i < c; i++) {
                
                this._events[eventname][i].listener(data)
                this._logging && console.log('fired event', this._events[eventname][i].listener)

                if(this._events[eventname][i].once) {
                    this._logging && console.log('deleted event')
                    this._events[eventname].splice(i, 1)
                    if(i != c) {
                        i--
                        c--
                    }
                }
            }

        } else {
            this._logging && console.log('event ' + eventname + 'was called but had no listeners')
        }
    }

    removeListener(eventname, listener) {
        // todo: hopefully no duplicate listeners
        let i = this._events[eventname].findIndex(element => element.listener = listener)
        if(i > 0) {
            this._events[eventname].splice(i, 1)
            this._logging && console.log('removed a listener from', eventname)
        } else {
            this._logging && console.log('cannot remove listener, it doesnt exist', eventname)
        }
    }
}