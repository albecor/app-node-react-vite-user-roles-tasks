import mongoose from 'mongoose'

////const ROLES = ["root", "admin", "moderator", "user"]

const roleSchema = new mongoose.Schema(
    {
    name: String
}, {
    versionKey: false
})

export default mongoose.model('Role', roleSchema)