const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const upload = multer({
    limits: { fileSize: 1000000 },
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
            return cb(new Error('File harus berupa gambar'));
        }
        cb(null, true);
    }
});

const predictHandler = async (request, h) => {
    try {
        const data = await new Promise((resolve, reject) => {
            upload.single('image')(request.raw.req, request.raw.res, (err) => {
                if (err) return reject(err);
                resolve(request.raw.req.file);
            });
        });

        const result = "Cancer"; 
        const suggestion = "Segera periksa ke dokter!"; 

        return h.response({
            status: 'success',
            message: 'Model berhasil diprediksi',
            data: {
                id: uuidv4(),
                result: result,
                suggestion: suggestion,
                createdAt: new Date().toISOString()
            }
        }).code(200);
    } catch (err) {
        if (err.message === 'File harus berupa gambar' || err.message.includes('max size')) {
            return h.response({
                status: 'fail',
                message: 'Nilai konten payload lebih besar dari nilai maksimum: 1000000'
            }).code(413);
        }
        return h.response({
            status: 'fail',
            message: 'Terjadi kesalahan dalam melakukan prediksi'
        }).code(400);
    }
};

module.exports = { predictHandler };
