import multer from 'multer';

const FILE_TYPES: { [key: string]: string } = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg',
} as const;

const fileUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/images');
    },
    filename: (req, file, cb) => {
      const extension = FILE_TYPES[file.mimetype];
      cb(
        null,
        `${`${Date.now()}-${Math.round(Math.random() * 1e9)}`}}.${extension}`,
      );
    },
  }),

  fileFilter: (req, file, cb) => {
    const isValid = !!FILE_TYPES[file.mimetype];
    const error = isValid ? null : new Error('Invalid file type');

    if (error) {
      cb(error);
    } else {
      cb(null, isValid);
    }
  },
});

export default fileUpload;
