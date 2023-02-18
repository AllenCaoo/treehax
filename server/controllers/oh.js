import OHSchema from "../models/oh.js";

// Behavior for get requests
export const getPosts = async (req, res) => {
    try {
        const postMessages = await OHSchema.find();
        console.log(postMessages);
        res.status(200).json(OHSchema);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// Behavior for post requests
export const createPost = async (req, res) => {
    const post = req.body;

    const newPost = new OHSchema(post);

    try {
        await newPost.save();
        res.status(201).json(newPost);  // successful post creation
    } catch (error) {
        res.status(409).json({ message: error.message })
    }

    res.send('Post Creation'); 
}
