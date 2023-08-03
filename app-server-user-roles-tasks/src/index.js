import app from "./app.js";
import { connectDB } from "./db.js"

connectDB();

app.listen(app.get('port'), () => {
    console.log('Server on port:', app.get('port'))
})
