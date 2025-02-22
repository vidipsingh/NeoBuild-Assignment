const { GoogleGenerativeAI } = require('@google/generative-ai');
const config = require('../config/environment');

const genAI = new GoogleGenerativeAI(config.gemini.apiKey);

const analyzeResume = async (text) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = `
      Analyze the following resume text and extract information in JSON format:
      ${text}
      
      Please format the response as a JSON object with the following structure:
      {
        "name": "full name",
        "email": "single email address (use the first email if multiple are found)",
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
      Ensure the response is valid JSON without markdown wrappers.
    `;

    console.log("Sending request to Gemini API...");
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const rawText = response.text();
    console.log("Raw Gemini response:", rawText);

    let jsonText = rawText;
    if (jsonText.startsWith('```json') && jsonText.endsWith('```')) {
      jsonText = jsonText.replace(/^```json\n/, '').replace(/\n```$/, '');
    } else if (jsonText.startsWith('```JSON') && jsonText.endsWith('```')) {
      jsonText = jsonText.replace(/^```JSON\n/, '').replace(/\n```$/, '');
    } else if (jsonText.startsWith('```') && jsonText.endsWith('```')) {
      jsonText = jsonText.replace(/^```\n/, '').replace(/\n```$/, '');
    }

    const parsedData = JSON.parse(jsonText);
    console.log("Parsed Gemini data:", parsedData);

    if (!parsedData.name || !parsedData.email) {
      throw new Error('Invalid Gemini response: missing name or email');
    }

    return parsedData;
  } catch (error) {
    console.error("Error in analyzeResume:", error);
    throw new Error(`Failed to analyze resume: ${error.message}`);
  }
};

module.exports = { analyzeResume };