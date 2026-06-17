import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided.' }, { status: 400 });
    }

    // Basic size checking (10MB limit)
    const limit = 10 * 1024 * 1024;
    if (file.size > limit) {
      return NextResponse.json({ error: 'File exceeds 10MB limit.' }, { status: 400 });
    }

    // Convert file to base64 buffer for response
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = `data:${file.type};base64,${buffer.toString('base64')}`;

    return NextResponse.json({
      name: file.name,
      type: file.type,
      size: file.size,
      base64,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Upload processing failed.' }, { status: 500 });
  }
}
