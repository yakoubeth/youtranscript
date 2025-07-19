import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/youtube/metadata?videoId=VIDEO_ID
 * Proxy endpoint to fetch YouTube video metadata using oEmbed API
 * This avoids CORS issues when calling from the client
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const videoId = searchParams.get('videoId');

    if (!videoId) {
      return NextResponse.json(
        { error: 'Video ID is required' },
        { status: 400 }
      );
    }

    // Validate video ID format
    const videoIdPattern = /^[a-zA-Z0-9_-]{11}$/;
    if (!videoIdPattern.test(videoId)) {
      return NextResponse.json(
        { error: 'Invalid video ID format' },
        { status: 400 }
      );
    }

    // Try YouTube Data API first if available
    const youtubeApiKey = process.env.YOUTUBE_API_KEY;
    if (youtubeApiKey) {
      try {
        const apiResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${youtubeApiKey}&part=snippet,contentDetails,statistics`
        );

        if (apiResponse.ok) {
          const apiData = await apiResponse.json();
          
          if (apiData.items && apiData.items.length > 0) {
            const video = apiData.items[0];
            const snippet = video.snippet;
            const contentDetails = video.contentDetails;
            const statistics = video.statistics;

            // Parse duration from ISO 8601 format
            const duration = parseDurationISO(contentDetails.duration);

            const videoInfo = {
              id: videoId,
              title: snippet.title,
              duration: duration,
              thumbnail: snippet.thumbnails?.high?.url || `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
              channel: snippet.channelTitle,
              description: snippet.description,
              uploadDate: snippet.publishedAt,
              viewCount: statistics?.viewCount ? parseInt(statistics.viewCount, 10) : undefined,
            };

            return NextResponse.json({ videoInfo });
          }
        }
      } catch (error) {
        console.warn('YouTube API failed, falling back to oEmbed:', error);
      }
    }

    // Fallback to oEmbed API
    const oEmbedResponse = await fetch(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`,
      {
        headers: {
          'User-Agent': 'YouTranscript/1.0'
        }
      }
    );

    if (!oEmbedResponse.ok) {
      if (oEmbedResponse.status === 404) {
        return NextResponse.json(
          { error: 'Video not found or unavailable' },
          { status: 404 }
        );
      }
      
      return NextResponse.json(
        { error: 'Failed to fetch video metadata' },
        { status: 500 }
      );
    }

    const oEmbedData = await oEmbedResponse.json();
    
    // Try to get additional metadata by scraping (basic approach)
    let duration = 0;
    try {
      const pageResponse = await fetch(`https://www.youtube.com/watch?v=${videoId}`, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });
      
      if (pageResponse.ok) {
        const html = await pageResponse.text();
        
        // Try to extract duration from page metadata
        const durationMatch = html.match(/"lengthSeconds":"(\d+)"/);
        if (durationMatch && durationMatch[1]) {
          duration = parseInt(durationMatch[1], 10);
        }
      }
    } catch (error) {
      console.warn('Could not fetch additional metadata:', error);
    }
    
    // Transform oEmbed data to our format
    const videoInfo = {
      id: videoId,
      title: oEmbedData.title || 'Unknown Title',
      duration: duration,
      thumbnail: oEmbedData.thumbnail_url || `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      channel: oEmbedData.author_name || 'Unknown Channel',
      description: '',
      uploadDate: new Date().toISOString(),
    };

    return NextResponse.json({ videoInfo });

  } catch (error) {
    console.error('Error fetching video metadata:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Parse ISO 8601 duration format (PT4M13S) to seconds
 */
function parseDurationISO(isoDuration: string): number {
  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;

  const hours = parseInt(match[1] || '0', 10);
  const minutes = parseInt(match[2] || '0', 10);
  const seconds = parseInt(match[3] || '0', 10);

  return hours * 3600 + minutes * 60 + seconds;
}
