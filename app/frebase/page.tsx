'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/app/firebase';

export default function FirestoreTest() {
  const [docs, setDocs] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'savedMessages'));
        const result = snapshot.docs.map((doc) => doc.id);
        setDocs(result);
      } catch (err) {
        console.error('❌ Firestore error:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4 text-white">
      <h1 className="text-xl font-bold mb-2">🔍 Firestore Тест</h1>
      {docs.length > 0 ? (
        <ul>{docs.map((id) => <li key={id}>{id}</li>)}</ul>
      ) : (
        <p>Деректер табылмады немесе қосыла алмады.</p>
      )}
    </div>
  );
}
