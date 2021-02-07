import { getCustomRepository } from 'typeorm';
import { startOfHour } from 'date-fns';

import { Appointment } from '../models';
import { AppointmentsRepository } from '../repositories';

interface CreateAppointmentDTO {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({
    date,
    provider_id,
  }: CreateAppointmentDTO): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    // Format date TO CHECK if is booked
    const appointmentDate = startOfHour(date);

    // Check if it is a available apponintment
    const hasAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (hasAppointmentInSameDate)
      throw Error('This appointment is already booked');

    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
