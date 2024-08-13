export interface AudioPlayerOption {
  src: string //audio source
  title?: string //audio title
  autoPlay?: boolean
  coverImage?: string //cover image
  coverRotate?: boolean //cover rotate when playing
  progressBarColor?: string //progress bar color
  indicatorColor?: string //indicator color
  trackList?: { src: string; title?: string }[]; // Added trackList
  
}

export const AudioPlayerOptionDefault: AudioPlayerOption = {
  src: '',
  title: '',
  autoPlay: false,
  coverImage: '',
  coverRotate: true,
  progressBarColor: '#3C91F4',
  indicatorColor: '#3C91F4',
  trackList: [], // Default to empty array
}
