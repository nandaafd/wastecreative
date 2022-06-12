const db = require('../configs/database_config');
const crypto = require('randomstring');
const moment = require('moment');

module.exports ={
    // Ambil data semua komentar_marketplace
    getdatakomentar_marketplace(req,res){
            db.query(
                `
                SELECT * FROM komentar_marketplace;
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
    // Ambil data komentar_marketplace berdasarkan ID
    getdatakomentar_marketplacebyid(req,res){
        let id = req.params.id;
            db.query(
                `
                SELECT * FROM komentar_marketplace WHERE marketplace_id = ? ORDER BY tgl DESC;
                `
            , [id],
            function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil ambil data!',
                    comments: results
                });
            });
    },
    // Simpan data komentar_marketplace
    adddatakomentar_marketplace(req,res){
        var uid = crypto.generate({length: 50}) + new Date().toISOString().replace(/T/, '').replace(/\..+/, '').replace(/-/, '').replace(/-/, '').replace(/:/, '').replace(/:/, '');
        let timeStamp = moment().utc().format('YYYY-MM-DD HH:mm:ss')
        let data = {
            id : req.body.id,
            komentar : req.body.komentar,
            tgl : timeStamp,
            marketplace_id : req.body.marketplace_id,
            pengguna_id : req.body.pengguna_id
        }
            db.query(
                `
                INSERT INTO komentar_marketplace SET ?;
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
    // Update data komentar_marketplace
    editdatakomentar_marketplace(req,res){
        let dataEdit = {
            komentar : req.body.komentar,
            tgl : req.body.tgl,
            foto : req.file.path,
            marketplace_id : req.body.marketplace_id,
            pengguna_id : req.body.pengguna_id
        }
        let id = req.params.id
            db.query(
                `
                UPDATE komentar_marketplace SET ? WHERE id = ?;
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
    // Delete data komentar_marketplace
    deletedatakomentar_marketplace(req,res){
        let id = req.params.id
            db.query(
                `
                DELETE FROM komentar_marketplace WHERE id = ?;
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