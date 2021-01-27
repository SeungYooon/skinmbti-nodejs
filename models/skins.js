import mongoose from 'mongoose';

const skinSchema = new mongoose.Schema({
    skin_title: String,
    skin_kinds: String,
    image_url: String,
    description: String
}, {
    versionKey: false
});

export default mongoose.model('skin', skinSchema);