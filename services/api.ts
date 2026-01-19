
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
             body: JSON.stringify({ 
               image: data.image,
               folder: 'Wedding_OukBew/Guestbook' // Explicitly set folder
             })
          });
          
          if (uploadRes.ok) {
            const uploadResult = await uploadRes.json();
            if (uploadResult.success) {
               imageUrl = uploadResult.url;
            } else {
               throw new Error("Image upload failed: " + uploadResult.error);
            }
          } else {
             console.warn("Upload API not available in preview.");
          }
       } catch (err) {
          console.error("Cloudinary Upload Error", err);
          return { success: false, error: "Failed to upload image. Please try again." };
       }
    }

    // Step 2: Submit Text Data + Image URL to Google Sheets
    const payload = { 
       action: 'guestbook', 
       name: data.name, 
       message: data.message, 
       image: imageUrl 
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

// NEW FUNCTION: Submit Payment Slip
export const submitSlip = async (data: { name: string; image: string }): Promise<ApiResponse<null>> => {
  try {
    let imageUrl = '';

    if (!data.image) {
      return { success: false, error: "Please attach a slip image." };
    }

    // 1. Upload to Cloudinary (Folder: slippayment)
    try {
      const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            image: data.image,
            folder: 'Wedding_OukBew/slippayment' 
          })
      });
      
      if (uploadRes.ok) {
        const uploadResult = await uploadRes.json();
        if (uploadResult.success) {
            imageUrl = uploadResult.url;
        } else {
            throw new Error("Slip upload failed: " + uploadResult.error);
        }
      } else {
        throw new Error("Upload server error.");
      }
    } catch (err) {
      console.error("Slip Upload Error", err);
      return { success: false, error: "Failed to upload slip. Please try again." };
    }

    // 2. Submit to Google Sheets (Action: uploadSlip)
    const payload = {
      action: 'uploadSlip',
      name: data.name,
      image: imageUrl
    };

    const response = await fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    
    const result = await response.json();
    return result;

  } catch (error) {
    console.error("Submit Slip Error:", error);
    return { success: false, error: String(error) };
  }
};

export const fetchGallery = async (folderName?: string): Promise<GalleryItem[]> => {
  try {
    const url = folderName 
      ? `/api/gallery?folder=${encodeURIComponent(folderName)}`
      : '/api/gallery';
      
    const response = await fetch(url);
    if (!response.ok) {
       return [];
    }
    const result = await response.json();
    if (result.success) {
      return result.data || [];
    }
    return [];
  } catch (error) {
    console.warn("Gallery API Error (likely preview mode):", error);
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