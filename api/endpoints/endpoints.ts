const endpoints = {
  register: "/auth/register",
   login: "/auth/login",
   otp:"/auth/verify_otp",
   logout:"user/logout",


   //Dashbord
   dasbord:"/user/dashboard",

   //doctor_list
   doctorList:"/user/doctor/list",

   //doctor_appointment
   bookAppointment:"doctor/appointment",

   userSlotList: "user/slot/list",

   history:"/user/history"

};

export default endpoints;