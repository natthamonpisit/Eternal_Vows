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
    // Revert: Use Search API
    // Note: Search API requires a few minutes for new images to be indexed.
    const result = await cloudinary.search
      .expression('folder:Wedding_OukBew/Ourmoment')
      .sort_by('public_id', 'desc')
      .max_results(100)
      .execute();

    const images = result.resources.map(file => ({
      // Transform: Quality auto, Format auto, Width 600 for thumb
      thumb: cloudinary.url(file.public_id, { width: 600, quality: 'auto', fetch_format: 'auto', crop: 'scale' }),
      // Transform: Quality auto, Format auto, Width 1920 for full
      full: cloudinary.url(file.public_id, { width: 1920, quality: 'auto', fetch_format: 'auto', crop: 'scale' })
    }));

    res.status(200).json({ success: true, data: images });
  } catch (error) {
    console.error('Cloudinary Gallery Error:', error);
    // Return empty array instead of crashing
    res.status(500).json({ success: false, error: error.message, data: [] });
  }
}