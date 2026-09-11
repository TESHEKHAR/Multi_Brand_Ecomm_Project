// import multer from 'multer';
// import path from 'path';

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
//         cb(null, `${Date.now()}-${file.originalname}`);
//     },
// });

// const fileFilter = (req, file, cb) => {
//     const fileTypes = /jpeg|jpg|png|git|pdf/;
//     const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
//     const mimetype = fileTypes.test(file.mimetype);

//     if (mimetype && extname) {
//         cb(null, true);
//     } else {
//         cb(new Error('Only images are allowed'));
//     }
// };

// const upload = multer({
//     storage,
//     fileFilter,
//     limits: { fileSize: 15 * 1024 * 1024 },
// });



// export default upload;


import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|git|pdf/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (mimetype && extname) {
        cb(null, true);
    } else {
        cb(new Error('Only images are allowed'));
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 15 * 1024 * 1024 },
});


// ==================================================
// ✅ CSV Upload Middleware
// Existing upload code को touch नहीं किया गया
// ==================================================

const csvFileFilter = (req, file, cb) => {
    const extname =
        path.extname(file.originalname).toLowerCase();

    if (extname === '.csv') {
        cb(null, true);
    } else {
        cb(new Error('Only CSV files are allowed'));
    }
};

export const uploadCSV = multer({
    storage,
    fileFilter: csvFileFilter,
    limits: {
        fileSize: 20 * 1024 * 1024,
    },
});


// ==================================================
// Existing default export
// ==================================================

export default upload;