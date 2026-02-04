
const pgp = require('pg-promise') ()

const db = pgp({
	host: 'localhost',
	port: 5432,
	database: 'book_exchange',
	user: 'annette',

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

			CREATE TABLE IF NOT EXISTS books (
			id SERIAL PRIMARY KEY,
			title VARCHAR(200) NOT NULL,
			author VARCHAR(150),
			owner_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
			);

			CREATE TABLE IF NOT EXISTS book_availability (
			id SERIAL PRIMARY KEY,
			book_id INTEGER UNIQUE REFERENCES books(id) ON DELETE CASCADE,
			status VARCHAR(50) DEFAULT 'available',
			updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
			);
			CREATE TABLE IF NOT EXISTS exchange_request (
			id SERIAL PRIMARY KEY,
			book_id INTEGER REFERENCES books(id) ON DELETE CASCADE,
			requester_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
			request_type VARCHAR(50) NOT NULL,
			message TEXT,
			status VARCHAR(50) DEFAULT 'pending',
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
			);
			CREATE TABLE IF NOT EXISTS exchanges (
			id SERIAL PRIMARY KEY,
			request_id INTEGER UNIQUE REFERENCES exchange_request(id),
			owner_id INTEGER REFERENCES users(id),
			borrower_id INTEGER REFERENCES users(id),
			start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			end_date TIMESTAMP,
			status VARCHAR(50) DEFAULT 'active'
			);
			CREATE TABLE IF NOT EXISTS exchange_messages (
			id SERIAL PRIMARY KEY,
			exchange_id INTEGER REFERENCES exchanges(id) ON DELETE CASCADE,
			sender_id INTEGER REFERENCES users(id),
			message TEXT NOT NULL,
			sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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