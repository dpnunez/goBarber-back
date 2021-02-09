import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import { AppointmentsRepository } from '../repositories';
import { CreateAppointmentService } from '../services';
import { ensureAuthenticated } from '../middlewares';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (req, res) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();

  return res.json(appointments);
});

appointmentsRouter.post('/', async (req, res) => {
  try {
    const { provider_id, date } = req.body;

    // Format data
    const parsedDate = parseISO(date);

    const createAppointmentService = new CreateAppointmentService();
    const apponintment = await createAppointmentService.execute({
      date: parsedDate,
      provider_id,
    });

    return res.json(apponintment);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default appointmentsRouter;
