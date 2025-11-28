
import { API_URL } from '../constants';
import { RsvpPayload, GuestbookPayload, ApiResponse, GuestWishes } from '../types';

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
    const payload: GuestbookPayload = { ...data, action: 'guestbook' };
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

export const fetchGallery = async (): Promise<string[]> => {
  const targetUrl = `${API_URL}?action=getGallery&t=${Date.now()}`;
  try {
    const response = await fetch(targetUrl);
    const result: ApiResponse<string[]> = await response.json();
    return result.data || [];
  } catch (error) {
    console.warn("API Error:", error);
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
