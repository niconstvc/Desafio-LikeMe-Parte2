const { Pool } = require("pg");
require("dotenv").config({ path: "./.env" });

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST, 
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    allowExitOnIdle: true,
}); 

const obtenerPosts = async () => {
    const query = "SELECT * FROM posts;";
    const { rows } = await pool.query(query);
    return rows;
};

const agregarPost = async (titulo, url, descripcion) => {
    const id = Math.floor(Math.random() * 9999);
    const consulta = "INSERT INTO posts (id, titulo, img, descripcion, likes) VALUES($1, $2, $3, $4, $5);";
    const values = [id, titulo, url, descripcion, 0];
    const result = await pool.query(consulta, values);
};

const modificarPost = async (id) => {
    const consulta = "UPDATE posts SET likes = COALESCE(likes, 0) + 1 WHERE id = $1";
    const values = [id];
    const result = await pool.query(consulta, values);
};

const eliminarPost = async (id) => {
    const consulta = "DELETE FROM posts WHERE id = $1";
    const values = [id];
    const result = await pool.query(consulta, values);
};

module.exports = { obtenerPosts, agregarPost, modificarPost, eliminarPost };
