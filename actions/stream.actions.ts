const tokenProvider = async (userId: string): Promise<string> => {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL || '';
  const res = await fetch(`${baseURL}/api/token?userId=${userId}`);

  if (!res.ok) {
    const errorText = await res.text();
    console.error("❌ Token fetch failed:", res.status, errorText);
    throw new Error("Token fetch failed");
  }

  const data = await res.json();

  if (!data?.token) {
    console.error("❌ Token бос немесе жарамсыз:", data);
    throw new Error("Invalid token format");
  }

  return data.token;
};

export default tokenProvider;
