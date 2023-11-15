import _ from 'lodash';

const uiautomator2ServerLaunchTimeout = process.env.CI ? 60000 : 20000;
const uiautomator2ServerInstallTimeout = process.env.CI ? 120000 : 20000;

const ADB_EXEC_TIMEOUT = process.env.CI ? 60000 : 20000;

function deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === 'object') {
      deepFreeze(value);
    }
  }
  return Object.freeze(object);
}

function amendCapabilities(baseCaps, ...newCaps) {
  return ({
    alwaysMatch: _.cloneDeep(Object.assign({}, baseCaps.alwaysMatch, ...newCaps)),
    firstMatch: [{}],
  });
}

const GENERIC_CAPS = 
// deepFreeze(
  {
  firstMatch: [{}],
  alwaysMatch: {
    'appium:deviceName': 'Android',
    platformName: 'Android',
    'appium:uiautomator2ServerLaunchTimeout': uiautomator2ServerLaunchTimeout,
    'appium:uiautomator2ServerInstallTimeout': uiautomator2ServerInstallTimeout,
    'appium:automationName': 'uiautomator2',
    'appium:adbExecTimeout': ADB_EXEC_TIMEOUT,
    'appium:ignoreHiddenApiPolicyError': true,
  },
}

const APIDEMOS_CAPS = amendCapabilities(GENERIC_CAPS, {
  'appium:appPackage': 'io.appium.android.apis',
  'appium:appActivity': '.ApiDemos',
  'appium:disableWindowAnimation': true,
});

export {
  GENERIC_CAPS,
  APIDEMOS_CAPS,
  amendCapabilities,
};