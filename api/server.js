const app = require("./app")
const { syncDatabase } = require("./Model/Sync")
const PORT = 4000

syncDatabase()

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`)
    console.log(`Swagger Docs at http://localhost:${PORT}/api-docs`)
})