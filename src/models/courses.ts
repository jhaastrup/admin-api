import mongoose , {Schema} from "mongoose";
import Admin from "./admin";

interface ICourse{
    name: string;
    video_url: string;
    description: string;
    date_created: Date;
    status: string;
    admin: Schema.Types.ObjectId;
}

const courseSchema: Schema = new Schema<ICourse>({
    name: { 
        type: String, 
        required: true 
    },

    video_url: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    date_created: { 
        type: Date, 
        default: Date.now 
    },
    status: {
        type: String,
        enum: ['active', 'inactive'], // Add enum for status field
        default: 'active', // Set default value for status field
    },
    admin: { 
        type: Schema.Types.ObjectId, 
        ref: 'Admin', 
        required: true 
    },
});

const Course = mongoose.model<ICourse>('Course', courseSchema);

export default Course