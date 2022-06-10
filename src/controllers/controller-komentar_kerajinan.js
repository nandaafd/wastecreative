const db = require('../configs/database_config');
const crypto = require('randomstring');

module.exports ={
    // Ambil data semua komentar_kerajinan
    getDatakomentar_kerajinan(req,res){
        db.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM komentar_kerajinan;
                `
            , function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil ambil data!',
                    data: results 
                });
            });
            connection.release();
        })
    },
    // Ambil data komentar_kerajinan berdasarkan ID
    getDatakomentar_kerajinanByID(req,res){
        let id = req.params.id;
        db.query(
                `
                SELECT * FROM komentar_kerajinan WHERE id = ?;
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
    // Simpan data komentar_kerajinan
    addDatakomentar_kerajinan(req,res){
        let data = {
            id : req.body.id,
            komentar : req.body.komentar,
            tgl : req.body.tgl,
            foto : req.file.path,
            pengguna_id : req.body.pengguna_id,
            kerajinan_id : req.body.kerajinan_id
        }
        db.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                INSERT INTO komentar_kerajinan SET ?;
                `
            , [data],
            function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil tambah data!',
                });
            });
            connection.release();
        })
    },
    // Update data komentar_kerajinan
    editDatakomentar_kerajinan(req,res){
        let dataEdit = {
            komentar : req.body.komentar,
            tgl : req.body.tgl,
            foto : req.file.path,
            pengguna_id : req.body.pengguna_id,
            kerajinan_id : req.body.kerajinan_id
        }
        let id = req.params.id
        db.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                UPDATE komentar_kerajinan SET ? WHERE id = ?;
                `
            , [dataEdit, id],
            function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil edit data!',
                });
            });
            connection.release();
        })
    },
    // Delete data komentar_kerajinan
    deleteDatakomentar_kerajinan(req,res){
        let id = req.params.id
        db.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                DELETE FROM komentar_kerajinan WHERE id = ?;
                `
            , [id],
            function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil hapus data!'
                });
            });
            connection.release();
        })
    }
}