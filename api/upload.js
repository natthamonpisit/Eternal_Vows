import { v2 as cloudinary } from 'cloudinary';

// Configuration
cloudinary.config({
  cloud_name: 'damfrrvrb',
  api_key: '248229569429546',
  api_secret: '5N-9L2dgTK9eUSgklrwVvxT29gA'
});

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { image, folder } = req.body;

    if (!image) {
      return res.status(400).json({ error: 'No image provided' });
    }

    // Default to Guestbook if folder is not specified
    const targetFolder = folder || 'Wedding_OukBew/Guestbook';

    // Upload to specified folder
    const uploadResponse = await cloudinary.uploader.upload(image, {
      folder: targetFolder,
      resource_type: 'auto'
    });

    res.status(200).json({ 
      success: true, 
      url: uploadResponse.secure_url 
    });
  } catch (error) {
    console.error('Upload Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}