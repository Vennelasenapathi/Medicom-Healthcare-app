export const hospitals = [
  {
    id: 1,
    name: "Greenfield Hospital",
    type: "Multi-specialty Hospital",
    specialty: "Cardiology, Neurology",
    emergency: true,
    rating: "4.0 (100 reviews)",
    distance: "900m away",
    image: require("../../assets/images/medicom/hospital1.png"),
  },
  {
    id: 2,
    name: "Apex Hospital",
    type: "Specialty Clinic",
    specialty: "Orthopedics, Dermatology",
    emergency: false,
    rating: "4.0 (100 reviews)",
    distance: "800m away",
    image: require("../../assets/images/medicom/hospital2.png"),
  },
  {
    id: 3,
    name: "City Neuro Hospital",
    type: "Multi-specialty Hospital",
    specialty: "Neurology, Neurosurgery",
    emergency: true,
    rating: "4.0 (100 reviews)",
    distance: "1900m away",
    image: require("../../assets/images/medicom/hospital3.png"),
  },
];

export const specialties = [
  ["fitness-outline", "Neurology"],
  ["body-outline", "Spine Care"],
  ["medical-outline", "General Medicine"],
];