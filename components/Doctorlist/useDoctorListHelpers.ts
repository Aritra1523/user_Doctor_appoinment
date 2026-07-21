import { useMemo } from "react";
import { Doctor } from "@/typescript/doctor/doctor";

export const useDoctorListHelpers = (doctors: Doctor[], search: string, sortBy: string) => {
  // Generate random user image for each doctor
  const getRandomUserImage = (seed: string) => {
    const seedHash = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const isWoman = seedHash % 2 === 0;
    const imageId = (seedHash % 99) + 1;
    return `https://randomuser.me/api/portraits/${isWoman ? 'women' : 'men'}/${imageId}.jpg`;
  };

  // Generate consistent random data for each doctor
  const getDoctorData = (name: string, index: number) => {
    const seed = name + index;
    const seedHash = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    const rating = (3 + (seedHash % 20) / 10).toFixed(1);
    
    const areaCode = 200 + (seedHash % 900);
    const prefix = 200 + (seedHash % 900);
    const line = 1000 + (seedHash % 9000);
    const phone = `+1 ${areaCode}-${prefix}-${line}`;
    
    const locations = [
      '79 King Street, Aberdeen, AB10 1AU',
      '42 Queen Street, Edinburgh, EH2 3JZ',
      '15 Medical Center, Glasgow, G1 2RZ',
      '8 Harley Street, London, W1G 7QJ',
      '22 Broad Street, Birmingham, B1 2HG',
      '5 Portland Street, Manchester, M1 3LA',
      '12 Park Avenue, Leeds, LS1 2RT',
      '3 Cathedral Road, Cardiff, CF1 9BN'
    ];
    const location = locations[seedHash % locations.length];
    
    return { rating, phone, location };
  };

  const filteredDoctors = useMemo(() => {
    let filtered = doctors.filter((doctor: Doctor) =>
      doctor.name.toLowerCase().includes(search.toLowerCase()) ||
      (typeof doctor.department === "string" 
        ? doctor.department.toLowerCase().includes(search.toLowerCase())
        : doctor.department?.name.toLowerCase().includes(search.toLowerCase()))
    );

    switch (sortBy) {
      case "featured":
        break;
      case "name-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "fees-low":
        filtered.sort((a, b) => a.fees - b.fees);
        break;
      case "fees-high":
        filtered.sort((a, b) => b.fees - a.fees);
        break;
      default:
        break;
    }

    return filtered;
  }, [doctors, search, sortBy]);

  return {
    getRandomUserImage,
    getDoctorData,
    filteredDoctors,
  };
};