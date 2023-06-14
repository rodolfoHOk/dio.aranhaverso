import { NextResponse } from 'next/server';

import heroesJson from './heroes.json';

export async function GET() {
  return NextResponse.json({ data: heroesJson });
}
