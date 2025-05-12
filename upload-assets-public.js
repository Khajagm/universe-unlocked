const { put } = require('@vercel/blob');
const fs = require('fs').promises;
const path = require('path');

// Configuration
const ASSETS_DIR = './public/assets'; // Change this to your assets directory path
const DRY_RUN = false; // Set to true to preview without uploading

async function findAllFiles(dir) {
  const files = [];
  
  async function scan(directory) {
    const entries = await fs.readdir(directory, { withFileTypes: true });
    
    for (const entry of entries) {
      const filePath = path.join(directory, entry.name);
      
      if (entry.isDirectory()) {
        await scan(filePath);
      } else {
        files.push(filePath);
      }
    }
  }
  
  await scan(dir);
  return files;
}

async function uploadAssets() {
  try {
    console.log(`Scanning ${ASSETS_DIR} for files...`);
    const files = await findAllFiles(ASSETS_DIR);
    console.log(`Found ${files.length} files to upload.`);
    
    const results = [];
    
    for (const [index, file] of files.entries()) {
      // Create the blob path that preserves the directory structure
      const relativePath = path.relative(ASSETS_DIR, file);
      const blobPath = `assets/${relativePath}`;
      
      console.log(`[${index + 1}/${files.length}] Processing: ${relativePath}`);
      
      if (DRY_RUN) {
        console.log(`  Would upload to: ${blobPath} (with public access)`);
        results.push({ path: relativePath, success: true, url: `[DRY RUN] ${blobPath}` });
      } else {
        try {
          // Upload the file to Vercel Blob with explicit public access
          const fileContent = await fs.readFile(file);
          const blob = await put(blobPath, fileContent, { 
            access: 'public',  // Explicitly set public access
            contentType: getContentType(file) // Set proper content type
          });
          console.log(`  Uploaded: ${blob.url} (public access)`);
          results.push({ path: relativePath, success: true, url: blob.url });
        } catch (error) {
          console.error(`  Error uploading ${relativePath}:`, error.message);
          results.push({ path: relativePath, success: false, error: error.message });
        }
      }
    }
    
    // Print summary
    const successful = results.filter(r => r.success).length;
    console.log('\nUpload Summary:');
    console.log(`Total files: ${files.length}`);
    console.log(`Successfully uploaded: ${successful}`);
    console.log(`Failed: ${files.length - successful}`);
    
    if (DRY_RUN) {
      console.log('\nThis was a dry run. Set DRY_RUN = false to perform actual uploads.');
    }
    
    // Output URLs for successful uploads
    if (successful > 0 && !DRY_RUN) {
      console.log('\nSuccessfully uploaded files:');
      results.filter(r => r.success).forEach(r => {
        console.log(`${r.path} -> ${r.url}`);
      });
      
      // Save URLs to a file for reference
      const urlsText = results
        .filter(r => r.success)
        .map(r => `${r.path} -> ${r.url}`)
        .join('\n');
      await fs.writeFile('blob-urls.txt', urlsText);
      console.log('\nURLs saved to blob-urls.txt');
    }
    
  } catch (error) {
    console.error('Error:', error);
  }
}

// Helper function to determine content type based on file extension
function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const contentTypes = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.mp4': 'video/mp4',
    '.webm': 'video/webm',
    '.mp3': 'audio/mpeg',
    '.wav': 'audio/wav',
    '.pdf': 'application/pdf',
    '.json': 'application/json',
    '.glb': 'model/gltf-binary',
    '.gltf': 'model/gltf+json',
  };
  
  return contentTypes[ext] || 'application/octet-stream';
}

uploadAssets();