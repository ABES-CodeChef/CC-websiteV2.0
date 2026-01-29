import multer from 'multer';
import path from 'path';
import { qrCodeStorage, paymentStorage } from '../config/cloudinary.js';
const imageFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files (JPEG, JPG, PNG) are allowed! PDFs are not accepted.'));
  }
};

const uploadQRCode = multer({
  storage: qrCodeStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, 
  fileFilter: imageFilter
}).single('qrCode');

const uploadPayment = multer({
  storage: paymentStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, 
  fileFilter: imageFilter
}).single('paymentScreenshot');

const handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ 
        message: 'File size too large. Maximum size allowed is 5MB.' 
      });
    }
    return res.status(400).json({ 
      message: `Upload error: ${err.message}` 
    });
  } else if (err) {
    return res.status(400).json({ 
      message: err.message || 'File upload failed' 
    });
  }
  next();
};

export { uploadQRCode, uploadPayment, handleUploadError };