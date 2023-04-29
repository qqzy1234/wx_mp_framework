import { config, api, noPrefixApi } from "../../../config"
import globalEventListen from '../../globalEventListen'
import methods from "../../methods"

// 添加事件监听
export default function addEventListen(event: anyObj, eventListen: anyObj, thisArg: anyObj) {
    let configs = {app: getApp(), config, api, noPrefixApi}
    if (event && event.type) {
        globalEventListen.onEvent && globalEventListen.onEvent.apply(thisArg, [event, thisArg, methods, configs])
        eventListen && eventListen.onEvent && eventListen.onEvent.apply(thisArg, [event, thisArg, methods, configs])
        if (event.type == 'tap') {
            globalEventListen.onTap && globalEventListen.onTap.apply(thisArg, [event, thisArg, methods, configs])
            eventListen && eventListen.onTap && eventListen.onTap.apply(thisArg, [event, thisArg, methods, configs])
        }
    }
}