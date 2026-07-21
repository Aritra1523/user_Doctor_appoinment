import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';

interface DoctorData {
  rating: string;
  fullStars: number;
  hasHalfStar: boolean;
  experience: number;
  specializations: string[];
  languages: string[];
  availability: string[];
}

export const useDoctorDetails = (id: string) => {
  const router = useRouter();
  const { doctors } = useSelector((state: RootState) => state.doctor);
  const doctor = doctors.find((item: any) => item._id === id);

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const generateDoctorData = (): DoctorData => {
    const rating = (4 + Math.random()).toFixed(1);
    const fullStars = Math.floor(parseFloat(rating));
    const hasHalfStar = parseFloat(rating) - fullStars >= 0.5;
    const experience = 33;
    const specializations = ['Colonoscopy', 'Acute Liver Failure', 'Gastroenterology', 'Endoscopy'];
    const languages = ['English', 'Spanish', 'French', 'Hindi'];
    const availability = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return { rating, fullStars, hasHalfStar, experience, specializations, languages, availability };
  };

  return {
    doctor,
    router,
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
    activeTab,
    setActiveTab,
    generateDoctorData,
  };
};