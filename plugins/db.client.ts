import Dexie, { type EntityTable } from 'dexie';

const db = new Dexie('PrediReflexDatabase') as Dexie & {
    results: EntityTable<PrediReflexResult>;
};

db.version(1).stores({
    results: '++id, username, result',
});

export default defineNuxtPlugin(() => {
    return {
        provide: {
            db,
        },
    };
});
