const db = require('../configs/database_config');
const crypto = require('randomstring');
const moment = require('moment');

module.exports ={
    // Ambil data semua marketplace
    getdatamarketplace(req,res){
        var page = req.query.page || 1;
        var numPerPage = req.query.limit || 15;
        var skip = (page-1) * numPerPage; 
        var limit = skip + ',' + numPerPage; // Here we compute the LIMIT parameter for MySQL query
        db.query('SELECT count(*) as numRows FROM marketplace',function (err, rows, fields) {
            if(err) throw err;
            
                var numRows = rows[0].numRows;
                var numPages = Math.ceil(numRows / numPerPage);
                db.query(`
                SELECT marketplace.id, marketplace.judul, marketplace.foto,marketplace.tgl, pengguna.username AS userName, pengguna.foto AS userPhoto, pengguna.id AS pengguna_id FROM marketplace INNER JOIN pengguna ON marketplace.pengguna_id=pengguna.id
                ORDER BY marketplace.tgl DESC
                LIMIT ` + limit,function (err, results, fields) {
                    if(err) throw err;

                    res.send({ 
                        success: true, 
                        message: 'Berhasil ambil data!',
                        data: results 
                    });
                });            
        });
    },
    // Ambil data marketplace berdasarkan ID
    getdatamarketplacebyid(req,res){
        let id = req.params.id;
        db.query(
                `
                SELECT * FROM marketplace WHERE id = ?;
                `
            , [id],
            function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil ambil data!',
                    data: results
                });
            });
    },
    // Simpan data marketplace
    adddatamarketplace(req,res){
        var uid = crypto.generate({length: 50}) + new Date().toISOString().replace(/T/, '').replace(/\..+/, '').replace(/-/, '').replace(/-/, '').replace(/:/, '').replace(/:/, '');
        let timeStamp = moment().utc().format('YYYY-MM-DD HH:mm:ss')
        let data = {
            // id : req.body.id,
            judul : req.body.judul,
            deskripsi : req.body.deskripsi,
            tgl : timeStamp,
            harga : req.body.harga,
            foto : req.file.filename,
            pengguna_id : req.body.pengguna_id
        }
        db.query(
                `
                INSERT INTO marketplace SET ?;
                `
            , [data],
            function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil tambah data!',
                });
            });
    },
    // Update data marketplace
    editdatamarketplace(req,res){
        let dataEdit = {
            id : req.body.id,
            judul : req.body.judul,
            deskripsi : req.body.deskripsi,
            harga : req.body.harga,
            foto : req.file.path,
            pengguna_id : req.body.pengguna_id
        }
        let id = req.params.id
            db.query(
                `
                UPDATE marketplace SET ? WHERE id = ?;
                `
            , [dataEdit, id],
            function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil edit data!',
                });
            });
    },
    // Delete data marketplace
    deletedatamarketplace(req,res){
        let id = req.params.id
            db.query(
                `
                DELETE FROM marketplace WHERE id = ?;
                `
            , [id],
            function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil hapus data!'
                });
            });
    }
}