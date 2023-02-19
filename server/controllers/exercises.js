import exerciseSchema from "../models/exercises.js";
import {openai, SETUP, EXERCISE_GENERATION_TEXT, parseQuestion} from "../chatgpt.js";


// Behavior for get requests
export const getPosts = async (req, res) => {
    const post = req.body;
    
    // const newPost = new exerciseSchema(post);  // TODO: mongodb schema record

    // console.log(req.get("Authorization"))

    try {
        // await newPost.save();  // TODO: save to mongodb
        // console.log(GPTapi);

        var GPTres = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: SETUP + "\n" + EXERCISE_GENERATION_TEXT,
            temperature: 0,
            max_tokens: 100,
        });
        var fullText = GPTres.data.choices[0]["text"]
        var question = fullText.slice(fullText.indexOf("Question"), fullText.indexOf("Solution"));
        // console.log(chattext);
        res.status(201).json(
            {
                "fulltext": fullText,
                "question": question,
            }
        );  // successful post creation
    } catch (error) {
        console.log(error.message);
        res.status(409).json({ message: error.message })
    }

    // res.send('Post Creation'); 
}

// Behavior for post requests
export const createPost = async (req, res) => {
    const post = req.body;
    
    // const newPost = new exerciseSchema(post);

    // console.log(req.get("Authorization"))
    console.log(post);

    try {
        // await newPost.save();
        // GPT response
        var answer = req.body["answer"];
        var question = req.body["question"];

        var askprompt = req.body["question"] + "\n" + "I think the answer is '" + req.body["answer"] + "'. \
        Is this correct? If it is correct, just answer 'true'. If the answer is incorrect, just answer 'false'."

        console.log(askprompt)

        var GPTres;
        var chattext;
        var textLower;
        var correct;
        while (1) {
            GPTres = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: askprompt,
                temperature: 0,
                max_tokens: 100,
            });
            chattext = GPTres.data.choices[0]["text"];
            textLower = chattext.toLowerCase();
            if (textLower.includes("true")) {
                correct = true;
                break;
            }
            if (textLower.includes("false")) {
                correct = false;
                break;
            }
            console.log(textLower);
        }
        console.log(correct);
        res.status(201).json(
            {
                "correct": correct
            }
        );  // successful post creation
    } catch (error) {
        console.log(error.message);
        res.status(409).json({ message: error.message })
    }

    // res.send('Post Creation'); 
}
