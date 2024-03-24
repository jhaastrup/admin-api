import mongoose , {Schema} from "mongoose";

interface IChild{
    _id:string
    firstName:string
    lastName:string
    username:string
    password:string
    email:string
    dateOfBirth:Date
    profilePicture?:string
}

// Child Schema
const childSchema = new Schema<IChild>({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    profilePicture: {
        type: String,
        default: null
    }
});

interface IParent{
    firstName:string
    lastName:string
    phoneNumber:string
    email:string
    children:IChild[]
}

// Parent Schema
const parentSchema = new Schema<IParent>({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    children: {
        type: [childSchema],
        default: []
    }
});


const Parent = mongoose.model('Parent', parentSchema);

export default Parent
