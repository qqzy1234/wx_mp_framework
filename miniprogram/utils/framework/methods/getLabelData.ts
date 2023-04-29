/**
 * 获取标签中的数据
 * @param {*} e 
 * @param name 变量名
 * @returns 
 */
 export default function getLabelData(e: any, name: string) {
    if (e.currentTarget && Object.keys(e.currentTarget.dataset).length != 0) {
        return e.currentTarget.dataset[name.toLowerCase()]
    } else {
        return e.target.dataset[name.toLowerCase()]
    }
}