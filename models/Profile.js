const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    handle: {
        type: String,
        required: true 
    },
    company: {
        type: String
    },
    website: {
        type: String 
    },
    location: {
        type: String
    },
    Mstatus: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    bio: {
        type: String
    },
    githubusername: {
        type: String 
    },
    experience: [
        {
            title: {
                type: String
            },
            company: {
                type: String
            },
            location: {
                type: String
            },
            from: {
                type: Date,
                required: true
            },
            to: {
                type: Date
            },
            current: {
                type: Boolean,
                default: false
            },
            description: {
                type: String
            }
        }
    ],
    education: [
        {
            school: {
                type: String
            },
            degree: {
                type: String
            },
            fieldofstudy: {
                type: String,
                required: true
            },
            from: {
                type: Date,
                required: true
            },
            to: {
                type: Date
            },
            current: {
                type: Boolean,
                default: false
            },
            description: {
                type: String
            }
        }
    ],
    social: {
        youtube: {
            type: String
        },
        facebook: {
            type: String
        },
        linkedin: {
            type: String
        },
        twitter: {
            type: String
        },
        
    },
    date: {
        type: Date,
        default: Date.now
    }
});
module.exports = Profile = mongoose.model('Profile', ProfileSchema);