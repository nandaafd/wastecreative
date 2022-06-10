//const karyawan = require('./controller-karyawan');
const pengguna = require('./controller-pengguna');
const marketplace = require('./controller-marketplace');
const komentar_kerajinan = require('./controller-komentar_kerajinan');
const kerajinan = require('./controller-kerajinan');
const like_kerajinan = require('./controller-like_kerajinan');
const komentar_marketplace = require('./controller-komentar_marketplace');
const like_marketplace = require('./controller-like_marketplace');

module.exports ={
	pengguna,marketplace,komentar_kerajinan,kerajinan,like_kerajinan,komentar_marketplace,like_marketplace
};