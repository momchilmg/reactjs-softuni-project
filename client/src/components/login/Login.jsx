import Input from "./Input";
import { GlobalContext } from "../context/GlobalContext";
import { useContext } from "react";
import { useNavigate, useResolvedPath  } from "react-router";

export default function Login() {
    
    const [openLoginForm, setOpenLoginForm] = useContext(GlobalContext)[0]
    const [authorizedUser, setAuthorizedUser] = useContext(GlobalContext)[1]    
    const path = useResolvedPath().pathname
    const navigate = useNavigate()

    const submitAction = (formData) => {
        let email = formData.get('email').trim()
        let password = formData.get('password').trim()
        if (isValidEmail === false || password === '')
            return

        const options = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                "email": email,
                "password": encodeURIComponent(password),
            })
        }

        fetch(`http://localhost:3030/users/login/`, options)
        .then(response => response.json())
        .then(data => {            
            if (data.code !== undefined)
                return

            setAuthorizedUser(data)
            setOpenLoginForm(false)
        })
        .catch(error => {
            console.log(error.message)
        });
    };

    const CloseLoginForm = () => {
        if (path.startsWith('/appointment') || path.startsWith('/myappointments')) {
            navigate("/")
        }
        setOpenLoginForm(false)
    }

    return (
        <>
            <div style={{
                    position: "fixed",
                    height: "100%",
                    width: "100%",
                    left: 0,
                    top: 0,
                    backgroundColor: "rgba(9, 30, 62, .85)",
                    zIndex: 2,
                    margin: 0,
                    backdropFilter: "blur(3px)"
                }}

                onClick={CloseLoginForm}
            >
            </div>
            <div style={{
                    position: "fixed",
                    minWidth: "400px",
                    zIndex: 3,
                    left: "50%",
                    transform: "translate(-50%, 0)",
                    top: "20%",
                    width: "30%",
                    backgroundColor: "aliceblue"
                }}
            >
                <div className="col-lg-12">
                    <div className="appointment-form h-100 d-flex flex-column justify-content-center text-center p-5">
                        <h1 className="text-white mb-4">Login</h1>
                        <form id="loginForm" action={submitAction}>
                            <div className="row g-3">
                                <Input type="email" id="email" name="email"  placeholder="Your Email" onKeyUp={null} autocomplete="username" />
                                <Input type="password" id="password" name="password" placeholder="Your Password" onKeyUp={null} autocomplete="current-password" />
                                <div className="col-12">
                                    <button className="btn btn-dark w-50 py-3" type="submit">Login</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }