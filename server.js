const express = require('express');
const mysql = require('mysql2');
const app = express();

app.use(express.json());

// Koneksi MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'perpustakaan'
});

// GET semua buku
app.get('/buku', (req, res) => {
    db.query("SELECT * FROM buku", (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// GET buku by id (parameterized)
app.get('/buku/:id', (req, res) => {
    db.query("SELECT * FROM buku WHERE id = ?", 
    [req.params.id], (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// POST buku (parameterized)
app.post('/buku', (req, res) => {
    const { judul, penulis, tahun } = req.body;
    db.query("INSERT INTO buku (judul, penulis, tahun) VALUES (?, ?, ?)",
    [judul, penulis, tahun], (err, result) => {
        if (err) throw err;
        res.json({ message: "Buku berhasil ditambahkan" });
    });
});

// PUT buku (parameterized)
app.put('/buku/:id', (req, res) => {
    const { judul, penulis, tahun } = req.body;
    db.query(
        "UPDATE buku SET judul=?, penulis=?, tahun=? WHERE id=?",
        [judul, penulis, tahun, req.params.id],
        (err, result) => {
            if (err) throw err;
            res.json({ message: "Buku berhasil diupdate" });
        }
    );
});

// DELETE buku (parameterized)
app.delete('/buku/:id', (req, res) => {
    db.query("DELETE FROM buku WHERE id=?", 
    [req.params.id], (err, result) => {
        if (err) throw err;
        res.json({ message: "Buku berhasil dihapus" });
    });
});

// Jalankan server
app.listen(3000, () => {
    console.log("Server berjalan di port 3000");
});
