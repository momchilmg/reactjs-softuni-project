import TopBar from './components/bars/TopBar'
import NavBar from './components/bars/NavBar'
import Footer from './components/bars/Footer'
import Home from './components/Home'
import { Routes, Route, useNavigate, Navigate, useResolvedPath } from 'react-router'
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
import Register from './components/login/Register'
import { apiURL } from "./components/misc/Global"

export default function App() {

    const [openLoginForm, setOpenLoginForm] = useState(false)
    const [authorizedUser, setAuthorizedUser] = usePersistedState('authotization', null)
    const [openInfoPopup, setOpenInfoPopup] = useState(null)
    const navigate = useNavigate()
    const path = useResolvedPath().pathname

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

        fetch(apiURL() + `/users/me/`, options)
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
        if (!authorizedUser && (path.startsWith('/myappointments') || path.startsWith('/profile')))
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
                    <Route path="/appointment/:type?" element={<Appointement />} />
                    <Route path="/myappointments/:page?" element={(authorizedUser ? <PrivateAppointements /> : <Navigate to="/" />)} />
                    <Route path="/team" element={<Team />} />
                    <Route path="/team/:id" element={<TeamMemberDetails />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/service" element={<Service />} />
                    <Route path="/register" element={(authorizedUser ? <Navigate to="/" /> : <Register type="register" />)} />
                    <Route path="/profile" element={(authorizedUser ? <Register type="profile" /> : <Navigate to="/" />)} />
                </Routes>
                <Footer />
            </GlobalContext.Provider>
        </>
    )
}
