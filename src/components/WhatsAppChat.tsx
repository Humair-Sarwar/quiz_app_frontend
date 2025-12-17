
import React from 'react'
import { FaWhatsapp } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

interface WhatsAppButtonProps {
  data: {
    whatsapp_no: number
  }
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({data})=> {
  return (
    <>
        <div className='whatsAppFixedFloatButton'>
            <Link target='_blank' to={`https://api.whatsapp.com/send?phone=92${data.whatsapp_no}&text=I%20want%20to%20trade%20in%20my%20tech%20device%20for%20cash`}>
              <div className="bg-[#f5f7f9] p-[8px 12px] text-[11px] rounded-[5px] mr-[10px]">Need Help? Contact Us</div>
                <div className="rounded-[50%] bg-[#2db742] logoBtnWhatsApp"><FaWhatsapp className="text-[33px]"/></div>
            </Link>
        </div>
    </>
  )
}

export default WhatsAppButton;