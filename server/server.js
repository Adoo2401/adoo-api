import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import {Configuration,OpenAIApi} from 'openai'

dotenv.config();

const configuration=new Configuration({
    apiKey:process.env.OPENAI_API_KEY
});

const PORT=process.env.PORT ||5000;

const openai=new OpenAIApi(configuration);

const app=express();
app.use(express.json());
app.use(cors());


app.post("/",async(req,resp)=>{
    try {
        
        const promt=req.body.prompt;
        const response=await openai.createCompletion({
            model: "text-davinci-003",
            prompt:`${promt}`,
            temperature: 0,
            max_tokens: 3000,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
            stop: ["\"\"\""],
        })

        resp.status(200).send({
            success:true,
            bot:response.data.choices[0].text
        })

    } catch (error) {
        resp.status(500).json({success:false,message:'Something Went Wrong',error:error})
    }
})

app.listen(PORT,()=>console.log("Server is working on port 5000"))