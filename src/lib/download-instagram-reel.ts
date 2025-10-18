import axios from 'axios';
import { clearInstagramCaption } from '../utils/instagram/clearInstagramCaption.js';
import chalk from 'chalk';
import { getVideoUrl } from '../utils/instagram/extract-video-from-links.js';

const rapidApiUrl = 'https://social-media-video-downloader.p.rapidapi.com/smvd/get/all';

export type ReelData = {
  src: string;
  title: string;
  picture: string;
  thumbnail: string;
};

export async function downloadInstagramReel(URL: string): Promise<ReelData> {
  const response = await axios.request({
    method: 'GET',
    url: rapidApiUrl,
    params: {
      url: URL,
      filename: 'download',
    },
    headers: {
      'X-RapidAPI-Key': '824dddee65msh76dbe040b14bfe4p12ab6ajsnc6532155d4f8',
      'X-RapidAPI-Host': 'social-media-video-downloader.p.rapidapi.com',
    },
  });

  if (response.status !== 200) {
    console.error(chalk.red(`Error downloading Instagram reel: ${response.status} - ${response.statusText}`));
    return {
      src: '',
      title: '',
      picture: '',
      thumbnail: '',
    };
  }

  const data = response.data;
  const videoUrl = getVideoUrl(data.links);

  return {
    src: data.src_url,
    title: clearInstagramCaption(data.title),
    thumbnail: data.picture,
    picture: videoUrl ? videoUrl : data.picture,
  };
}
