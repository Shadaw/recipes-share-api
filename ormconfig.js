process.env.NODE_TLS_REJECT_UNAUTHORIZED='0'

module.exports = {
  "type": "postgres",
  "url": process.env.DATABASE_URL,
  "ssl": process.env.NODE_ENV === 'production',
  "entities": [
    process.env.NODE_ENV === 'production' ? './dist/models/*.js' : "./src/models/*.ts"
  ],
  "migrations": [
    process.env.NODE_ENV === 'production' ? "./dist/database/migrations/*.js" : "./src/database/migrations/*.ts"
  ],
  "cli": {
    "migrationsDir": "./src/database/migrations"
  }
}
