
export interface Track {
  id: string;
  title: string;
  artist: string;
  album?: string;
  thumbnail: string;
  musicUrl: string;
  duration: string;
  durationInSeconds: number;
}

export const tracks: Track[] = [
  {
    id: "1",
    title: "Starboy",
    artist: "The Weeknd",
    album: "Starboy",
    thumbnail: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
    musicUrl: "/sample.mp3", // This would be a real music file path
    duration: "4:16",
    durationInSeconds: 256,
  },
  {
    id: "2",
    title: "Demons",
    artist: "Imagine Dragons",
    album: "Night Visions",
    thumbnail: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop",
    musicUrl: "/sample.mp3",
    duration: "5:24",
    durationInSeconds: 324,
  },
  {
    id: "3",
    title: "Mouth of the river",
    artist: "Imagine Dragons",
    album: "Evolve",
    thumbnail: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop",
    musicUrl: "/sample.mp3",
    duration: "6:23",
    durationInSeconds: 383,
  },
  {
    id: "4",
    title: "Ghost Stories",
    artist: "Coldplay",
    album: "Ghost Stories",
    thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
    musicUrl: "/sample.mp3",
    duration: "3:10",
    durationInSeconds: 190,
  },
  {
    id: "5",
    title: "Sparks",
    artist: "Coldplay",
    album: "Ghost Stories",
    thumbnail: "https://images.unsplash.com/photo-1506260408121-e353d10b87c7?w=300&h=300&fit=crop",
    musicUrl: "/sample.mp3",
    duration: "4:23",
    durationInSeconds: 263,
  },
  {
    id: "6",
    title: "Viva La Vida",
    artist: "Coldplay",
    album: "Viva La Vida",
    thumbnail: "https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?w=300&h=300&fit=crop",
    musicUrl: "/sample.mp3",
    duration: "5:32",
    durationInSeconds: 332,
  },
  {
    id: "7",
    title: "Hymn for the weekend",
    artist: "Coldplay",
    album: "A Head Full of Dreams",
    thumbnail: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=300&h=300&fit=crop",
    musicUrl: "/sample.mp3",
    duration: "2:23",
    durationInSeconds: 143,
  },
  {
    id: "8",
    title: "Pain",
    artist: "Ryan Jones",
    album: "Emotional",
    thumbnail: "https://images.unsplash.com/photo-1621419203051-f4e463017f56?w=300&h=300&fit=crop",
    musicUrl: "/sample.mp3",
    duration: "3:12",
    durationInSeconds: 192,
  }
];
