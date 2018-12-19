(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module !== 'undefined' && module.exports){
        module.exports = factory();
    } else {
        global.ReconnectingWebSocket = factory();
    }
})(this, function () {
    // function ReconnectingWebSocket(url, protocols, options) {
    //
    // }
    // return ReconnectingWebSocket;
    class WebsocketComplete {
        constructor({url,pingChat = 'ping',pingTime = 20000,pongTime = 2000,reconnetTime = 2000,endTime = false}) {
            this.options = {
                url: url,
                pingChat: pingChat,
                pingTime: pingTime,
                pongTime: pongTime,
                reconnetTime: reconnetTime,
                endTime: endTime
            }
            this.ws = null
            this.websocketInit()
        }
        websocketInit () {
            try {
                this.ws = new WebSocket(this.options.url)
                this.initEventHandle()
            } catch (e) {
                this.reconnect()
            }
        }
        websocketListen () {
            this.ws.onopen = () => {
                this.open()
                this.heartCheck()
            }
            this.ws.onmessage = (e) => {
                this.onmessage(e)
                this.heartCheck()
            }
            this.ws.onerror = () => {
                this.onerror()
                this.websocketReconnect()
            }
            this.ws.onclose = () => {
                this.onclose()
                this.websocketReconnect()
            }
        }
        websocketReconnect () {
            if(this.options.endTime || this.endReconnect) return
            this.endReconnect = true
            setTimeout(() => {
                this.websocketInit()
                this.endReconnect = false
            },this.options.reconnetTime)
        }
        heartStart () {
            if(this.options.endTime) return
            this.pingTimeout = setTimeout(() => {
                this.ws.send(this.options.pingChat)
                this.pongTimeout = setTimeout(() => {
                    this.ws.close();
                }, this.options.pongTime)
            }, this.options.pingTime)
        }
        heartReset () {
            clearTimeout(this.pingTimeout)
            clearTimeout(this.pongTimeout)
        }
        heartCheck () {
            this.heartReset()
            this.heartStart()
        }
        send (msg) {
            this.ws.send(msg)
        }
        close () {
            this.options.endTime = true
            this.heartReset();
            this.ws.close();
        }
    }

    return WebsocketComplete
})