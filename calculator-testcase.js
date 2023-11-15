import { remote } from 'webdriverio';
import { expect } from 'chai';

const capabilities = {
  platformName: 'Android',
  'appium:options': {
    automationName: 'UiAutomator2',
    deviceName: 'Android',
    appPackage: 'com.dencreak.dlcalculator',
    appActivity: 'com.dencreak.dlcalculator.DLCalculatorActivity',
    printPageSourceOnFindFailure: true,
    eventTimings: true
  }
}

const wdOpts = {
  hostname: process.env.APPIUM_HOST || '<your_appium_server_addr>',
  port: parseInt(process.env.APPIUM_PORT, 10) || <your_appium_server_port>,
  // logLevel: 'info',
  capabilities,
};

async function runTest() {
  const driver = await remote(wdOpts);
  try {
    const val1 = await driver.$('//*[@text="8"]');
    const val2 = await driver.$('//*[@text="5"]');
    const opertator = await driver.$('//*[@resource-id="com.dencreak.dlcalculator:id/pad_img_d_d"]')
    const result = await driver.$('//*[@resource-id="com.dencreak.dlcalculator:id/lay_normal_body_result"]')
    await val1.click()
    await opertator.click()
    await val2.click()
    expect((await result.getText()).toString()).to.eql('13')
  } finally {
    await driver.pause(10000);
  }
}

runTest().catch(console.error);