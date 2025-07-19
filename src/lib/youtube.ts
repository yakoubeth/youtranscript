/**
 * YouTube Integration Utilities
 * Handles URL validation, metadata extraction, and video processing
 */

export interface YouTubeVideoInfo {
  id: string;
  title: string;
  duration: number; // in seconds
  thumbnail: string;
  channel: string;
  description: string;
  uploadDate: string;
  viewCount?: number;
}

export interface VideoLimits {
  maxDuration: number; // in seconds
  maxVideosPerMonth: number;
}

export const SUBSCRIPTION_LIMITS: Record<string, VideoLimits> = {
  free_trial: {
    maxDuration: 30 * 60, // 30 minutes
    maxVideosPerMonth: 5,
  },
  pro: {
    maxDuration: 2 * 60 * 60, // 2 hours
    maxVideosPerMonth: 100,
  },
  ultra: {
    maxDuration: Infinity, // unlimited
    maxVideosPerMonth: Infinity,
  },
};

/**
 * Validates YouTube URL and extracts video ID
 * Supports various YouTube URL formats:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 * - https://www.youtube.com/v/VIDEO_ID
 * - https://m.youtube.com/watch?v=VIDEO_ID
 */
export function validateYouTubeUrl(url: string): { isValid: boolean; videoId?: string; error?: string } {
  if (!url || typeof url !== 'string') {
    return { isValid: false, error: 'URL is required' };
  }

  // Remove whitespace and ensure it's a string
  const cleanUrl = url.trim();

  // YouTube video ID regex pattern (11 characters, alphanumeric and hyphens/underscores)
  const videoIdPattern = /^[a-zA-Z0-9_-]{11}$/;

  // Various YouTube URL patterns
  const patterns = [
    // Standard watch URL
    /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
    // Short URL
    /^(?:https?:\/\/)?youtu\.be\/([a-zA-Z0-9_-]{11})/,
    // Embed URL
    /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    // Old format
    /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/v\/([a-zA-Z0-9_-]{11})/,
    // Mobile URL
    /^(?:https?:\/\/)?m\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
    // YouTube Music
    /^(?:https?:\/\/)?music\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = cleanUrl.match(pattern);
    if (match && match[1]) {
      const videoId = match[1];
      if (videoIdPattern.test(videoId)) {
        return { isValid: true, videoId };
      }
    }
  }

  // Check if it's just a video ID
  if (videoIdPattern.test(cleanUrl)) {
    return { isValid: true, videoId: cleanUrl };
  }

  return { 
    isValid: false, 
    error: 'Invalid YouTube URL format. Please provide a valid YouTube video URL.' 
  };
}

/**
 * Extracts video ID from a validated YouTube URL
 */
export function extractVideoId(url: string): string | null {
  const result = validateYouTubeUrl(url);
  return result.isValid ? result.videoId! : null;
}

/**
 * Generates YouTube thumbnail URL from video ID
 */
export function getYouTubeThumbnail(videoId: string, quality: 'default' | 'hq' | 'mq' | 'sd' | 'maxres' = 'hq'): string {
  const qualityMap = {
    default: 'default',
    hq: 'hqdefault',
    mq: 'mqdefault',
    sd: 'sddefault',
    maxres: 'maxresdefault',
  };
  
  return `https://img.youtube.com/vi/${videoId}/${qualityMap[quality]}.jpg`;
}

/**
 * Converts duration from ISO 8601 format (PT4M13S) to seconds
 */
export function parseDuration(isoDuration: string): number {
  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;

  const hours = parseInt(match[1] || '0', 10);
  const minutes = parseInt(match[2] || '0', 10);
  const seconds = parseInt(match[3] || '0', 10);

  return hours * 3600 + minutes * 60 + seconds;
}

/**
 * Formats seconds into human-readable duration
 */
export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

/**
 * Checks if video duration is within subscription limits
 */
