export interface Doctor {
  _id: string;
  name: string;
  image?: string;
  department: string | { name: string };
  fees: number;
  schedule: {
    startTime: string;
    endTime: string;
    slotDuration: number;
  };
}

export interface DoctorDetailsProps {
  id: string;
}