import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');
  
  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  try {
    const response = await axios.post(`http://qr-api-service/generate-qr/?url=${encodeURIComponent(url)}`);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error generating QR Code:', error);
    return NextResponse.json({ error: 'Failed to generate QR Code' }, { status: 500 });
  }
}