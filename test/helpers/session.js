import { DEFAULT_HOST, DEFAULT_PORT } from './constants.js';
import logger from '../../lib/logger.js';
import { remote } from 'webdriverio';


const INIT_RETRIES = process.env.CI ? 2 : 1;
const ALERT_CHECK_RETRIES = 5;
const ALERT_CHECK_INTERVAL = 1000;


let driver;

async function initSession(caps, remoteOpts = {}) {
    // Create the driver
    const host = DEFAULT_HOST;
    const port = DEFAULT_PORT;
    const opts = Object.assign({}, remoteOpts, {
        hostname: host,
        port,
        capabilities: caps,
    });
    logger.debug(`Starting session on ${host}:${port}`);
    driver = await remote(opts);

    // attemptToDismissAlert(caps);

    await driver.setTimeout({ implicit: process.env.CI ? 30000 : 5000 });

    return driver;
}

async function deleteSession() {
    try {
        await driver.deleteSession();
    } catch (ign) { }
}

export { initSession, deleteSession };