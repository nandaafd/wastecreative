const db = require('../configs/database_config');

module.exports ={
    // Ambil data semua like_marketplace
    getdatalike_marketplace(req,res){
            db.query(
                `
                SELECT * FROM like_marketplace;
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
    // Ambil data like_marketplace berdasarkan ID
    getdatalike_marketplacebyid(req,res){
        let id = req.params.id;
            db.query(
                `
                SELECT * FROM like_marketplace WHERE id = ?;
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
    // Simpan data like_marketplace
    adddatalike_marketplace(req,res){
        let data = {
            pengguna_id : req.body.pengguna_id,
            marketplace_id : req.body.marketplace_id
        }
            db.query(
                `
                INSERT INTO like_marketplace SET ?;
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
    // Delete data like_marketplace
    deletedatalike_marketplace(req,res){
        let pengguna_id = req.params.pengguna_id;
        let marketplace_id = req.params.marketplace_id;
        db.query(
            `
            DELETE FROM like_marketplace WHERE pengguna_id =? and marketplace_id = ? ;
            `
        , [pengguna_id,marketplace_id],
        function (error, results) {
            if(error) throw error;  
            res.send({ 
                success: true, 
                message: 'Berhasil hapus data!'
            });
        });

    }
}