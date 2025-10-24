import React, { useState } from 'react'
import { FaUserCog } from "react-icons/fa";
import bg from '../../assets/images/bg.jpg'
import my_pic from '../../assets/images/my-pic.jpg'
import EditProfilePopup from '../../components/EditProfilePopup';
const Profile: React.FC = () => {
    const [showEditProfile, setEditProfile] = useState<boolean>(false);
    const handleClosePopup = ()=>{
        setEditProfile(false);
    }
  return (
    <>
       <div className='w-full'>
        <div className='flex justify-between items-center'>
            <h2 className='text-[20px] font-semibold mb-5 flex items-center gap-4'><FaUserCog /> Profile Info</h2>
              <button className='mini-primary-button' onClick={()=>setEditProfile(true)}>Edit Profile</button>
        </div>
              <div className="flex gap-8 items-start mt-4 lg:flex-row md:flex-row flex-col">
                <div className='bg-white shadow rounded-2xl p-1 text-center w-full lg:w-[600px]'>
                    <div className='w-full h-[100px] relative'>
                        <img src={bg} alt="" className='object-cover h-full w-full rounded-2xl'/>
                       <div className="absolute left-1/2 -translate-x-1/2 bottom-[-50px] h-[100px] w-[100px] rounded-full overflow-hidden border-4 border-white">
  <img
    src={my_pic}
    alt=""
    className="h-full w-full object-cover object-center"
  />
</div>
                    </div>
                    <div className='p-4 mt-10'><h3 className='text-center text-[14px] mb-3'>Humair Sarwar</h3>
                    <button className='mini-primary-button'>Logout</button></div>
                    
                </div>
                <div className='bg-white shadow rounded-2xl p-5 text-center w-full flex flex-col gap-2'>
                    <h2 className='text-[18px] font-semibold mb-1 flex items-center gap-4'>Profile Information</h2>
                    <div className='flex justify-between items-center'>
                        <h3 className='text-[14px] font-semibold'>User Name:</h3>
                        <p className='text-[14px]'>Humair Sarwar</p>
                    </div>
                     <div className='flex justify-between items-center'>
                        <h3 className='text-[14px] font-semibold'>Email:</h3>
                        <p className='text-[14px]'>test@gmail.com</p>
                    </div>
                    <div className='flex justify-between items-center'>
                        <h3 className='text-[14px] font-semibold'>Phone:</h3>
                        <p className='text-[14px]'>03088340373</p>
                    </div>
                    <div className='flex justify-between items-center'>
                        <h3 className='text-[14px] font-semibold'>Country:</h3>
                        <p className='text-[14px]'>USA</p>
                    </div>
                </div>
              </div>
              </div>
              {showEditProfile && <EditProfilePopup handleClosePopup={handleClosePopup}/>}
    </>
  )
}

export default Profile
