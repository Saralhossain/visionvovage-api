const path = require('path'); // Import the path module
const fs = require('fs').promises;

const storedImageDetails = [];

const saveBase64Image = async (base64Data, imagePath) => {
  const buffer = Buffer.from(base64Data, 'base64');
  await fs.writeFile(imagePath, buffer);
};

module.exports = {
  uploadImage: async (req, res) => {
    if (!req.body.image || !req.body.text || !req.body.confidence) {
      return res.status(400).json({ message: 'Data is not provided' });
    }

    const base64Data = req.body.image;
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const filename = `image-${uniqueSuffix}.jpg`;

    const imagePath = path.join(__dirname, '../uploads', filename);

    try {
      // Save the base64 image to the uploads directory
      await saveBase64Image(base64Data, imagePath);

      const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${filename}`;
      const imageDetails = {
        image: imageUrl,
        text: req.body.text || '',
        confidence: parseFloat(req.body.confidence) || 0
      };

      storedImageDetails.push(imageDetails);

      res.json({ message: 'Image uploaded successfully', details: imageDetails });
    } catch (error) {
      console.error('Error uploading image:', error);
      res.status(500).json({ message: 'Error uploading image' });
    }
  }
};