export function checkDurationLimit(durationSeconds: number, subscriptionTier: string): { 
  allowed: boolean; 
  limit?: number; 
  message?: string;
} {
  const limits = SUBSCRIPTION_LIMITS[subscriptionTier];
  
  if (!limits) {
    return { allowed: false, message: 'Invalid subscription tier' };
  }

  if (limits.maxDuration === Infinity) {
    return { allowed: true };
  }

  if (durationSeconds > limits.maxDuration) {
    const limitFormatted = formatDuration(limits.maxDuration);
    const actualFormatted = formatDuration(durationSeconds);
    
    return {
      allowed: false,
      limit: limits.maxDuration,
      message: `Video duration (${actualFormatted}) exceeds your plan limit of ${limitFormatted}. Please upgrade to process longer videos.`
    };
  }

  return { allowed: true, limit: limits.maxDuration };
}

/**
 * Fetches video metadata using YouTube Data API v3
 * Falls back to oEmbed API if YouTube API key is not available
 */
export async function fetchVideoMetadata(videoId: string): Promise<YouTubeVideoInfo | null> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  
  // Try YouTube Data API first
  if (apiKey) {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet,contentDetails,statistics`
      );

      if (response.ok) {
        const data = await response.json();
        
        if (data.items && data.items.length > 0) {
          const video = data.items[0];
          const snippet = video.snippet;
          const contentDetails = video.contentDetails;
          const statistics = video.statistics;

          return {
            id: videoId,
            title: snippet.title,
            duration: parseDuration(contentDetails.duration),
            thumbnail: snippet.thumbnails?.high?.url || getYouTubeThumbnail(videoId),
            channel: snippet.channelTitle,
            description: snippet.description,
            uploadDate: snippet.publishedAt,
            viewCount: statistics?.viewCount ? parseInt(statistics.viewCount, 10) : undefined,
          };
        }
      }
    } catch (error) {
      console.warn('YouTube API failed, falling back to oEmbed:', error);
    }
  }

  // Fallback to oEmbed API (no API key required)
  try {
    const oEmbedResponse = await fetch(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
    );

    if (oEmbedResponse.ok) {
      const oEmbedData = await oEmbedResponse.json();
      
      return {
        id: videoId,
        title: oEmbedData.title || 'Unknown Title',
        duration: 0, // oEmbed doesn't provide duration
        thumbnail: oEmbedData.thumbnail_url || getYouTubeThumbnail(videoId),
        channel: oEmbedData.author_name || 'Unknown Channel',
        description: '',
        uploadDate: new Date().toISOString(),
      };
    }
  } catch (error) {
    console.error('oEmbed API also failed:', error);
  }

  // Final fallback with basic info
  return {
    id: videoId,
    title: 'Unable to fetch title',
    duration: 0,
    thumbnail: getYouTubeThumbnail(videoId),
    channel: 'Unable to fetch channel',
    description: '',
    uploadDate: new Date().toISOString(),
  };
}

/**
 * Validates video against subscription limits and policies
 */
export async function validateVideoForTranscription(
  url: string, 
  subscriptionTier: string,
  currentMonthUsage: number = 0
): Promise<{
  valid: boolean;
  videoInfo?: YouTubeVideoInfo;
  error?: string;
}> {
  // Validate URL format
  const urlValidation = validateYouTubeUrl(url);
  if (!urlValidation.isValid) {
    return { valid: false, error: urlValidation.error };
  }

  // Check monthly usage limits
  const limits = SUBSCRIPTION_LIMITS[subscriptionTier];
  if (limits.maxVideosPerMonth !== Infinity && currentMonthUsage >= limits.maxVideosPerMonth) {
    return {
      valid: false,
      error: `Monthly video limit (${limits.maxVideosPerMonth}) exceeded. Please upgrade your plan or wait for next month.`
    };
  }

  // Fetch video metadata
  const videoInfo = await fetchVideoMetadata(urlValidation.videoId!);
  if (!videoInfo) {
    return { valid: false, error: 'Could not fetch video information. Please check if the video exists and is publicly available.' };
  }

  // Check duration limits
  const durationCheck = checkDurationLimit(videoInfo.duration, subscriptionTier);
  if (!durationCheck.allowed) {
    return { valid: false, error: durationCheck.message };
  }

  return { valid: true, videoInfo };
}

/**
 * Generates a safe filename from video title
 */
export function generateSafeFilename(title: string, videoId: string): string {
  // Remove invalid characters and limit length
  const safeTitle = title
    .replace(/[^a-zA-Z0-9\s\-_]/g, '')
    .replace(/\s+/g, '_')
    .substring(0, 50);
  
  return `${safeTitle}_${videoId}`;
}
