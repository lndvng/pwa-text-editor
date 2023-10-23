import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  try {
    const db = await openDB('jate', 1);
    const tx = db.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');

    // Use the `put` method to add or update content
    const request = store.put({
      id: 1,
      value: content,
    });

    // Ensure the transaction is complete
    await request;

    console.log('Content added to the database:', content);
  } catch (error) {
    console.error('putDb not implemented', error);
  }
}

// console.error('putDb not implemented');

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  try {
    const db = await openDB('jate', 1);
    const tx = db.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');

    // Use the `getAll` method to retrieve all content
    const content = await store.get(1);

    return content?.value;
  } catch (error) {
    console.error('getDb not implemented', error);
    return [];
  }
} 
// console.error('getDb not implemented');

initdb();