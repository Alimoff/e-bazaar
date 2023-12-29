import mongoose from 'mongoose'
import { app } from './app'
import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 4040
export const PASSWORD = process.env.MONGOOSE_PASSWORD

;(async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://Alimov:${PASSWORD}@e-bazaar.uorzc3w.mongodb.net/?retryWrites=true&w=majority`,
    )
    console.log('Connect to mongo db database ✅')
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}  💻`)
    })
  } catch (message) {
    console.log(`error => ${message} ❌`)
  }
})()
