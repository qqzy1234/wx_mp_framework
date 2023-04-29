import newProxy from "./methods/newProxy";
import newPromise from './methods/newPromise'
import tips from './methods/tips'
import Request from "./methods/request";
import router from "./methods/router";
import validate from "./validate/initValidate";
import next from "./methods/next";
import getLabelData from "./methods/getLabelData";
import selectQuery from "./methods/selectQuery";
import hasProperty from "./methods/hasProperty";

/**
 * 此文件为所有方法和工具类的入口
 */
export = {
    newProxy,
    newPromise,
    ...tips,
    request: new Request,
    router: new router,
    next,
    getLabelData,
    validate: new validate,
    store: {} as anyObj,
    selectQuery: new selectQuery,
    hasProperty
}