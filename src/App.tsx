import AdminRoutes from "./routes/AdminRoutes"
import UserRoutes from "./routes/UserRoutes"
import WebsiteRoutes from "./routes/WebsiteRoutes"
import { ToastContainer } from 'react-toastify'


function App() {

  return (
    <>
    <ToastContainer/>
      <WebsiteRoutes/>
      <UserRoutes/>
      <AdminRoutes/>
    </>
  )
}

export default App
