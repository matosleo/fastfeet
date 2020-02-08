import * as Yup from 'yup';
import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.string(),
      complement: Yup.string(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      cep: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails' });
    }

    const { name } = req.body;

    const recipientExists = await Recipient.findOne({ where: { name } });
    if (recipientExists) {
      return res.status(401).json({ error: 'User already exists' });
    }

    await Recipient.create(req.body);

    return res.json({
      name,
      message: 'Recipient created successfully',
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      street: Yup.string(),
      number: Yup.string(),
      complement: Yup.string(),
      state: Yup.string(),
      city: Yup.string(),
      cep: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails' });
    }

    const recipient = await Recipient.findByPk(req.params.id);

    if (!recipient) {
      return res.status(401).json({ error: 'Recipient not found' });
    }

    const { id, name } = await recipient.update(req.body);

    return res.json({
      id,
      name,
      message: 'Recipient updated successfully',
    });
  }
}

export default new RecipientController();
