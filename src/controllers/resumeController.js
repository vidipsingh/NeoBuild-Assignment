const { extractTextFromPDF } = require('../services/pdfExtractor');
const { analyzeResume } = require('../services/gemini');
const { encrypt } = require('../services/encryption');
const Applicant = require('../models/applicant');

const enrichResume = async (req, res) => {
  try {
    const { url } = req.body;
    
    const text = await extractTextFromPDF(url);
    if (!text) {
      return res.status(500).json({ error: 'No text found in PDF' });
    }

    const resumeData = await analyzeResume(text);
    
    // Encrypt sensitive data
    resumeData.name = encrypt(resumeData.name);
    resumeData.email = encrypt(resumeData.email);

    const applicant = new Applicant(resumeData);
    await applicant.save();

    res.status(200).json(resumeData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { enrichResume };