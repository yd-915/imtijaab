"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// src/index.ts
var _function = require('fp-ts/function');
var _TaskEither = require('fp-ts/TaskEither'); var TE3 = _interopRequireWildcard(_TaskEither); var TE2 = _interopRequireWildcard(_TaskEither);

// src/preRequest.ts

var _Option = require('fp-ts/Option'); var O2 = _interopRequireWildcard(_Option); var O = _interopRequireWildcard(_Option); var O3 = _interopRequireWildcard(_Option);
var _Either = require('fp-ts/Either'); var E2 = _interopRequireWildcard(_Either); var E = _interopRequireWildcard(_Either); var E3 = _interopRequireWildcard(_Either);
var _TaskEither2 = require('fp-ts/lib/TaskEither'); var TE = _interopRequireWildcard(_TaskEither2);
var _quickjsemscripten = require('quickjs-emscripten'); var qjs = _interopRequireWildcard(_quickjsemscripten); var qjs2 = _interopRequireWildcard(_quickjsemscripten);
var _clone = require('lodash/clone'); var _clone2 = _interopRequireDefault(_clone);
var _data = require('@hoppscotch/data');

// src/utils.ts


function marshalObjectToVM(vm, obj) {
  let jsonString;
  try {
    jsonString = JSON.stringify(obj);
  } catch (e) {
    return E.left("Marshaling stringification failed");
  }
  const vmStringHandle = vm.newString(jsonString);
  const jsonHandle = vm.getProp(vm.global, "JSON");
  const parseFuncHandle = vm.getProp(jsonHandle, "parse");
  const parseResultHandle = vm.callFunction(parseFuncHandle, vm.undefined, vmStringHandle);
  if (parseResultHandle.error) {
    parseResultHandle.error.dispose();
    return E.left("Marshaling failed");
  }
  const resultHandle = vm.unwrapResult(parseResultHandle);
  vmStringHandle.dispose();
  parseFuncHandle.dispose();
  jsonHandle.dispose();
  return E.right(resultHandle);
}
function getEnv(envName, envs) {
  var _a;
  return O.fromNullable((_a = envs.selected.find((x) => x.key === envName)) != null ? _a : envs.global.find((x) => x.key === envName));
}
function setEnv(envName, envValue, envs) {
  const indexInSelected = envs.selected.findIndex((x) => x.key === envName);
  if (indexInSelected >= 0) {
    envs.selected[indexInSelected].value = envValue;
    return {
      global: envs.global,
      selected: envs.selected
    };
  }
  const indexInGlobal = envs.global.findIndex((x) => x.key == envName);
  if (indexInGlobal >= 0) {
    envs.global[indexInGlobal].value = envValue;
    return {
      global: envs.global,
      selected: envs.selected
    };
  }
  envs.selected.push({
    key: envName,
    value: envValue
  });
  return {
    global: envs.global,
    selected: envs.selected
  };
}

