const multer = require('multer')

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, './client/uploads/images')
    },
    filename(req, file, cb) {
        cb(null, Date.now() + '--' + file.originalname)
    }
})

const types = ['image/png', 'image/jpg', 'image/gif', 'image/jpeg']

const fileFilter = (req, file, cb) => {
    if(types.includes(file.mimetype)) {
        cb(null, true)
    }else{
        cb(null, false)
    }
}

module.exports = multer({storage: storage, fileFilter})