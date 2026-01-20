
export interface GuestWishes {
  name: string;
  message: string;
  timestamp: string;
  imageUrl?: string;
}

export interface GalleryItem {
  thumb: string;
  full: string;
  width?: number;  // Added for masonry layout calculation
  height?: number; // Added for masonry layout calculation
}

// Deprecated: kept for backward compatibility if needed, but GalleryItem is preferred
export interface GalleryImage {
  id: string;
  url: string;
  width?: number;
  height?: number;
}

export interface RsvpPayload {
  action: 'rsvp';
  name: string;
  attendees: number;
  note: string;
  attending: 'yes' | 'no';
}

export interface GuestbookPayload {
  action: 'guestbook';
  name: string;
  message: string;
  image: string | null; // Base64 string
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  debug?: string[]; // Added for detailed backend logging
}