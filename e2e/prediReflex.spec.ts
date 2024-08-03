import { expect, test } from '@nuxt/test-utils/playwright';

test('displays a message when there are no results', async ({ page, goto }) => {
    await goto('/ranking');

    await expect(page.getByTestId('no-results-message')).toBeVisible();
});

test('plays a game', async ({ page, goto }) => {
    const PLAYER_NAME: string = 'Bruce Wayne';

    // The square can take 4s to appear, so we need to increase the timeout.
    test.setTimeout(50000);

    await goto('/prediReflex');

    // Check the button is disabled
    await expect(page.getByTestId('play-button')).toBeDisabled();

    // Fill the username input
    await page.getByTestId('username-input').fill(PLAYER_NAME);

    // The button should be enabled now
    await expect(page.getByTestId('play-button')).toBeEnabled();

    await page.getByTestId('play-button').click();

    // After a short delay, the square should appear
    await expect(page.getByTestId('square')).toBeVisible();
    await page.getByTestId('square').click();

    // The result should be visible
    await expect(page.getByTestId('result-box')).toBeVisible();

    // Go back to the ranking page to check the result
    await goto('/ranking');
    await expect(page.getByTestId('no-results-message')).not.toBeVisible();
    await expect(page.getByTestId('list-view')).toBeVisible();
    await expect(page.getByText(PLAYER_NAME)).toBeTruthy();
});
