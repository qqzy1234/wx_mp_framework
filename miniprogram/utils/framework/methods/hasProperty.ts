// 判断对象或对象原型上是否包含某属性
export default function hasProperty(obj: any, property: string | number | symbol, prototype: Boolean = false) {
    if (prototype) {
        return property in obj
    } else {
        return obj.hasOwnProperty(property)
    }
}