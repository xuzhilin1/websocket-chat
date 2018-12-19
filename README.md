# WebSocket + reconnecting + heartbeat


This is a websocket based encapsulation can support heartbeat and reconnection javascript library, for some special circumstances, the link is broken, will automatically reconnect and ensure heartbeat protocol.


# How to use it

If you're using NPM

```javascript
npm install websocket-heartbeat-reconnection --save
或着
npm install websocket-heartbeat-reconnection -S
//将依赖加入到dependencies（生产阶段的依赖）
```
If you're using YARN

```javascript
yarn add websocket-heartbeat-reconnection --save
或着
yarn add websocket-heartbeat-reconnection -S
```

import
```javascript
import WebsocketComplete from 'websocket-heartbeat-reconnection'
let ws = new WebsocketComplete({
       url: 'xxxxxxx'//链接地址
})
ws.onopen = () => {
    console.log('连接成功')
}
ws.onmessage = () => {
    console.log('接受到消息')
}
ws.onreconnect = () => {
    console.log('正在重新连接')
}
```

## Options

#### `url`
- This is the URL of websocket
- Accepts `String`

#### `pingTimeout`
- This is the websocket heartbeat protocol time.
- Accepts `Number`
- Default: `20000`

#### `pongTimeout`
- This is the timeout time for unreceived messages after websocket pings.
- Accepts `Number`
- Default: `2000`

#### `reconnectTimeout`
- This is the websocket reconnect time.
- Accepts `Number`
- Default: `2000`

#### `pingMsg`
- This is the ping value for websocket transfers.
- Accepts `Number or String`
- Default: `ping`

#API

###onclose
```javascript
WebsocketComplete.onopen = () => {
    console.log('连接成功')
}
```

###onerror
```javascript
WebsocketComplete.onerror = () => {
    console.log('连接失败')
}

###onclose
```javascript
WebsocketComplete.onclose = () => {
    console.log('连接断开')
}

###onmessage
```javascript
WebsocketComplete.onmessage = () => {
    console.log('获取消息')
}

###onreconnect
```javascript
WebsocketComplete.onreconnect = () => {
    console.log('重新连接')
}