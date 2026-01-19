
/*
  ========================================================================================
  📸 API: Cloudinary Gallery Fetcher
  ========================================================================================
  
  [Description]
  ดึงรูปภาพจาก Cloudinary โดยใช้ Search API เพื่อให้ได้รายการรูปแบบ Real-time
  
  [Cloudinary Folder Structure]
  - Pre-wedding Gallery: 'Wedding_OukBew/Ourmoment' (Default)
  - Venue/Location:      'Wedding_OukBew/Location'
  - Backgrounds:         'Wedding_OukBew/BG'
  - Guestbook Uploads:   'Wedding_OukBew/Guestbook'
  
  [Important Config]
  - cloud_name: 'damfrrvrb'
  - api_key/secret: Hardcoded (ควรย้ายไป ENV ใน Production จริง แต่ตอนนี้ใช้แบบนี้เพื่อความเร็วในการ Setup)
*/

import { v2 as cloudinary } from 'cloudinary';

// Configuration
cloudinary.config({
  cloud_name: 'damfrrvrb',
  api_key: '248229569429546',
  api_secret: '5N-9L2dgTK9eUSgklrwVvxT29gA'
});

export default async function handler(req, res) {
  // CORS Handling
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
    // 📂 รับชื่อ Folder จาก Query Param (Default: Ourmoment)
    const targetFolder = req.query.folder || 'Wedding_OukBew/Ourmoment';

    // Search API execution
    const result = await cloudinary.search
      .expression(`folder:${targetFolder}`)
      .sort_by('public_id', 'desc')
      .max_results(100)
      .execute();

    // Map ข้อมูลส่งกลับ Frontend
    const images = result.resources.map(file => ({
      // thumb: รูปเล็กสำหรับ Grid (width: 600px)
      thumb: cloudinary.url(file.public_id, { width: 600, quality: 'auto', fetch_format: 'auto', crop: 'scale' }),
      // full: รูปใหญ่สำหรับ Lightbox (width: 1920px)
      full: cloudinary.url(file.public_id, { width: 1920, quality: 'auto', fetch_format: 'auto', crop: 'scale' })
    }));

    res.status(200).json({ success: true, data: images });
  } catch (error) {
    console.error('Cloudinary Gallery Error:', error);
    res.status(500).json({ success: false, error: error.message, data: [] });
  }
}
