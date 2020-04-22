/* globals gauge*/
"use strict";
const { openBrowser, write, closeBrowser, goto, screenshot, into, $, radioButton, click, focus, textBox, toRightOf } = require('taiko');
const headless = process.env.headless_chrome.toLowerCase() === 'true';

beforeSuite(async() => {
    await openBrowser({ headless: headless })
});

afterSuite(async() => {
    await closeBrowser();
});

gauge.screenshotFn = async function() {
    return await screenshot({ encoding: 'base64' });
};

step("Goto home page", async() => {
    await goto('http://localhost:8080');
});

step("Enter name", async() => {
    await focus(textBox(toRightOf('Name')))
    await write("Joe Doe", into(textBox({ name: "name" })));
});

step("Check that all three shapes exist", async() => {
    await radioButton({ value: 'square' }).isVisible();
    await radioButton({ value: 'circle' }).isVisible();
    await radioButton({ value: 'triangle' }).isVisible();
});

step("Select the <shape>", async(shape) => {
    await click($(`.shapes input[value=${shape}]`));
})