// src/preRequest.ts
var execPreRequestScript = (preRequestScript, envs) => _function.pipe.call(void 0, TE.tryCatch(async () => await qjs.getQuickJS(), (reason) => `QuickJS initialization failed: ${reason}`), TE.chain((QuickJS) => {
  let currentEnvs = _clone2.default.call(void 0, envs);
  const vm = QuickJS.createVm();
  const pwHandle = vm.newObject();
  const envHandle = vm.newObject();
  const envGetHandle = vm.newFunction("get", (keyHandle) => {
    const key = vm.dump(keyHandle);
    if (typeof key !== "string") {
      return {
        error: vm.newString("Expected key to be a string")
      };
    }
    const result = _function.pipe.call(void 0, getEnv(key, currentEnvs), O2.match(() => vm.undefined, ({ value }) => vm.newString(value)));
    return {
      value: result
    };
  });
  const envGetResolveHandle = vm.newFunction("getResolve", (keyHandle) => {
    const key = vm.dump(keyHandle);
    if (typeof key !== "string") {
      return {
        error: vm.newString("Expected key to be a string")
      };
    }
    const result = _function.pipe.call(void 0, getEnv(key, currentEnvs), E2.fromOption(() => "INVALID_KEY"), E2.map(({ value }) => _function.pipe.call(void 0, _data.parseTemplateStringE.call(void 0, value, [...envs.selected, ...envs.global]), E2.getOrElse(() => value))), E2.map((x) => vm.newString(x)), E2.getOrElse(() => vm.undefined));
    return {
      value: result
    };
  });
  const envSetHandle = vm.newFunction("set", (keyHandle, valueHandle) => {
    const key = vm.dump(keyHandle);
    const value = vm.dump(valueHandle);
    if (typeof key !== "string") {
      return {
        error: vm.newString("Expected key to be a string")
      };
    }
    if (typeof value !== "string") {
      return {
        error: vm.newString("Expected value to be a string")
      };
    }
    currentEnvs = setEnv(key, value, currentEnvs);
    return {
      value: vm.undefined
    };
  });
  const envResolveHandle = vm.newFunction("resolve", (valueHandle) => {
    const value = vm.dump(valueHandle);
    if (typeof value !== "string") {
      return {
        error: vm.newString("Expected value to be a string")
      };
    }
    const result = _function.pipe.call(void 0, _data.parseTemplateStringE.call(void 0, value, [
      ...currentEnvs.selected,
      ...currentEnvs.global
    ]), E2.getOrElse(() => value));
    return {
      value: vm.newString(result)
    };
  });
  vm.setProp(envHandle, "resolve", envResolveHandle);
  envResolveHandle.dispose();
  vm.setProp(envHandle, "set", envSetHandle);
  envSetHandle.dispose();
  vm.setProp(envHandle, "getResolve", envGetResolveHandle);
  envGetResolveHandle.dispose();
  vm.setProp(envHandle, "get", envGetHandle);
  envGetHandle.dispose();
  vm.setProp(pwHandle, "env", envHandle);
  envHandle.dispose();
  vm.setProp(vm.global, "pw", pwHandle);
  pwHandle.dispose();
  const evalRes = vm.evalCode(preRequestScript);
  if (evalRes.error) {
    const errorData = vm.dump(evalRes.error);
    evalRes.error.dispose();
    return TE.left(errorData);
  }
  vm.dispose();
  return TE.right(currentEnvs);
}));

// src/test-runner.ts






