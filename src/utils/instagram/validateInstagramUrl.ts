interface InstagramUrlData {
  isValid: boolean;
  type?: 'reel' | 'reels' | 'p' | 'tv' | 'stories';
  code?: string;
  params?: Record<string, string>;
  fullUrl?: string;
}

export function extractInstagramUrls(message: string): InstagramUrlData[] {
  // Regex que busca URL de Instagram en cualquier parte del texto
  const instagramRegex = /https?:\/\/(www\.)?instagram\.com\/(reel|reels|p|tv|stories)\/([A-Za-z0-9_-]+)\/?(\?\S*)?/g;

  const matches = message.matchAll(instagramRegex);
  const results: InstagramUrlData[] = [];

  for (const match of matches) {
    const [fullUrl, , type, code, queryString] = match;

    // Extraer parámetros si existen
    const params: Record<string, string> = {};
    if (queryString) {
      const urlParams = new URLSearchParams(queryString);
      urlParams.forEach((value, key) => {
        params[key] = value;
      });
    }

    results.push({
      isValid: true,
      type: type as 'reel' | 'reels' | 'p' | 'tv' | 'stories',
      code,
      fullUrl,
      params: Object.keys(params).length > 0 ? params : undefined
    });
  }

  return results;
}

// Función auxiliar para obtener solo la primera URL
export function getFirstInstagramUrl(message: string): InstagramUrlData | null {
  const urls = extractInstagramUrls(message);
  return urls.length > 0 ? urls[0] : null;
}

export function hasInstagramUrl(message: string): boolean {
  const instagramRegex = /https?:\/\/(www\.)?instagram\.com\/(reel|reels|p|tv|stories)\/([A-Za-z0-9_-]+)/;
  return instagramRegex.test(message);
}
