const express = require("express")
let QuestionRouter = express.Router()
const {HistoryModel} = require("../Model/History.model")
require("dotenv").config()
const OpenAIApi = require("openai");
const Configuration = require("openai")


const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

QuestionRouter.post("/Query", async (req, res) => {
    try {
        const { role, experience } = req.body;
        // console.log(prompt)
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: 'user', content: `Act as an Interviewer, For Job role ${role} developer and who's experience is ${experience} years, ask only two technical interview questions **You Don't Need to give answer**` }],
            max_tokens: 300,
            temperature: 0.7,
        });
        let data = response.choices[0].message.content;
        //console.log(data)

        let stringWithoutNewlines = data.replace(/\n\n/g, "");
        let qnArray = stringWithoutNewlines.split("\n");
        console.log(qnArray);
        //onsole.log(stringWithoutNewlines)
        return res.status(200).json({
            success: true,
            data: qnArray,
        });
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success: false,
            error: error.response
                ? error.response.data
                : "There was an issue on the server",
        });
    }
});


QuestionRouter.post("/Rating", async(req,res)=>{

    //Body should be in this format:
  // {
  //     "userid":"put_userid_here",
  //     "question1":"Put your question 1 here",
  //     "question2":"Put your question 2 here",
  //     "answer1":"Put your answer 1 here",
  //     "answer2":"Put your answer 2 here"
  // }

    const obj = [
        {
          question:  req.body.question1.question,
          answer:req.body.question1.answer,
        },
        {
          question:  req.body.question2.question,
          answer: req.body.question2.answer,
        },
      ];

      let objStr = JSON.stringify(obj);

      const prompt = `read the following array of objects and rate the answer out of 10 according to their questions. 
	
      ${objStr} 
      
      Level of the question is  hard so the response should be also based on that level
  
      Provide the response on this format : [
          score: {the score},
          feedback : {the feedback},
          extra : {extra information},
          error : {error if any}
      ]
  
      `;

      try{

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 300,
            temperature: 0.7,
        });
        const history = { body:response.choices[0].message.content, userID: req.body.userid };
        let resutl = await HistoryModel.insertMany(history)

        res.status(200).send(response.choices)

        

      }catch(error){
        console.log(error)
        return res.status(400).json({
            success: false,
            error: error.response
                ? error.response.data
                : "There was an issue on the server",
        });


      }
})


module.exports = {QuestionRouter}