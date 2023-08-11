const puppeteer = require("puppeteer");

const user_email = "stefan.krender@gmail.com";
const user_handle = "tungduy2904";
const password = "DuyTung2002";

async function fkTwitter() {
    const browser = await puppeteer.launch({
        headless: false,
    });
    const page = await browser.newPage();
    await page.goto("https://twitter.com/i/flow/login");
    await page.waitForNetworkIdle({ idleTime: 1500 });
    await page.waitForSelector("[autocomplete=username]");
    await page.type("input[autocomplete=username]", user_email, { delay: 50 });
    // Press the Next button
    await page.evaluate(() =>
        document.querySelectorAll('div[role="button"]')[2].click()
    );
    await page.waitForNetworkIdle({ idleTime: 1500 });
    ///////////////////////////////////////////////////////////////////////////////////
    // Sometimes twitter suspect suspicious activties, so it ask for your handle/phone Number
    const extractedText = await page.$eval("*", (el) => el.innerText);
    if (extractedText.includes("Enter your phone number or username")) {
        await page.waitForSelector("[autocomplete=on]");
        await page.type("input[autocomplete=on]", user_handle, { delay: 50 });
        await page.evaluate(() =>
            document.querySelectorAll('div[role="button"]')[1].click()
        );
        await page.waitForNetworkIdle({ idleTime: 1500 });
    }
    await page.waitForSelector('[autocomplete="current-password"]');
    await page.type('[autocomplete="current-password"]', password, { delay: 50 });
    await page.evaluate(() =>
        document.querySelectorAll('div[role="button"]')[2].click()
    );
    await page.waitForNetworkIdle({ idleTime: 2000 });

    await browser.close();
}

fkTwitter();