/**
 * Client-side YouTube utilities
 * Handles metadata fetching from the browser using public APIs
 */

import { YouTubeVideoInfo, validateYouTubeUrl, getYouTubeThumbnail } from './youtube';

/**
 * Fetches video metadata from the client side using our proxy API
 * This avoids CORS issues and works reliably in the browser
 */
export async function fetchVideoMetadataClient(videoId: string): Promise<YouTubeVideoInfo | null> {
  try {
    // Use our proxy API endpoint
    const response = await fetch(`/api/youtube/metadata?videoId=${videoId}`);

    if (response.ok) {
      const data = await response.json();
      return data.videoInfo;
    } else {
      console.warn('Proxy API failed, trying direct oEmbed...');
      
      // Fallback to direct oEmbed (might have CORS issues)
      const oEmbedResponse = await fetch(
        `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
      );

      if (oEmbedResponse.ok) {
        const oEmbedData = await oEmbedResponse.json();
        
        return {
          id: videoId,
          title: oEmbedData.title || 'Unknown Title',
          duration: 0,
          thumbnail: oEmbedData.thumbnail_url || getYouTubeThumbnail(videoId),
          channel: oEmbedData.author_name || 'Unknown Channel',
          description: '',
          uploadDate: new Date().toISOString(),
        };
      }
    }
  } catch (error) {
    console.error('Error fetching video metadata:', error);
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
 * Client-side validation and metadata fetching
 */
export async function validateAndFetchVideo(url: string): Promise<{
  isValid: boolean;
  videoInfo?: YouTubeVideoInfo;
  error?: string;
}> {
  const urlValidation = validateYouTubeUrl(url);
  
  if (!urlValidation.isValid) {
    return { 
      isValid: false, 
      error: urlValidation.error 
    };
  }

  try {
    const videoInfo = await fetchVideoMetadataClient(urlValidation.videoId!);
    
    if (!videoInfo) {
      return {
        isValid: false,
        error: 'Could not fetch video information'
      };
    }

    return {
      isValid: true,
      videoInfo
    };
  } catch {
    return {
      isValid: false,
      error: 'Failed to validate video'
    };
  }
}
