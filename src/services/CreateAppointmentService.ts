import { getCustomRepository } from 'typeorm';
import { startOfHour } from 'date-fns';

import { Appointment } from '../models';
import { AppointmentsRepository } from '../repositories';

interface CreateAppointmentDTO {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({
    date,
    provider,
  }: CreateAppointmentDTO): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    // Format date
    const appointmentDate = startOfHour(date);

    // Check if it is a available apponintment
    const hasAppointmentInSameDate = !!appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (hasAppointmentInSameDate)
      throw Error('This appointment is already booked');

    const appointment = appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
