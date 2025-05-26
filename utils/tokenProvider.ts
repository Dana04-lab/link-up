export const tokenProvider = async (userId: string): Promise<string> => {
  const response = await fetch('/api/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: userId }),
  });

  if (!response.ok) {
    throw new Error('🔐 Токен алуда қате');
  }

  const data = await response.json();
  return data.token;
};
