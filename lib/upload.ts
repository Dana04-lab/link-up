import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/app/firebase';

/**
 * 🔼 Құжатты Firebase Storage-ке жүктейді және Firestore-ға метадерек сақтайды
 */
export async function uploadFile(file: File, userId: string, type: string) {
  const fileRef = ref(storage, `uploads/${userId}/${Date.now()}_${file.name}`);
  await uploadBytes(fileRef, file);
  const url = await getDownloadURL(fileRef);

  const docRef = await addDoc(collection(db, 'savedMessages'), {
    userId,
    type,
    url,
    name: file.name,
    timestamp: serverTimestamp(),
  });

  return { id: docRef.id, name: file.name, type, url };
}

/**
 * ✉️ Тексттік хабарлама жіберу
 */
export async function sendTextMessage(text: string, userId: string) {
  const docRef = await addDoc(collection(db, 'savedMessages'), {
    userId,
    type: 'text',
    content: text,
    timestamp: serverTimestamp(),
  });

  return { id: docRef.id, content: text, type: 'text' };
}

/**
 * 🗑️ Құжатты немесе хабарламаны жою
 */
export async function deleteSavedItem(id: string) {
  const itemRef = doc(db, 'savedMessages', id);
  await deleteDoc(itemRef);
}

/**
 * 🔄 SavedItems тізімін real-time тыңдау (onSnapshot)
 */
export function listenToSavedItems(userId: string, onUpdate: (items: any[]) => void) {
  const q = query(collection(db, 'savedMessages'), orderBy('timestamp', 'desc'));

  return onSnapshot(q, (snapshot) => {
    const items = snapshot.docs
      .filter((doc) => doc.data().userId === userId)
      .map((doc) => ({ id: doc.id, ...doc.data() }));
    onUpdate(items);
  });
}
