const fs = require('fs');
const path = require('path');

// Function to extract image metadata
function extractImageMetadata(imagePath) {
    const imageStat = fs.statSync(imagePath);
    const { size } = imageStat;

    // Extract image filename and extension
    const imageName = path.basename(imagePath);
    const imageExt = path.extname(imagePath);

    return {
        url: imagePath,
        filename: imageName,
        size: size,
        extension: imageExt
        // You can add more metadata fields as needed
    };
}

// Function to create manifest.json file
function createManifest(imagesDir, manifestPath) {
    // Get list of image files in the directory
    const imageFiles = fs.readdirSync(imagesDir);

    // Array to store image metadata objects
    const imageMetadata = [];

    // Iterate over image files and extract metadata
    imageFiles.forEach((file) => {
        const imagePath = path.join(imagesDir, file);
        if (fs.statSync(imagePath).isFile()) {
            const metadata = extractImageMetadata(imagePath);
            imageMetadata.push(metadata);
        }
    });

    // Write metadata array to manifest.json file
    fs.writeFileSync(manifestPath, JSON.stringify(imageMetadata, null, 2));

    console.log(`Manifest created at ${manifestPath}`);
}

// Usage example
const imagesDirectory = 'public/assets/images';
const manifestFilePath = 'manifest.json';
createManifest(imagesDirectory, manifestFilePath);
