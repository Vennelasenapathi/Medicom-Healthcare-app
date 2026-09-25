export type Appointment = {
  id: number;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  type: string;
  status: string;
  image: any;
};

export const initialAppointments: Appointment[] = [
  {
    id: 1,
    doctor: "Dr. Eshan Khan",
    specialty: "Brain & Spine Specialist",
    date: "29 September 2026",
    time: "10:00 AM",
    type: "Video Consultation",
    status: "Confirmed",
    image: require("../../assets/images/medicom/topdoctor1.png"),
  },

  {
    id: 2,
    doctor: "Dr. Siri Sharma",
    specialty: "Pediatric Neurologist",
    date: "28 September 2026",
    time: "01:00 PM",
    type: "Video Consultation",
    status: "Confirmed",
    image: require("../../assets/images/medicom/topdoctor2.png"),
  },

  {
    id: 3,
    doctor: "Dr. Jasmin",
    specialty: "Opthalmologist",
    date: "30 September 2026",
    time: "04:00 PM",
    type: "Video Consultation",
    status: "Confirmed",
    image: require("../../assets/images/medicom/topdoctor5.png"),
  },
];