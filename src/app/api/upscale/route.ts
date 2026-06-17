import { NextRequest, NextResponse } from 'next/server';
import { AIService } from '@/services/ai';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { image, options } = body;

    if (!image) {
      return NextResponse.json({ error: 'Missing image data.' }, { status: 400 });
    }

    const result = await AIService.processImage(image, 'upscale', options);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Upscaling failed.' }, { status: 500 });
  }
}
