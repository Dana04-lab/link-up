import { EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { auth } from '../firebase';

export const reauthenticate = async (password: string) => {
  if (!auth.currentUser || !auth.currentUser.email) return;

  const credential = EmailAuthProvider.credential(
    auth.currentUser.email,
    password
  );

  await reauthenticateWithCredential(auth.currentUser, credential);
};
