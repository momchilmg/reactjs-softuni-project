import TopBar from './components/bars/TopBar'
import NavBar from './components/bars/NavBar'
import Footer from './components/bars/Footer'
import MainBanner from './components/MainBanner'
import { Routes, Route } from 'react-router'
import Contact from './components/Contact'
import Appointement from './components/Appointement'
import Team from './components/Team'
import About from './components/About'
import Service from './components/Service'
import TeamMemberDetails from './components/members/TeamMemberDetails'

export default function App() {

  return (
    <>
      <TopBar />
      <NavBar />
      <Routes>
        <Route index element={<MainBanner />}/>
        <Route path="/contact" element={<Contact />}/>
        <Route path="/appointment" element={<Appointement />}/>
        <Route path="/team" element={<Team />}/>
        <Route path="/team/:id" element={<TeamMemberDetails />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/service" element={<Service />}/>
      </Routes>
      <Footer />
    </>
  )
}
