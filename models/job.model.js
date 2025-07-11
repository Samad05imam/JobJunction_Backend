import mongoose from "mongoose";

const jobScehma = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    requirements: [{
        type: String
    }],
    salary: {
        type: Number,  // ✅ FIXED from `string` to `Number`
        required: true
    },
    location: {
        type: String,
        required: true
    },
    experienceLevel: {
        type: Number,  // ✅ Must be number
        required: true,
    },
    jobType: {
        type: String,
        required: true
    },
    position: {
        type: Number,
        required: true
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'company',
        required: true
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    applications: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application',
    }]
}, { timestamps: true });

export const Job = mongoose.model("Job", jobScehma);
