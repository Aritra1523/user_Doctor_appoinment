import DoctorList from '@/components/Doctorlist/DoctorList'
import React from 'react'

const doctorList = () => {
  return (
   <div className="min-h-screen bg-[#F4F6F5] ...">   {/* light-grey page background */}
  <main className="max-w-[1100px] mx-auto px-6 py-8">
    <div className="bg-white border border-[#DEE3E0] rounded-3xl p-5 md:p-6">
      <DoctorList />
    </div>
  </main>
</div>
  )
}

export default doctorList