import { connectDb } from "./Configs/Prisma"
import app, { init } from "./app"




init().then(() => {
    app.listen(process.env.PORT || 5000, () => {
        console.log("ON PORT " + process.env.PORT)
    })
})