import { v2 as cloudinary } from 'cloudinary';

// Configuration
cloudinary.config({
  cloud_name: 'damfrrvrb',
  api_key: '248229569429546',
  api_secret: '5N-9L2dgTK9eUSgklrwVvxT29gA'
});

export default async function handler(req, res) {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    // CHANGE: Use Admin API 'resources' instead of 'search'
    // This is more reliable for immediate listings and exact folder matching.
    
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'Wedding_OukBew/Ourmoment', // Folder path (Case Sensitive!)
      max_results: 100, // Fetch up to 100 images
      direction: 'desc', // Show newest uploaded first (optional, or 'asc' for filename)
      sort_by: 'public_id' // Sort by name
    });

    const images = result.resources.map(file => ({
      // Transform: Quality auto, Format auto, Width 600 for thumb
      thumb: cloudinary.url(file.public_id, { width: 600, quality: 'auto', fetch_format: 'auto', crop: 'scale' }),
      // Transform: Quality auto, Format auto, Width 1920 for full
      full: cloudinary.url(file.public_id, { width: 1920, quality: 'auto', fetch_format: 'auto', crop: 'scale' })
    }));

    res.status(200).json({ success: true, data: images });
  } catch (error) {
    console.error('Cloudinary Gallery Error:', error);
    // Return empty array instead of crashing, so frontend shows empty state nicely
    res.status(500).json({ success: false, error: error.message, data: [] });
  }
}