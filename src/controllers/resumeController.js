const { extractTextFromPDF } = require('../services/pdfExtractor');
const { analyzeResume } = require('../services/gemini');
const { encrypt } = require('../services/encryption');
const Applicant = require('../models/applicant');

const enrichResume = async (req, res) => {
  try {
    const { url } = req.body;
    console.log("Received URL:", url);

    if (!url || typeof url !== 'string') {
      return res.status(400).json({ error: 'Invalid or missing URL' });
    }

    console.log("Extracting text from PDF...");
    const text = await extractTextFromPDF(url);
    console.log("Extracted text length:", text?.length || 0);
    if (!text || text.trim() === '') {
      return res.status(400).json({ error: 'No readable text found in PDF' });
    }

    console.log("Analyzing resume...");
    const resumeData = await analyzeResume(text);
    console.log("Resume data:", resumeData);
    if (!resumeData || !resumeData.name || (!resumeData.email && !Array.isArray(resumeData.email))) {
      return res.status(500).json({ error: 'Failed to analyze resume data: missing name or email' });
    }

    console.log("Encrypting sensitive data...");
    resumeData.name = encrypt(resumeData.name);

    if (Array.isArray(resumeData.email)) {
      resumeData.email = encrypt(resumeData.email[0]);
    } else {
      resumeData.email = encrypt(resumeData.email);
    }
    console.log("Encrypted data:", { name: resumeData.name, email: resumeData.email });

    console.log("Saving applicant to database...");
    const applicant = new Applicant(resumeData);
    await applicant.save();
    console.log("Applicant saved successfully");

    res.status(200).json(resumeData);
  } catch (error) {
    console.error("Error in enrichResume:", error);
    const safeErrorMessage = String(error.message || 'An unexpected error occurred').replace(/[`\n\r\t]/g, ' ');
    res.status(500).json({ error: safeErrorMessage });
  }
};

module.exports = { enrichResume };