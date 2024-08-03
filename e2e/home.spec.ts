import { expect, test } from '@nuxt/test-utils/playwright';

test.beforeEach(async ({ goto }) => {
    await goto('/');
});

test('has title', async ({ page }) => {
    await expect(page).toHaveTitle(/Home/);
});

test('header is still visible after scrolling', async ({ page }) => {
    // Scroll to the bottom of the page.
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Expects the header to be visible.
    await expect(page.getByTestId('app-header')).toBeVisible();
});

test('clicks on a post', async ({ page }) => {
    // There is a fake delay in the API response, so we need to increase the timeout.
    test.setTimeout(100000);

    // Click on the first post.
    await page.getByTestId('post-card').first().click();

    await expect(page).toHaveTitle(/Home - Post details/);

    // Expects to have a skeleton loader while the post is loading.
    await expect(page.getByTestId('skeleton').first()).toBeVisible();

    // After a short delay, the post should be visible.
    await expect(page.getByText('You are currently reading the post')).toBeVisible();
});
