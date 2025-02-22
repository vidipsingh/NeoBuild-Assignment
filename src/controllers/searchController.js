const Applicant = require('../models/applicant');
const { decrypt } = require('../services/encryption');

const searchResumes = async (req, res) => {
  try {
    const { name } = req.body;
    const applicants = await Applicant.find();
    
    // Decrypt names and filter
    const matchingApplicants = applicants.filter(applicant => {
      const decryptedName = decrypt(applicant.name).toLowerCase();
      return decryptedName.includes(name.toLowerCase());
    });

    if (matchingApplicants.length === 0) {
      return res.status(404).json({ error: 'No matching resumes found' });
    }

    res.status(200).json(matchingApplicants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { searchResumes };