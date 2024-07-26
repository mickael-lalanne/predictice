export const getRandomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

/**
 * Sorts an array of objects based on a specified key in ascending or descending order.
 * @param {T[]} array - The array to be sorted.
 * @param {keyof T} key - The key to sort the objects by.
 * @param {'asc' | 'desc'} order - The order in which to sort the objects. Default is 'asc' (ascending).
 * @returns The sorted array.
 */
export const sortArray = <T>(
    array: T[],
    key: keyof T,
    order: 'asc' | 'desc' = 'asc',
): T[] => {
    return array.sort((a, b) => {
        if (a[key] < b[key]) {
            return order === 'asc' ? -1 : 1;
        }
        if (a[key] > b[key]) {
            return order === 'asc' ? 1 : -1;
        }
        return 0;
    });
};
