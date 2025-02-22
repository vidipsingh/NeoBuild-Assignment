const axios = require('axios');
const pdf = require('pdf-parse');

const extractTextFromPDF = async (url) => {
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const data = await pdf(response.data);
    return data.text;
  } catch (error) {
    throw new Error('Failed to extract text from PDF');
  }
};

module.exports = { extractTextFromPDF };