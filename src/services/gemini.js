const { GoogleGenerativeAI } = require('@google/generative-ai');
const config = require('../config/environment');

const genAI = new GoogleGenerativeAI(config.gemini.apiKey);

const analyzeResume = async (text) => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
  const prompt = `
    Analyze the following resume text and extract information in JSON format:
    ${text}
    
    Please format the response as a JSON object with the following structure:
    {
      "name": "full name",
      "email": "email address",
      "education": {
        "degree": "degree name",
        "branch": "specialization",
        "institution": "school/university name",
        "year": "graduation year"
      },
      "experience": {
        "job_title": "most recent job title",
        "company": "company name",
        "start_date": "start date",
        "end_date": "end date"
      },
      "skills": ["skill1", "skill2", "skill3"],
      "summary": "brief professional summary"
    }
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return JSON.parse(response.text());
};

module.exports = { analyzeResume };