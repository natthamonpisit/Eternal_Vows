import { v2 as cloudinary } from 'cloudinary';

// Configuration
cloudinary.config({
  cloud_name: 'damfrrvrb',
  api_key: '248229569429546',
  api_secret: '5N-9L2dgTK9eUSgklrwVvxT29gA' // In production, move this to Vercel Environment Variables
});

export default async function handler(req, res) {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    // Fetch images from the specific folder
    const result = await cloudinary.search
      .expression('folder:Wedding_OukBew/Ourmoment')
      .sort_by('public_id', 'asc')
      .max_results(50) // Adjust as needed
      .execute();

    const images = result.resources.map(file => ({
      // Transform: Quality auto, Format auto, Width 600 for thumb
      thumb: cloudinary.url(file.public_id, { width: 600, quality: 'auto', fetch_format: 'auto', crop: 'scale' }),
      // Transform: Quality auto, Format auto, Width 1920 for full
      full: cloudinary.url(file.public_id, { width: 1920, quality: 'auto', fetch_format: 'auto', crop: 'scale' })
    }));

    res.status(200).json({ success: true, data: images });
  } catch (error) {
    console.error('Cloudinary Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}