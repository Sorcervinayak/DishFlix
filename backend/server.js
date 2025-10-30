const app = require('./src/app')
const ConnectionDB = require('./src/Database/DB')

require('dotenv').config()

ConnectionDB()

app.listen(3000, () => {
  console.log("✅ Server is running on port 3000")
})
