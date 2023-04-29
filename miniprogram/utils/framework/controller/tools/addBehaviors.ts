import hasProperty from "../../methods/hasProperty"
let baseBehaviors = require('../../behaviors/baseBehaviors')

export default function addBehaviors (argArray: anyObj[]) {
    if (hasProperty(argArray[0], 'behaviors')) {
        argArray[0].behaviors = [baseBehaviors, ...argArray[0].behaviors]
    } else {
        argArray[0]['behaviors'] = [baseBehaviors]
    }
}