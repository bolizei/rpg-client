import merge from 'lodash.merge'

export default class settings {
    constructor(s) {
        let settings = require('../settings/default.json')
        merge(settings, s)
        settings.servers = require('../settings/gameserver.json')
        return settings
    }
}