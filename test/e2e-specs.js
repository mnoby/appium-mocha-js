import { expect } from 'chai'
import { APIDEMOS_CAPS, amendCapabilities } from './desired.js';
import { initSession, deleteSession } from './helpers/session.js';

const APIDEMOS_PACKAGE = 'com.dencreak.dlcalculator'; // CLevcalc
const APIDEMOS_SPLIT_TOUCH_ACTIVITY = 'com.dencreak.dlcalculator.DLCalculatorActivity';

let driver;

describe('default adb port', function () {
    afterEach(async function () {
        if (driver) {
            await deleteSession();
        }
        driver = null;
    });

    it('User Able to do Addition Operation', async function () {
        const caps = amendCapabilities(APIDEMOS_CAPS, {
            'appium:appPackage': APIDEMOS_PACKAGE,
            'appium:appActivity': APIDEMOS_SPLIT_TOUCH_ACTIVITY,
        });
        driver = await initSession(caps);
        // await driver.getCurrentPackage().should.eventually.equal(APIDEMOS_PACKAGE);
        // await driver.getCurrentActivity().should.eventually.equal(APIDEMOS_SPLIT_TOUCH_ACTIVITY);

        const val1 = await driver.$('//*[@text="8"]');
        const val2 = await driver.$('//*[@text="5"]');
        const opertator = await driver.$('//*[@resource-id="com.dencreak.dlcalculator:id/pad_img_d_d"]')
        const result = await driver.$('//*[@resource-id="com.dencreak.dlcalculator:id/lay_normal_body_result"]')
        await val1.click()
        await opertator.click()
        await val2.click()
        // console.log(`<<<<< ${(await result.getText()).toString()}`)
        // expect(result).to.eql('13')
        expect((await result.getText()).toString()).to.eql('13')
    });

});

// });

// describe('close', function () {
// it('should close application', async function () {
//     const driver = await initSession(APIDEMOS_CAPS);
//     await driver.closeApp();
//     APIDEMOS_PACKAGE.should.not.equal(await driver.getCurrentPackage());
// });
// });