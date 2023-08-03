import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: false,
        required: true,
        trim: true     //Esto limpia los espacios que el usuario deje al inicio y al final. 
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    roles: [
        {
            ref: "Role",
            type: mongoose.Schema.Types.ObjectId,
        }  
    ]
}, {
    timestamps: true,
    versionKey: false
});

userSchema.methods.encryptPassword = async password => { 
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

userSchema.methods.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword)
}



export default mongoose.model("User", userSchema);