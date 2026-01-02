import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import WhatsAppButton from '../../components/WhatsAppChat'

interface WebsiteLayoutProps{
  data: {
    footer_description: string,
    footer_logo: string,
    show_whatsapp_icon: boolean,
    whatsapp_no: number
    social_links: any;
    phone: string;
    email: string;
  },
  isLoading: boolean
}

const WebsiteLayout: React.FC<WebsiteLayoutProps> = ({data, isLoading}) => {
  return (
    <>
    {data?.show_whatsapp_icon && <WhatsAppButton data={data}/>}
    
    <Header/>
      <Outlet/>
    <Footer data={data} isLoading={isLoading}/>
    </>
  )
}

export default WebsiteLayout
