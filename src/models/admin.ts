import mongoose, {Schema} from "mongoose";

interface IAdmin{
    fullName:string 
    email:string 
    password:string
    phoneNumber:string 
}


const adminSchema = new Schema <IAdmin>({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    }
});

const Admin = mongoose.model<IAdmin>('Admin', adminSchema);

export default Admin

