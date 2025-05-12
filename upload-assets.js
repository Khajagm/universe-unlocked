import { put } from '@vercel/blob';
import { readdir, stat } from 'fs/promises';
import { join, relative } from 'path';

// Configuration
const ASSETS_DIR = './public/assets'; // Change this to your assets directory path
const DRY_RUN = true; // Set to true to preview without uploading

async function findAllFiles(dir) {
  const files = [];
  
  async function scan(directory) {
    const entries = await readdir(directory, { withFileTypes: true });
    
    for (const entry of entries) {
      const path = join(directory, entry.name);
      
      if (entry.isDirectory()) {
        await scan(path);
      } else {
        files.push(path);
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
      const relativePath = relative(ASSETS_DIR, file);
      const blobPath = `assets/${relativePath}`;
      
      console.log(`[${index + 1}/${files.length}] Processing: ${relativePath}`);
      
      if (DRY_RUN) {
        console.log(`  Would upload to: ${blobPath}`);
        results.push({ path: relativePath, success: true, url: `[DRY RUN] ${blobPath}` });
      } else {
        try {
          // Upload the file to Vercel Blob
          const blob = await put(blobPath, file, { access: 'public' });
          console.log(`  Uploaded: ${blob.url}`);
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
    }
    
  } catch (error) {
    console.error('Error:', error);
  }
}

uploadAssets();