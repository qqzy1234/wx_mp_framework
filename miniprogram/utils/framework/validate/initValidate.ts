import { WxValidate } from "./WxValidate/WxValidate";

export default class initValidate {
    rule: AnyObject
    message: AnyObject

    constructor() {
        this.rule = {}
        this.message = {}
    }
    /**
     * 添加规则
     * @param {*} fieldName 字段名 
     * @param {*} rule  规则
     * @param {*} message  提示信息
     * @param {*} addRule 添加新规则
     */
    add(fieldName: string, rule: string | object, message: string | object) {
        let ruleType = typeof rule
        let messageType = typeof message
        if ((ruleType == 'string' && messageType == 'object') || (ruleType == 'object' && messageType == 'string')) {
            console.error('添加规则错误！参数rule（规则项）和参数message（提示信息）类型不统一');
            return
        }
        let ruleObj: AnyObject = {}
        let ruleStr: string = ''
        if (typeof rule == 'string') {
            let arr = rule.split(":")
            ruleStr = arr[0]
            if (arr.length == 1) {
                ruleObj[arr[0]] = true
            } else {
                ruleObj[arr[0]] = arr[1]
            }
        } else if (typeof rule == 'object') {
            ruleObj = rule
        }
        this.rule[fieldName] = this.rule[fieldName] ? Object.assign(this.rule[fieldName], ruleObj) : ruleObj
        let messageObj: AnyObject = {}
        if (typeof message == 'string') {
            messageObj[ruleStr] = message
        } else if (messageType == 'object') {
            messageObj = message
        }
        this.message[fieldName] = this.message[fieldName] ? Object.assign(this.message[fieldName], messageObj) : messageObj
    }
    /**
     * 添加自定义规则
     * @param {*} ruleName  规则名
     * @param {*} method  规则（方法）
     * @param {*} message 提示信息
     */
    addMethod(validate: any, ruleName: string, method: () => void, message: string) {
        validate.addMethod(ruleName, method, message)
    }
    // 验证
    check(validate: any, data: object) {
        return validate.checkForm(data)
    }
    // 获取WxValidate对象
    getValidate() {
        return new WxValidate(this.rule, this.message)
    }
}