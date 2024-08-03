import { flushPromises } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { registerEndpoint, mountSuspended } from '@nuxt/test-utils/runtime';
import DetailedHome from '~/pages/home/[id].vue';
import { defineAsyncComponent } from '~/vitest.setup';

const FETCH_DELAY = 1000;

describe('DetailedHome', () => {
    const mockPost: Post = {
        id: 1,
        title: 'Post Title',
        body: 'Post Body',
        userId: 1,
    };
    const mockResponse = () =>
        new Promise(resolve => setTimeout(() => resolve(mockPost), FETCH_DELAY));
    registerEndpoint('/api/post/1', mockResponse);
    registerEndpoint('/api/post/2', () => new Error('Internal Server Error'));

    const DetailedHomeComponent = defineAsyncComponent(DetailedHome);

    it('renders skeletons while loading', async () => {
        const component = await mountSuspended(DetailedHomeComponent, { route: '/home/1' });

        expect(component.findAllComponents('[data-testid="skeleton"]').length).toBe(
            3,
        );
    });

    it('renders post details when data is available', async () => {
        const component = await mountSuspended(DetailedHomeComponent, { route: '/home/1' });

        // Wait for the server response
        await new Promise(resolve => setTimeout(resolve, FETCH_DELAY + 500));

        expect(component.text()).toContain(
            `You are currently reading the post : #${mockPost.id}`,
        );
        expect(component.text()).toContain(mockPost.title);
        expect(component.text()).toContain(mockPost.body);
    });

    it('displays an error message when fetching fails', async () => {
        const component = await mountSuspended(DetailedHomeComponent, { route: '/home/2' });

        await flushPromises();

        expect(component.find('[data-test="error-alert"]').exists()).toBe(true);
    });
});
