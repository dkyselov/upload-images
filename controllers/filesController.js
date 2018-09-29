exports.uploadFiles = (req, res) => {
    console.log('sampleFile', req.files.sampleFile);
    if (!req.files.sampleFile) {
        res.status(400).send({status: false, response: 'No files were uploaded'});
        return;
    }
    const sampleFile = req.files.sampleFile;
    /* Check File Size (MB) */
    const fileSize = (sampleFile.data.length / 1024) / 1024;
    console.log('Size', fileSize);
    if (fileSize < 1) {
        /* Check File Type (Upload all img formats) */
        if (sampleFile.mimetype.indexOf('image/') !== -1) {
            const path = `./public/images/${sampleFile.name}`;
            sampleFile.mv(path, function (err) {
                if (err) {
                    res.status(400).send({status: false, response: 'Connection error'});
                    return;
                }
                res.send({status: true, response: 'UPLOAD FILES DONE'});
            });
        } else {
            res.status(400).send({status: false, response: 'Only images are available for upload'})
        }
    } else {
        res.status(403).send({status: false, response: 'Max file size 1MB'})
    }
};