const db = require('../configs/database_config');
const crypto = require('randomstring');

module.exports ={
    // Ambil data semua marketplace
    getdatamarketplace(req,res){
        db.query(
                `
                SELECT * FROM marketplace;
                `
            , function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil ambil data!',
                    data: results 
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
        let data = {
            id : req.body.id,
            judul : req.body.judul,
            deskripsi : req.body.deskripsi,
            harga : req.body.harga,
            foto : req.file.path,
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