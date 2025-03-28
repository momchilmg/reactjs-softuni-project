import { Link, useLocation } from 'react-router';
import { useContext } from 'react';
import { LoginContext } from '../context/LoginContext';

export default function NavBar() {

    const location = useLocation()
    const [openLoginForm, setOpenLoginForm] = useContext(LoginContext)[0]
    const [authorizedUser, setAuthorizedUser] = useContext(LoginContext)[1]
    
    const Logout = () => {
        setAuthorizedUser(null)
    }
    
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-white navbar-light shadow-sm px-5 py-3 py-lg-0">
                <Link to="/" className="navbar-brand p-0">
                    <h1 className="m-0 text-primary"><i className="fa fa-tooth me-2"></i>DentCare</h1>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <div className="navbar-nav ms-auto py-0">
                        <Link to="/" className={"nav-item nav-link" + (location.pathname === "/" ? " active" : "")}>Home</Link>
                        <Link to="/about" className={"nav-item nav-link" + (location.pathname === "/about" ? " active" : "")}>About</Link>
                        <Link to="/team" className={"nav-item nav-link" + (location.pathname === "/team" ? " active" : "")}>Our Dentist</Link>
                        <Link to="/service" className={"nav-item nav-link" + (location.pathname === "/service" ? " active" : "")}>Service</Link>
                        <Link to="/contact" className={"nav-item nav-link" + (location.pathname === "/contact" ? " active" : "")}>Contact</Link>
                    </div>
                    <Link to="/appointment" className="btn btn-primary py-2 px-4 ms-3">Appointment</Link>
                    <Link to="#" className="btn btn-primary py-2 px-4 ms-3" onClick={() => {(authorizedUser ? Logout() : setOpenLoginForm(true))}}>{(authorizedUser ? 'Logout' : 'Login')}</Link>
                </div>
            </nav>
        </>
    )
}