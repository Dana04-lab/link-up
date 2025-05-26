import { NextRequest, NextResponse } from 'next/server';
import { StreamChat } from 'stream-chat';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userId = body.user_id;

    if (!userId) {
      return NextResponse.json({ error: 'user_id қажет' }, { status: 400 });
    }

    const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY!;
    const apiSecret = process.env.STREAM_SECRET!;

    if (!apiKey || !apiSecret) {
      return NextResponse.json({ error: 'Stream API кілттері жетіспейді' }, { status: 500 });
    }

    const serverClient = StreamChat.getInstance(apiKey, apiSecret);
    const token = serverClient.createToken(userId);

    return NextResponse.json({ token });
  } catch (error) {
    console.error('❌ /api/token қатесі:', error);
    return NextResponse.json({ error: 'Токен жасау сәтсіз аяқталды' }, { status: 500 });
  }
}
