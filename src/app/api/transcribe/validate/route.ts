import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { validateVideoForTranscription } from '@/lib/youtube';

/**
 * POST /api/transcribe/validate
 * Validates a YouTube video for transcription based on user's subscription
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { url } = await request.json();

    if (!url || typeof url !== 'string') {
      return NextResponse.json(
        { error: 'YouTube URL is required' },
        { status: 400 }
      );
    }

    // TODO: Get user's subscription tier and usage from database
    // For now, we'll use free_trial as default
    const subscriptionTier = 'free_trial';
    const currentMonthUsage = 0;

    const validation = await validateVideoForTranscription(
      url,
      subscriptionTier,
      currentMonthUsage
    );

    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      videoInfo: validation.videoInfo,
      message: 'Video is valid for transcription'
    });

  } catch (error) {
    console.error('Validation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
