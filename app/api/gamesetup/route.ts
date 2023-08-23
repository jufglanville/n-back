import { gameSetup } from '@/utils/gameSetup';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  return NextResponse.json(gameSetup());
}
