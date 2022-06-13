const db = require('../configs/database_config');
const crypto = require('randomstring');

module.exports ={
    // Ambil data semua kerajinan
    getdatakerajinan(req,res){
        var page = req.query.page || 1;
        var numPerPage = req.query.limit || 15;
        var skip = (page-1) * numPerPage; 
        var limit = skip + ',' + numPerPage;
        db.query('SELECT count(*) as numRows FROM kerajinan',function (err, rows, fields) {
            if(err) throw err;
            db.query(
                `
                SELECT pengguna.id AS userId, pengguna.username AS userName, pengguna.foto AS userPhoto, kerajinan.id, kerajinan.nama, kerajinan.foto FROM kerajinan INNER JOIN pengguna ON kerajinan.pengguna_id=pengguna.id
                ORDER BY kerajinan.id DESC
                LIMIT ` + limit,function (error, results, fields) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil ambil data!',
                    data: results 
                });
            });
        });

    },
    recommendkerajinan(req,res){
        var arrData = [];
        let dataBhn={
            query : req.body.bahan,
        };
        if (Array.isArray(dataBhn.query)) {
            dataBhn.query.forEach( (i) => arrData.push(i)) 
        }else{
            arrData.push( dataBhn.query )
        }
        console.log(arrData[0]);
        db.query(
            `
            SELECT
                *
            FROM
                kerajinan
            WHERE
                id IN (
                    SELECT id_ker FROM bahan WHERE bahan IN (?)
                );
            `
            , [arrData],
            function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Search success!',
                    data: results,
                });
            }
        );
           
    },
    searchkerajinan(req,res){
        let data={
            query : req.query.s,
        };
        db.query(
            `
            SELECT
                *
            FROM
                kerajinan
            WHERE
                nama LIKE '%`+data.query+`';
            `
            ,
            function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Search success!',
                    data: results,
                });
            }
        );
           
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
                db.query(
                `
                SELECT bahan FROM bahan WHERE id_ker = ?;
                `
                , [results[0].id],
                function (error, bahan) {
                    if(error) throw error; 
                    db.query(
                    `
                    SELECT * FROM pengguna WHERE id = ?;
                    `
                    , [results[0].pengguna_id],
                        function (error, datas) {
                            if(error) throw error; 
                            results[0].userName = datas[0].username||""
                            results[0].userPhoto = datas[0].foto||""
                            var arrData = []
                            bahan.forEach(element => {
                                arrData.push(element.bahan);
                            })
                            results[0].bahan = arrData
                            res.send({ 
                                success: true, 
                                message: 'Berhasil ambil data!',
                                data: results[0]
                            });
                        });
                });
            });
    },
    // Simpan data kerajinan
    adddatakerajinan(req,res){
        var uid = crypto.generate({length: 50}) + new Date().toISOString().replace(/T/, '').replace(/\..+/, '').replace(/-/, '').replace(/-/, '').replace(/:/, '').replace(/:/, '');

        let data = {
            id : req.body.id,
            nama : req.body.nama,
            foto : req.file.filename,
            // bahan : JSON.stringify(req.body.bahan),
            alat : JSON.stringify(req.body.alat),
            langkah : JSON.stringify(req.body.langkah),
            video : req.body.video,
            pengguna_id : req.body.pengguna_id
        }
        db.query(`
            INSERT INTO kerajinan SET ?;`
            , [data],
            function (err, result, fields) {
                if(err) throw err;
                let insertID = result.insertId
                var arrData = []
                let dataBahan={
                    bahan : req.body.bahan,
                }
                dataBahan.bahan.forEach(element => {
                    arrData.push([element, insertID]);
                })
                db.query(
                    `
                    INSERT INTO bahan (bahan, id_ker) VALUES ?;
                    `
                    , [arrData],
                    function (error, results) {
                        if(error) throw error;  
                        res.send({ 
                            success: true, 
                            message: 'Berhasil tambah data!',
                        });
                    });
            }
        );
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