const db = require('../configs/database_config');
const crypto = require('randomstring');

module.exports ={
    // Ambil data semua kerajinan
    getdatakerajinan(req,res){
            db.query(
                `
                SELECT * FROM kerajinan;
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
    // Ambil data kerajinan berdasarkan ID
    getdatakerajinanbyid(req,res){
        let id = req.params.id;
            db.query(
                `
                SELECT * FROM kerajinan WHERE id = ?;
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
    // Simpan data kerajinan
    adddatakerajinan(req,res){
        var uid = crypto.generate({length: 50}) + new Date().toISOString().replace(/T/, '').replace(/\..+/, '').replace(/-/, '').replace(/-/, '').replace(/:/, '').replace(/:/, '');

        let data = {
            id : req.body.id,
            nama : req.body.nama,
            foto : req.file.path,
            bahan : req.body.bahan,
            alat : req.body.alat,
            langkah : req.body.langkah,
            video : req.body.video,
            pengguna_id : req.body.pengguna_id
        }
            db.query(
                `
                INSERT INTO kerajinan SET ?;
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
    // Update data kerajinan
    editdatakerajinan(req,res){
        let id = req.params.id
        let namfoto

        if (!req.file) {
            db.query(
                `
                SELECT * FROM kerajinan WHERE id = ?;
                `
            , [id],
            function (error, results) {
                if(error) throw error;  
                results.forEach((data) => {
                    namfoto = `${data.foto_kerajinan}`;
                });
                let data = {
                    id : req.body.id,
                    nama : req.body.nama,
                    foto : namfoto,
                    bahan : req.body.bahan,
                    alat : req.body.alat,
                    langkah : req.body.langkah,
                    video : req.body.video,
                    pengguna_id : req.body.pengguna_id
                }
                db.query(
                    `
                    UPDATE kerajinan SET ? WHERE id = ?;
                    `
                , [dataEdit, id],
                function (error, results) {
                    if(error) throw error;  
                    res.send({ 
                        success: true, 
                        message: 'Berhasil edit data!',
                    });
                });
            });

        }else{

            let data = {
                id : req.body.id,
                nama : req.body.nama,
                foto : namfoto,
                bahan : req.body.bahan,
                alat : req.body.alat,
                langkah : req.body.langkah,
                video : req.body.video,
                pengguna_id : req.body.pengguna_id
            }
            db.query(
                `
                UPDATE kerajinan SET ? WHERE id = ?;
                `
            , [dataEdit, id],
            function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil edit data!',
                });
            });
        }
    },
    // Delete data kerajinan
    deletedatakerajinan(req,res){
        let id = req.params.id
        db.query(
                `
                DELETE FROM kerajinan WHERE id = ?;
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