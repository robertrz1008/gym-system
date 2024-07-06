import pgSql from "pg"

const connectdb = new pgSql.Pool({
    host: "Localhost",
    user: "postgres",
    port: 5432, 
    password: "1331",
    database: "gymdb",
})

export default connectdb