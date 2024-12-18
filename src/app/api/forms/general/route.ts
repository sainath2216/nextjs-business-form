import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // For now, just return success as we're only persisting in session
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to process form:', error);
    return NextResponse.json(
      { error: 'Failed to process form data' },
      { status: 500 }
    );
  }
}