const Form = require('../models/Form');
const Response = require('../models/Response');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const createForm = async (req, res) => {
  try {
    let headerImageUrl = '';
    if (req.body.headerImage && req.body.headerImage.startsWith('data:image')) {
      const uploadResult = await cloudinary.uploader.upload(req.body.headerImage);
      headerImageUrl = uploadResult.secure_url;
    } else {
      headerImageUrl = req.body.headerImage || '';
    }

    const questions = await Promise.all(req.body.questions.map(async (q) => {
      let imageUrl = '';
      if (q.imageUrl && q.imageUrl.startsWith('data:image')) {
        const uploadResult = await cloudinary.uploader.upload(q.imageUrl);
        imageUrl = uploadResult.secure_url;
      } else {
        imageUrl = q.imageUrl || '';
      }
      return {
        ...q,
        imageUrl,
      };
    }));

    const newForm = new Form({
      title: req.body.title,
      headerImageUrl,
      questions,
    });

    await newForm.save();
    res.status(201).json(newForm);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getFormById = async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form) return res.status(404).json({ message: 'Form not found' });
    res.json(form);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const saveResponse = async (req, res) => {
  try {
    const { formId, answers } = req.body;
    if (!formId || !answers) return res.status(400).json({ message: 'Invalid data' });

    const newResponse = new Response({ formId, answers });
    await newResponse.save();
    res.status(201).json({ message: 'Response saved' });
  } catch (error) {
  console.error('Error in createForm:', error.stack);
  res.status(500).json({ message: 'Server error' });
}
};

module.exports = {
  createForm,
  getFormById,
  saveResponse,
};
