function upload(req, res){
    if(req.file.filename){
        res.status(201).json({
            mesaage: "image upload successfully",
            url: req.file.filename
        });

    }else{
        res.status(500).json({
            mesaage: "something went wrong!"
        }); 
    }
}

module.exports = {
    upload: upload
}