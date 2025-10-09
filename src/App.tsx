import AdminRoutes from "./routes/AdminRoutes"
import UserRoutes from "./routes/UserRoutes"
import WebsiteRoutes from "./routes/WebsiteRoutes"



function App() {

  return (
    <>
      <WebsiteRoutes/>
      <UserRoutes/>
      <AdminRoutes/>
    </>
  )
}

export default App
