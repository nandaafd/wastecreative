const db = require('../configs/database_config');
const crypto = require('randomstring');
const { DEC8_BIN } = require('mysql/lib/protocol/constants/charsets');

module.exports ={
    // Ambil data semua pengguna
    getdatapengguna(req,res){
        
            db.query(
                `
                SELECT * FROM pengguna;
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
    // Ambil data pengguna berdasarkan ID
    getdatapenggunabyid(req,res){
        let id = req.params.id;
        db.query(
                `
                SELECT * FROM pengguna WHERE id = ?;
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

    getdatapenggunabyusername(req,res){
        let username = req.body.username;
        let password = req.body.password;
        db.query(
                `
                SELECT * FROM pengguna WHERE username = ?;
                `
            , [username],
            function (error, results) {
                
                results.forEach((data)=>{

                        if (username==`${data.username}` && password==`${data.password}`) {
                            if(error) throw error;  
                            res.send({ 
                                success: true, 
                                message: 'Berhasil login!',
                                data: results
                            });
                        } else {
                            if(error) throw error;  
                            res.send({ 
                                success: false, 
                                message: 'anda gagal login'
                            });
                        }
                    
                });
                
            });

    },
    // Simpan data pengguna
    adddatapengguna(req,res){
        let data = {
            id : req.body.id,
            email : req.body.email,
            password : req.body.password,
            username : req.body.username,
            tmp_lahir : req.body.tmp_lahir,
            tgl_lahir : req.body.tgl_lahir,
            jk : req.body.jk,
            alamat : req.body.alamat
        }
        db.query(
                `
                INSERT INTO pengguna SET ?;
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
    // Update data pengguna
    editdatapengguna(req,res){
        let dataEdit = {
            email : req.body.email,
            password : req.body.password,
            username : req.body.username,
            tmp_lahir : req.body.tmp_lahir,
            tgl_lahir : req.body.tgl_lahir,
            jk : req.body.jk,
            alamat : req.body.alamat
        }
        let id = req.params.id
        db.query(
                `
                UPDATE pengguna SET ? WHERE id = ?;
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
    // Delete data pengguna
    deletedatapengguna(req,res){
        let id = req.params.id
        db.query(
                `
                DELETE FROM pengguna WHERE id = ?;
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