var _cloneDeep = require('lodash/cloneDeep'); var _cloneDeep2 = _interopRequireDefault(_cloneDeep);
function createExpectation(vm, expectVal, negated, currTestStack) {
  const resultHandle = vm.newObject();
  const toBeFnHandle = vm.newFunction("toBe", (expectedValHandle) => {
    const expectedVal = vm.dump(expectedValHandle);
    let assertion = expectVal === expectedVal;
    if (negated)
      assertion = !assertion;
    if (assertion) {
      currTestStack[currTestStack.length - 1].expectResults.push({
        status: "pass",
        message: `Expected '${expectVal}' to${negated ? " not" : ""} be '${expectedVal}'`
      });
    } else {
      currTestStack[currTestStack.length - 1].expectResults.push({
        status: "fail",
        message: `Expected '${expectVal}' to${negated ? " not" : ""} be '${expectedVal}'`
      });
    }
    return { value: vm.undefined };
  });
  const toBeLevel2xxHandle = vm.newFunction("toBeLevel2xx", () => {
    if (typeof expectVal === "number" && !Number.isNaN(expectVal)) {
      let assertion = expectVal >= 200 && expectVal <= 299;
      if (negated)
        assertion = !assertion;
      if (assertion) {
        currTestStack[currTestStack.length - 1].expectResults.push({
          status: "pass",
          message: `Expected '${expectVal}' to${negated ? " not" : ""} be 200-level status`
        });
      } else {
        currTestStack[currTestStack.length - 1].expectResults.push({
          status: "fail",
          message: `Expected '${expectVal}' to${negated ? " not" : ""} be 200-level status`
        });
      }
    } else {
      currTestStack[currTestStack.length - 1].expectResults.push({
        status: "error",
        message: `Expected 200-level status but could not parse value '${expectVal}'`
      });
    }
    return { value: vm.undefined };
  });
  const toBeLevel3xxHandle = vm.newFunction("toBeLevel3xx", () => {
    if (typeof expectVal === "number" && !Number.isNaN(expectVal)) {
      let assertion = expectVal >= 300 && expectVal <= 399;
      if (negated)
        assertion = !assertion;
      if (assertion) {
        currTestStack[currTestStack.length - 1].expectResults.push({
          status: "pass",
          message: `Expected '${expectVal}' to${negated ? " not" : ""} be 300-level status`
        });
      } else {
        currTestStack[currTestStack.length - 1].expectResults.push({
          status: "fail",
          message: `Expected '${expectVal}' to${negated ? " not" : ""} be 300-level status`
        });
      }
    } else {
      currTestStack[currTestStack.length - 1].expectResults.push({
        status: "error",
        message: `Expected 300-level status but could not parse value '${expectVal}'`
      });
    }
    return { value: vm.undefined };
  });
  const toBeLevel4xxHandle = vm.newFunction("toBeLevel4xx", () => {
    if (typeof expectVal === "number" && !Number.isNaN(expectVal)) {
      let assertion = expectVal >= 400 && expectVal <= 499;
      if (negated)
        assertion = !assertion;
      if (assertion) {
        currTestStack[currTestStack.length - 1].expectResults.push({
          status: "pass",
          message: `Expected '${expectVal}' to${negated ? " not" : ""} be 400-level status`
        });
      } else {
        currTestStack[currTestStack.length - 1].expectResults.push({
          status: "fail",
          message: `Expected '${expectVal}' to${negated ? " not" : ""} be 400-level status`
        });
      }
    } else {
      currTestStack[currTestStack.length - 1].expectResults.push({
        status: "error",
        message: `Expected 400-level status but could not parse value '${expectVal}'`
      });
    }
    return { value: vm.undefined };
  });
  const toBeLevel5xxHandle = vm.newFunction("toBeLevel5xx", () => {
    if (typeof expectVal === "number" && !Number.isNaN(expectVal)) {
      let assertion = expectVal >= 500 && expectVal <= 599;
      if (negated)
        assertion = !assertion;
      if (assertion) {
        currTestStack[currTestStack.length - 1].expectResults.push({
          status: "pass",
          message: `Expected '${expectVal}' to${negated ? " not" : ""} be 500-level status`
        });
      } else {
        currTestStack[currTestStack.length - 1].expectResults.push({
          status: "fail",
          message: `Expected '${expectVal}' to${negated ? " not" : ""} be 500-level status`
        });
      }
    } else {
      currTestStack[currTestStack.length - 1].expectResults.push({
        status: "error",
        message: `Expected 500-level status but could not parse value '${expectVal}'`
      });
    }
    return { value: vm.undefined };
  });
  const toBeTypeHandle = vm.newFunction("toBeType", (expectedValHandle) => {
    const expectedType = vm.dump(expectedValHandle);
    if ([
      "string",
      "boolean",
      "number",
      "object",
      "undefined",
      "bigint",
      "symbol",
      "function"
    ].includes(expectedType)) {
      let assertion = typeof expectVal === expectedType;
      if (negated)
        assertion = !assertion;
      if (assertion) {
        currTestStack[currTestStack.length - 1].expectResults.push({
          status: "pass",
          message: `Expected '${expectVal}' to${negated ? " not" : ""} be type '${expectedType}'`
        });
      } else {
        currTestStack[currTestStack.length - 1].expectResults.push({
          status: "fail",
          message: `Expected '${expectVal}' to${negated ? " not" : ""} be type '${expectedType}'`
        });
      }
    } else {
      currTestStack[currTestStack.length - 1].expectResults.push({
        status: "error",
        message: `Argument for toBeType should be "string", "boolean", "number", "object", "undefined", "bigint", "symbol" or "function"`
      });
    }
    return { value: vm.undefined };
  });
  const toHaveLengthHandle = vm.newFunction("toHaveLength", (expectedValHandle) => {
    const expectedLength = vm.dump(expectedValHandle);
    if (!(Array.isArray(expectVal) || typeof expectVal === "string")) {
      currTestStack[currTestStack.length - 1].expectResults.push({
        status: "error",
        message: `Expected toHaveLength to be called for an array or string`
      });
      return { value: vm.undefined };
    }
    if (typeof expectedLength === "number" && !Number.isNaN(expectedLength)) {
      let assertion = expectVal.length === expectedLength;
      if (negated)
        assertion = !assertion;
      if (assertion) {
        currTestStack[currTestStack.length - 1].expectResults.push({
          status: "pass",
          message: `Expected the array to${negated ? " not" : ""} be of length '${expectedLength}'`
        });
      } else {
        currTestStack[currTestStack.length - 1].expectResults.push({
          status: "fail",
          message: `Expected the array to${negated ? " not" : ""} be of length '${expectedLength}'`
        });
      }
    } else {
      currTestStack[currTestStack.length - 1].expectResults.push({
        status: "error",
        message: `Argument for toHaveLength should be a number`
      });
    }
    return { value: vm.undefined };
  });
  const toIncludeHandle = vm.newFunction("toInclude", (needleHandle) => {
    const expectedVal = vm.dump(needleHandle);
    if (!(Array.isArray(expectVal) || typeof expectVal === "string")) {
      currTestStack[currTestStack.length - 1].expectResults.push({
        status: "error",
        message: `Expected toInclude to be called for an array or string`
      });
      return { value: vm.undefined };
    }
    if (expectedVal === null) {
      currTestStack[currTestStack.length - 1].expectResults.push({
        status: "error",
        message: `Argument for toInclude should not be null`
      });
      return { value: vm.undefined };
    }
    if (expectedVal === void 0) {
      currTestStack[currTestStack.length - 1].expectResults.push({
        status: "error",
        message: `Argument for toInclude should not be undefined`
      });
      return { value: vm.undefined };
    }
    let assertion = expectVal.includes(expectedVal);
    if (negated)
      assertion = !assertion;
    const expectValPretty = JSON.stringify(expectVal);
    const expectedValPretty = JSON.stringify(expectedVal);
    if (assertion) {
      currTestStack[currTestStack.length - 1].expectResults.push({
        status: "pass",
        message: `Expected ${expectValPretty} to${negated ? " not" : ""} include ${expectedValPretty}`
      });
    } else {
      currTestStack[currTestStack.length - 1].expectResults.push({
        status: "fail",
        message: `Expected ${expectValPretty} to${negated ? " not" : ""} include ${expectedValPretty}`
      });
    }
    return { value: vm.undefined };
  });
  vm.setProp(resultHandle, "toBe", toBeFnHandle);
  vm.setProp(resultHandle, "toBeLevel2xx", toBeLevel2xxHandle);
  vm.setProp(resultHandle, "toBeLevel3xx", toBeLevel3xxHandle);
  vm.setProp(resultHandle, "toBeLevel4xx", toBeLevel4xxHandle);
  vm.setProp(resultHandle, "toBeLevel5xx", toBeLevel5xxHandle);
  vm.setProp(resultHandle, "toBeType", toBeTypeHandle);
  vm.setProp(resultHandle, "toHaveLength", toHaveLengthHandle);
  vm.setProp(resultHandle, "toInclude", toIncludeHandle);
  vm.defineProp(resultHandle, "not", {
    get: () => {
      return createExpectation(vm, expectVal, !negated, currTestStack);
    }
  });
  toBeFnHandle.dispose();
  toBeLevel2xxHandle.dispose();
  toBeLevel3xxHandle.dispose();
  toBeLevel4xxHandle.dispose();
  toBeLevel5xxHandle.dispose();
  toBeTypeHandle.dispose();
  toHaveLengthHandle.dispose();
  toIncludeHandle.dispose();
  return resultHandle;
}
var execTestScript = (testScript, envs, response) => _function.pipe.call(void 0, TE2.tryCatch(async () => await qjs2.getQuickJS(), (reason) => `QuickJS initialization failed: ${reason}`), TE2.chain((QuickJS) => {
  let currentEnvs = _cloneDeep2.default.call(void 0, envs);
  const vm = QuickJS.createVm();
  const pwHandle = vm.newObject();
  const testRunStack = [
    { descriptor: "root", expectResults: [], children: [] }
  ];
  const testFuncHandle = vm.newFunction("test", (descriptorHandle, testFuncHandle2) => {
    const descriptor = vm.getString(descriptorHandle);
    testRunStack.push({
      descriptor,
      expectResults: [],
      children: []
    });
    const result = vm.unwrapResult(vm.callFunction(testFuncHandle2, vm.null));
    result.dispose();
    const child = testRunStack.pop();
    testRunStack[testRunStack.length - 1].children.push(child);
  });
  const expectFnHandle = vm.newFunction("expect", (expectValueHandle) => {
    const expectVal = vm.dump(expectValueHandle);
    return {
      value: createExpectation(vm, expectVal, false, testRunStack)
    };
  });
  const responseObjHandle = marshalObjectToVM(vm, response);
  if (E3.isLeft(responseObjHandle))
    return TE2.left(`Response marshalling failed: ${responseObjHandle.left}`);
  vm.setProp(pwHandle, "response", responseObjHandle.right);
  responseObjHandle.right.dispose();
  vm.setProp(pwHandle, "expect", expectFnHandle);
  expectFnHandle.dispose();
  vm.setProp(pwHandle, "test", testFuncHandle);
  testFuncHandle.dispose();
  const envHandle = vm.newObject();
  const envGetHandle = vm.newFunction("get", (keyHandle) => {
    const key = vm.dump(keyHandle);
    if (typeof key !== "string") {
      return {
        error: vm.newString("Expected key to be a string")
      };
    }
    const result = _function.pipe.call(void 0, getEnv(key, currentEnvs), O3.match(() => vm.undefined, ({ value }) => vm.newString(value)));
    return {
      value: result
    };
  });
  const envGetResolveHandle = vm.newFunction("getResolve", (keyHandle) => {
    const key = vm.dump(keyHandle);
    if (typeof key !== "string") {
      return {
        error: vm.newString("Expected key to be a string")
      };
    }
    const result = _function.pipe.call(void 0, getEnv(key, currentEnvs), E3.fromOption(() => "INVALID_KEY"), E3.map(({ value }) => _function.pipe.call(void 0, _data.parseTemplateStringE.call(void 0, value, [
      ...envs.selected,
      ...envs.global
    ]), E3.getOrElse(() => value))), E3.map((x) => vm.newString(x)), E3.getOrElse(() => vm.undefined));
    return {
      value: result
    };
  });
  const envSetHandle = vm.newFunction("set", (keyHandle, valueHandle) => {
    const key = vm.dump(keyHandle);
    const value = vm.dump(valueHandle);
    if (typeof key !== "string") {
      return {
        error: vm.newString("Expected key to be a string")
      };
    }
    if (typeof value !== "string") {
      return {
        error: vm.newString("Expected value to be a string")
      };
    }
    currentEnvs = setEnv(key, value, currentEnvs);
    return {
      value: vm.undefined
    };
  });
  const envResolveHandle = vm.newFunction("resolve", (valueHandle) => {
    const value = vm.dump(valueHandle);
    if (typeof value !== "string") {
      return {
        error: vm.newString("Expected value to be a string")
      };
    }
    const result = _function.pipe.call(void 0, _data.parseTemplateStringE.call(void 0, value, [
      ...currentEnvs.selected,
      ...currentEnvs.global
    ]), E3.getOrElse(() => value));
    return {
      value: vm.newString(result)
    };
  });
  vm.setProp(envHandle, "resolve", envResolveHandle);
  envResolveHandle.dispose();
  vm.setProp(envHandle, "set", envSetHandle);
  envSetHandle.dispose();
  vm.setProp(envHandle, "getResolve", envGetResolveHandle);
  envGetResolveHandle.dispose();
  vm.setProp(envHandle, "get", envGetHandle);
  envGetHandle.dispose();
  vm.setProp(pwHandle, "env", envHandle);
  envHandle.dispose();
  vm.setProp(vm.global, "pw", pwHandle);
  pwHandle.dispose();
  const evalRes = vm.evalCode(testScript);
  if (evalRes.error) {
    const errorData = vm.dump(evalRes.error);
    evalRes.error.dispose();
    return TE2.left(`Script evaluation failed: ${errorData}`);
  }
  vm.dispose();
  return TE2.right({
    tests: testRunStack,
    envs: currentEnvs
  });
}));

// src/index.ts
var runTestScript = (testScript, envs, response) => _function.pipe.call(void 0, execTestScript(testScript, envs, response), TE3.chain((results) => TE3.right({
  envs: results.envs,
  tests: results.tests[0]
})));
var runPreRequestScript = execPreRequestScript;




exports.execTestScript = execTestScript; exports.runPreRequestScript = runPreRequestScript; exports.runTestScript = runTestScript;
//# sourceMappingURL=index.js.map