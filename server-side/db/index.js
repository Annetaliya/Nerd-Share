
const pgp = require('pg-promise') ()

const db = pgp({
	host: 'localhost',
	port: 5432,
	database: 'book_exchange',
	user: 'postgres',

})

const createTables = async () => {
	try {
		await db.none(`
			CREATE TABLE IF NOT EXISTS users (
			id SERIAL PRIMARY KEY,
			name VARCHAR(100) NOT NULL,
			email VARCHAR(150) UNIQUE NOT NULL,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
			);

			CRAETE TABLE IF NOT EXISTS books (
			id SERIAL PRIMARY KEY,
			title VARCHAR(200) NOT NULL,
			author VARCHAR(150),
			owner_id INTEGER REFERENCES users(id),
			status VARCHAR(50) DEFAULT 'available',
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
			);
			`)
			console.log('Tables created or already exist')

	} catch(error) {
		console.error('Error creating tables:', error)

	}
	
}

module.exports = {
    db, 
    createTables
}