
import { API_URL } from '../constants';
import { RsvpPayload, GuestbookPayload, ApiResponse, GuestWishes, GalleryItem } from '../types';

export const submitRsvp = async (data: Omit<RsvpPayload, 'action'>): Promise<ApiResponse<null>> => {
  try {
    const payload: RsvpPayload = { ...data, action: 'rsvp' };
    const response = await fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("RSVP Error:", error);
    return { success: false, error: String(error) }; 
  }
};

export const submitGuestbook = async (data: Omit<GuestbookPayload, 'action'>): Promise<ApiResponse<null>> => {
  try {
    let imageUrl = '';

    // Step 1: Upload Image to Cloudinary (if exists) via our Vercel Backend
    if (data.image) {
       try {
          const uploadRes = await fetch('/api/upload', {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({ image: data.image })
          });
          
          if (uploadRes.ok) {
            const uploadResult = await uploadRes.json();
            if (uploadResult.success) {
               imageUrl = uploadResult.url;
            } else {
               throw new Error("Image upload failed: " + uploadResult.error);
            }
          } else {
             // In preview mode or if API fails, we can't upload. 
             // Just skip upload or handle gracefully.
             console.warn("Upload API not available in preview.");
          }
       } catch (err) {
          console.error("Cloudinary Upload Error", err);
          return { success: false, error: "Failed to upload image. Please try again." };
       }
    }

    // Step 2: Submit Text Data + Image URL to Google Sheets
    // Note: We send the 'imageUrl' string instead of the base64 'image' data
    const payload = { 
       action: 'guestbook', 
       name: data.name, 
       message: data.message, 
       image: imageUrl // Sending URL string now, not base64
    };

    const response = await fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    const result = await response.json();
    return result;

  } catch (error) {
    console.error("Guestbook Error:", error);
    return { success: false, error: String(error) };
  }
};

export const fetchGallery = async (folderName?: string): Promise<GalleryItem[]> => {
  // Use our new Vercel API endpoint for Cloudinary
  // Accepts optional folderName query param
  try {
    const url = folderName 
      ? `/api/gallery?folder=${encodeURIComponent(folderName)}`
      : '/api/gallery';
      
    const response = await fetch(url);
    if (!response.ok) {
       // If API returns 404 (common in Preview) or 500
       return [];
    }
    const result = await response.json();
    if (result.success) {
      return result.data || [];
    }
    return [];
  } catch (error) {
    console.warn("Gallery API Error (likely preview mode):", error);
    // Return empty array so frontend falls back to Mock Data
    return [];
  }
};

export const fetchWishes = async (): Promise<GuestWishes[]> => {
  try {
    const response = await fetch(`${API_URL}?action=getWishes&t=${Date.now()}`);
    const result = await response.json();
    if (result.success) return result.data || [];
    return [];
  } catch (error) {
    console.warn("API Error:", error);
    return [];
  }
};
