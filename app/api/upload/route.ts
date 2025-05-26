import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json({ error: 'No file received' }, { status: 400 });
  }

  // Бұл тек тест үшін: шынайы сервер URL орнына mock URL қайтарады
  const name = file.name;
  const url = `https://your-server.com/uploads/${name}`;

  return NextResponse.json({ name, url });
}
