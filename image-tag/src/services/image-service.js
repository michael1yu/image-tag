// required libs
const { Pool } = require('pg');
const axios = require('axios');

// instantiate pool
// pool will use env vars defined in image-tag.env to connect to the db
const pool = new Pool();
try {
	/**
	 * Create the imagemap table if it hasn't been made yet
	 * Create unique index on tag if it hasn't been made yet
	 *      this is important so that we can do ON CONFLICT later
	 */
	pool.query(`
        CREATE TABLE IF NOT EXISTS imagemap(tag text, link text)
        ;
        CREATE UNIQUE INDEX IF NOT EXISTS uidx_tag ON imagemap (tag)
        ;
        `);
} catch (e) {
	console.log(e);
}

const setTag = async (tag, type, name) => {
	if (type === 'file') name = 'http://localhost:8000/' + name;
	try {
		// UPSERT command to update/insert tag and link
		await pool.query(`
            INSERT INTO imagemap (tag, link)
            VALUES ('${tag}', '${name}')
            ON CONFLICT (tag) DO UPDATE
            SET link = excluded.link
            ;
        `);
	} catch (e) {
		console.log(e);
	}
};

const getTag = async (tag) => {
	try {
		// Query link associated with tag
		let response = await pool.query(`
            SELECT link
            FROM imagemap
            WHERE tag='${tag}';
        `);
		if (response.rowCount == 0) {
			return null;
		}
		let link = response.rows[0].link;
		return link;
	} catch (e) {
		console.log(e);
	}
};

module.exports = { setTag, getTag };
