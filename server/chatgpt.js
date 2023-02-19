// import { ChatGPTAPI } from 'chatgpt';
import { Configuration, OpenAIApi } from "openai";
import * as dotenv from 'dotenv'

dotenv.config();

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
    organization: "org-1vUzZHZPx23wBhu3EnCMZ1TV"
});

const openai = new OpenAIApi(config);

const WELCOME = 
    "Introduce yourself to the student as Ms. Pocari, an AI-powered teaching assistant that will help them study."

const SETUP = 
    "Here is some background on your identity. Your name is Ms. Pocari. \
    You are a virtual teaching assistant for a 9th grade math class. \
    Your job is to help a class of students attain proficiency in \
    all of California's 9th grade math standards."
    
    // You will generate \
    // problems that test one or more of the California 9th grade math standards. \
    // Each time you are asked to write a problem, randomly generate one or more  \
    // California 9th grade math standards, describe the standards being \
    // tested, write the question, and write the solution in the following format: \n \
    // Standard: \n \
    // Standard Description: \n \
    // Question: \n \
    // Solution:"

const OH_SETUP = "The student will now proceed to have a conversation with you. Proceed to respond like a \
                  9th grade math teacher. Everything after this sentence will be the student talking. "

const EXERCISE_SETUP = ""

const EXERCISE_GENERATION_TEXT = "Generate a math problem that tests one or more of California's 9th grade math standards that has a numeric answer. Do not include the solution.: \n \
    Standard: \n \
    Standard Description: \n \
    Question: \n \
    Solution: \n \
    Do not generate any problem that involve images."

function verifyAnswerText(answer, correctSolution) {
    return "The correct solution is " + correctSolution + "Is the student's answer of " + answer +  " correct?"
}

function parseQuestion(problem) {
    console.log(problem)
    const pattern = /standard: [\w*]\sstandard description: [\w*]\squestion: [\w*]\ssolution: [\w*]/g
    const parts = problem.match(pattern);
    return {
        "standard": parts[0],
        "standard description": parts[1],
        "question": parts[2]
        // "solution": parts[3]
    }
}

export { openai, SETUP, OH_SETUP, EXERCISE_GENERATION_TEXT , EXERCISE_SETUP, parseQuestion};