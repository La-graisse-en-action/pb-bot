interface MediaLink {
  quality: string;
  link: string;
  thumb?: string;
}

interface VideoResult {
  videoUrl: string | null;
  audioUrl: string | null;
  thumbnailUrl: string | null;
  quality: string | null;
}

export function extractVideoFromLinks(links: MediaLink[]): VideoResult {
  if (!links || links.length === 0) {
    return {
      videoUrl: null,
      audioUrl: null,
      thumbnailUrl: null,
      quality: null,
    };
  }

  let videoUrl: string | null = null;
  let audioUrl: string | null = null;
  let thumbnailUrl: string | null = null;
  let quality: string | null = null;

  // Buscar el video (priorizar HD original, luego HD, luego cualquier video)
  const videoQualities = ['video_hd_original', 'video_hd', 'video_sd', 'video'];

  for (const link of links) {
    const qualityLower = link.quality.toLowerCase();

    // Identificar video
    if (qualityLower.includes('video')) {
      // Si aún no tenemos video o encontramos uno de mejor calidad
      if (!videoUrl || videoQualities.some((q) => qualityLower.includes(q))) {
        videoUrl = link.link;
        quality = link.quality;

        // Si tiene thumbnail, guardarlo
        if (link.thumb) {
          thumbnailUrl = link.thumb;
        }
      }
    }

    // Identificar audio
    if (qualityLower.includes('audio')) {
      audioUrl = link.link;
    }
  }

  return {
    videoUrl,
    audioUrl,
    thumbnailUrl,
    quality,
  };
}

// Función más simple si solo quieres la URL del video
export function getVideoUrl(links: MediaLink[]): string | null {
  if (!links || links.length === 0) return null;

  // Buscar primer link que contenga 'video' en quality
  const videoLink = links.find((link) => link.quality.toLowerCase().includes('video'));

  return videoLink?.link || null;
}

// Función para obtener la mejor calidad disponible
export function getBestQualityVideo(links: MediaLink[]): MediaLink | null {
  if (!links || links.length === 0) return null;

  const videoLinks = links.filter((link) => link.quality.toLowerCase().includes('video'));

  if (videoLinks.length === 0) return null;

  // Prioridades de calidad
  const priorities = ['original', 'hd', 'sd'];

  for (const priority of priorities) {
    const found = videoLinks.find((link) => link.quality.toLowerCase().includes(priority));
    if (found) return found;
  }

  // Si no hay ninguna con prioridad, devolver el primero
  return videoLinks[0] ?? null;
}
