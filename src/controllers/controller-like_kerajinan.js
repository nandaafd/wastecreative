const db = require('../configs/database_config');

module.exports ={
    // Ambil data semua like_kerajinan
    getdatalike_kerajinan(req,res){
            db.query(
                `
                SELECT * FROM like_kerajinan;
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
    // Ambil data like_kerajinan berdasarkan ID
    getdatalike_kerajinanbyid(req,res){
        let id = req.params.id;
            db.query(
                `
                SELECT * FROM like_kerajinan WHERE id = ?;
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
    // Simpan data like_kerajinan
    adddatalike_kerajinan(req,res){
        let data = {
            pengguna_id : req.body.pengguna_id,
            kerajinan_id : req.body.kerajinan_id
        }
            db.query(
                `
                INSERT INTO like_kerajinan SET ?;
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
    // Delete data like_kerajinan
    deletedatalike_kerajinan(req,res){
        let pengguna_id = req.params.pengguna_id;
        let kerajinan_id = req.params.kerajinan_id;
        db.query(
            `
            DELETE FROM like_kerajinan WHERE pengguna_id =? and kerajinan_id = ? ;
            `
        , [pengguna_id,kerajinan_id],
        function (error, results) {
            if(error) throw error;  
            res.send({ 
                success: true, 
                message: 'Berhasil hapus data!'
            });
        });

}
}