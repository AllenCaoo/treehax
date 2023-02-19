import OHSchema from "../models/oh.js";
import GPTapi from "../chatgpt.js";
import { response } from "express";

// Behavior for get requests
export const getPosts = async (req, res) => {
    try {
        const postMessages = await OHSchema.find();
        // console.log("hellloooooo", postMessages);  // postMessages = all mongodb stuff
        res.status(200).json(OHSchema);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// Behavior for post requests
export const createPost = async (req, res) => {
    const post = req.body;

    const newPost = new OHSchema(post);

    // console.log(req.get("Authorization"))

    try {
        await newPost.save();
        console.log("Asking Question: ", req.body);
        
        // GPT response
        console.log("Waiting for response...");
        // console.log(GPTapi);
        var GPTres = await GPTapi.createCompletion({
            model: "text-davinci-003",
            prompt: req.body["userinput"],
            temperature: 0,
            max_tokens: 100,
        });
        console.log(GPTres.data.choices[0]["text"]);
        res.status(201).json(newPost);  // successful post creation

    } catch (error) {
        console.log(error.message);
        res.status(409).json({ message: error.message })
    }

    // res.send('Post Creation'); 
}
