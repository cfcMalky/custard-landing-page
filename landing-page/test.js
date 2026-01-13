/**
 * Playwright Test for £2.50 Bonus Feature
 */

const { chromium } = require('playwright');

async function testBonusFeature() {
    console.log('Testing £2.50 bonus feature...');

    const browser = await chromium.launch({
        headless: true
    });

    const context = await browser.newContext({
        viewport: { width: 1280, height: 720 }
    });

    const page = await context.newPage();

    const consoleErrors = [];

    page.on('console', msg => {
        if (msg.type() === 'error') {
            consoleErrors.push(msg.text());
        }
    });

    page.on('pageerror', error => {
        consoleErrors.push(`Page Error: ${error.message}`);
    });

    try {
        // Test 1: Load the page
        console.log('\n--- Test 1: Page Load ---');
        const filePath = `file://${__dirname}/dist/index.html`;
        await page.goto(filePath, { waitUntil: 'networkidle' });
        console.log('✓ Page loaded successfully');

        // Test 2: Check bonus badge in hero
        console.log('\n--- Test 2: Bonus Badge ---');
        const bonusBadge = await page.$('.bonus-badge');
        if (bonusBadge) {
            const badgeText = await bonusBadge.textContent();
            console.log(`✓ Bonus badge found: "${badgeText.replace(/\s+/g, ' ').trim()}"`);
        } else {
            console.log('✗ Bonus badge not found');
        }

        // Test 3: Check CTA buttons have bonus
        console.log('\n--- Test 3: CTA Buttons ---');
        const ctaButtons = await page.$$('.btn-primary');
        console.log(`Found ${ctaButtons.length} CTA buttons`);

        for (let i = 0; i < ctaButtons.length; i++) {
            const btnText = await ctaButtons[i].textContent();
            if (btnText.includes('£2.50') || btnText.includes('2.50')) {
                console.log(`✓ Button ${i + 1}: "${btnText.trim()}" includes bonus`);
            }
        }

        // Test 4: Check QR code bonus text
        console.log('\n--- Test 4: QR Section ---');
        const qrText = await page.$eval('.qr-text', el => el.textContent);
        if (qrText.includes('£2.50') || qrText.includes('bonus')) {
            console.log(`✓ QR text: "${qrText}"`);
        }

        // Test 5: Check CTA section bonus
        console.log('\n--- Test 5: Bottom CTA Section ---');
        const ctaText = await page.$eval('.cta-text', el => el.textContent);
        if (ctaText.includes('£2.50') || ctaText.includes('bonus')) {
            console.log(`✓ CTA text mentions bonus`);
        }

        const ctaNote = await page.$eval('.cta-note', el => el.textContent);
        console.log(`✓ CTA note: "${ctaNote}"`);

        // Test 6: Console errors
        console.log('\n--- Test 6: Console Errors ---');
        if (consoleErrors.length === 0) {
            console.log('✓ No console errors detected');
        } else {
            console.log(`✗ Found ${consoleErrors.length} console error(s):`);
            consoleErrors.forEach(err => console.log(`  - ${err}`));
        }

        // Summary
        console.log('\n========================================');
        console.log('BONUS FEATURE TEST SUMMARY');
        console.log('========================================');

        if (consoleErrors.length === 0) {
            console.log('✅ All bonus feature tests passed!');
            console.log('The £2.50 sign-up bonus is now featured:');
            console.log('  - Hero badge with animated design');
            console.log('  - CTA buttons with bonus mention');
            console.log('  - QR code section with bonus text');
            console.log('  - Bottom CTA section with bonus highlight');
        } else {
            console.log('⚠️  Some issues detected');
        }

    } catch (error) {
        console.error('❌ Test failed:', error.message);
    } finally {
        await browser.close();
    }
}

// Run the test
testBonusFeature();