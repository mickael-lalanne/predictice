import { flushPromises } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import {
    registerEndpoint,
    mountSuspended,
    mockNuxtImport,
} from '@nuxt/test-utils/runtime';
import { defineAsyncComponent } from '~/vitest.setup';
import Home from '~/pages/index.vue';

// Mocks the navigateTo function to test navigation
const { navigateToMock } = vi.hoisted(() => {
    return {
        navigateToMock: vi.fn().mockImplementation(() => {
            return vi.fn();
        }),
    };
});
mockNuxtImport('navigateTo', () => {
    return navigateToMock;
});

const postsMock: Post[] = [
    { id: 1, title: 'Post 1', body: 'This is the first post.', userId: 1 },
    { id: 2, title: 'Post 2', body: 'This is the second post.', userId: 2 },
];

registerEndpoint('/api/posts', () => postsMock);
describe('HomePage', () => {
    const HomeComponent = defineAsyncComponent(Home);

    it('renders a list of posts', async () => {
        const component = await mountSuspended(HomeComponent);

        // Wait for async operations to complete
        await flushPromises();

        const cards = component.findAllComponents('[data-testid="post-card"]');
        expect(cards.length).toBe(postsMock.length);

        cards.forEach((card, index) => {
            const post = postsMock[index];
            expect(card.text()).toContain(post.title);
            expect(card.text()).toContain(post.body);
            expect(card.text()).toContain(post.id.toString());
        });
    });

    it('navigates to the correct post when a card is clicked', async () => {
        const component = await mountSuspended(HomeComponent);

        // Wait for async operations to complete
        await flushPromises();

        const firstCard = component.findComponent('[data-testid="post-card"]');
        await firstCard.trigger('click');

        expect(navigateToMock).toHaveBeenCalledWith('/home/1');
    });
});
