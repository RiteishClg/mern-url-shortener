import { Route, Routes } from "react-router-dom"
import { Navbar } from "./component/Navbar"
import { Footer } from "./component/Footer"
import { Home } from "./pages/Home"
import { CreatePage } from "./pages/CreatePage"
import { Toaster } from "react-hot-toast"
import { UrlDetailPage } from "./pages/UrlDetailPage"
import { PasswordPage } from "./pages/PasswordPage"
import { EditPage } from "./pages/EditPage"

export const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-base-200">
      <Navbar/>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/create" element={<CreatePage/>}/>
        <Route path="/url/:id" element={<UrlDetailPage/>}/>
        <Route path="/protected/:shortCode" element={<PasswordPage/>}/>
        <Route path="/edit/:id" element={<EditPage/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}