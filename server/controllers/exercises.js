import exerciseSchema from "../models/exercises.js";


// Behavior for get requests
export const getPosts = async (req, res) => {
    try {
        const postMessages = await exerciseSchema.find();
        console.log("HELLO", postMessages);
        res.status(200).json(exerciseSchema);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// Behavior for post requests
export const createPost = async (req, res) => {
    const post = req.body;

    const newPost = new exerciseSchema(post);

    try {
        await newPost.save();
        res.status(201).json(newPost);  // successful post creation
    } catch (error) {
        res.status(409).json({ message: error.message })
    }

    res.send('Post Creation'); 
}
