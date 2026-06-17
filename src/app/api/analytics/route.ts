import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/services/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const password = searchParams.get('p') || request.headers.get('x-admin-password');

    const expectedPassword = process.env.ADMIN_PASSWORD || 'admin_secure_password_123';
    
    if (password !== expectedPassword) {
      return NextResponse.json({ error: 'Unauthorized access.' }, { status: 401 });
    }

    const stats = db.getStats();
    return NextResponse.json(stats);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Analytics fetch failed.' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const password = searchParams.get('p') || request.headers.get('x-admin-password');

    const expectedPassword = process.env.ADMIN_PASSWORD || 'admin_secure_password_123';
    
    if (password !== expectedPassword) {
      return NextResponse.json({ error: 'Unauthorized access.' }, { status: 401 });
    }

    db.resetStats();
    return NextResponse.json({ message: 'Stats reset successfully.' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Analytics reset failed.' }, { status: 500 });
  }
}
