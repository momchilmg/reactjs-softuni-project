import TopBar from './components/bars/TopBar'
import NavBar from './components/bars/NavBar'
import Footer from './components/bars/Footer'
import Home from './components/Home'
import { Routes, Route, useNavigate } from 'react-router'
import Contact from './components/Contact'
import Appointement from './components/appointments/Appointement'
import Team from './components/Team'
import About from './components/About'
import Service from './components/Service'
import TeamMemberDetails from './components/members/TeamMemberDetails'
import Login from './components/login/Login'
import { GlobalContext } from './components/context/GlobalContext'
import { useEffect, useState } from 'react'
import usePersistedState from './components/hooks/usePersistedState'
import InfoMessage from './components/misc/InfoMessage'
import PrivateAppointements from './components/appointments/PrivateAppointements'

export default function App() {

    const [openLoginForm, setOpenLoginForm] = useState(false)    
    const [authorizedUser, setAuthorizedUser] = usePersistedState('authotization', null)
    const [openInfoPopup, setOpenInfoPopup] = useState(null)
    const navigate = useNavigate()

    const LoginCheck = useEffect(() => {
        if (!authorizedUser)
            return
        
        const options = {
            method: 'GET',
            headers: {
                'X-Authorization': authorizedUser.accessToken,
                'Content-Type': 'application/json'
            }
        }

        fetch(`http://localhost:3030/users/me/`, options)
            .then(response => response.json())
            .then(data => {
                if (data._id === authorizedUser._id)
                    return
                setAuthorizedUser(null)
            })
            .catch(error => {
                console.log(error.message)
            });
    }, [])

    const LogoutCheck = useEffect(() => {
        if (!authorizedUser)
            navigate("/")
    }, [authorizedUser])

    return (
        <>
            <GlobalContext.Provider value={[[openLoginForm, setOpenLoginForm], [authorizedUser, setAuthorizedUser], [openInfoPopup, setOpenInfoPopup]]}>
                {(openLoginForm && <Login />)}
                {(openInfoPopup !== null && <InfoMessage />)}
                <TopBar />
                <NavBar />
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/appointment" element={<Appointement />} />
                    <Route path="/appointment/:type" element={<Appointement />} />
                    <Route path="/myappointments" element={(authorizedUser ? <PrivateAppointements /> : <Home />)} />
                    <Route path="/team" element={<Team />} />
                    <Route path="/team/:id" element={<TeamMemberDetails />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/service" element={<Service />} />
                </Routes>
                <Footer />
            </GlobalContext.Provider>
        </>
    )
}
