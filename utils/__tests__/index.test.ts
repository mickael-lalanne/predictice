import { describe, it, expect } from 'vitest';
import { getRandomNumber, sortArray } from '~/utils';

describe('getRandomNumber', () => {
    it('should return a number between the specified min and max values', () => {
        const min = 1;
        const max = 10;
        const randomNumber = getRandomNumber(min, max);
        expect(randomNumber).toBeGreaterThanOrEqual(min);
        expect(randomNumber).toBeLessThanOrEqual(max);
    });

    it('should return the same value when min and max are the same', () => {
        const minMax = 5;
        const randomNumber = getRandomNumber(minMax, minMax);
        expect(randomNumber).toBe(minMax);
    });
});

describe('sortArray', () => {
    interface TestObject {
        id: number;
        name: string;
    }

    const unsortedArray: TestObject[] = [
        { id: 3, name: 'Charlie' },
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
    ];

    it('should handle sorting by number keys', () => {
        const sortedArrayAsc = sortArray(unsortedArray, 'id', 'asc');
        expect(sortedArrayAsc).toEqual([
            { id: 1, name: 'Alice' },
            { id: 2, name: 'Bob' },
            { id: 3, name: 'Charlie' },
        ]);

        const sortedArrayDesc = sortArray(unsortedArray, 'id', 'desc');
        expect(sortedArrayDesc).toEqual([
            { id: 3, name: 'Charlie' },
            { id: 2, name: 'Bob' },
            { id: 1, name: 'Alice' },
        ]);
    });

    it('should handle sorting by string keys', () => {
        const sortedArrayAsc = sortArray(unsortedArray, 'name', 'asc');
        expect(sortedArrayAsc).toEqual([
            { id: 1, name: 'Alice' },
            { id: 2, name: 'Bob' },
            { id: 3, name: 'Charlie' },
        ]);

        const sortedArrayDesc = sortArray(unsortedArray, 'name', 'desc');
        expect(sortedArrayDesc).toEqual([
            { id: 3, name: 'Charlie' },
            { id: 2, name: 'Bob' },
            { id: 1, name: 'Alice' },
        ]);
    });
});
