import Input from "./Input";
import { GlobalContext } from "../context/GlobalContext";
import { useContext } from "react";
import { useNavigate, useResolvedPath } from "react-router";
import { isValidEmail } from "../misc/Validating"
import { apiURL } from "../misc/Global"

export default function Login() {

    const [openLoginForm, setOpenLoginForm] = useContext(GlobalContext)[0]
    const [authorizedUser, setAuthorizedUser] = useContext(GlobalContext)[1]
    const [openInfoPopup, setOpenInfoPopup] = useContext(GlobalContext)[2]
    const path = useResolvedPath().pathname
    const navigate = useNavigate()

    const submitAction = (formData) => {
        let email = formData.get('email').trim()
        let password = formData.get('password').trim()
        if (isValidEmail(email) === false || password === '')
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

        fetch(apiURL() + `/users/login/`, options)
            .then(response => response.json())
            .then(data => {
                if (data.code !== undefined) {
                    setOpenInfoPopup("Email or password incorrect.<br>Please, try again!")
                    return
                }
                
                setAuthorizedUser(JSON.parse(decodeURIComponent(JSON.stringify(data))))
                setOpenLoginForm(false)
            })
            .catch(error => {
                console.log(error.message)
            });
    };

    const CloseLoginForm = () => {
        if (!path.startsWith('/team')) {
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
                        <h1 className="text-white mb-4">LogIn</h1>
                        <form id="loginForm" action={submitAction}>
                            <div className="row g-3">
                                <Input type="email" id="email" name="email" label="Email :" placeholder="Your Email" onKeyUp={null} autocomplete="username" />
                                <Input type="password" id="password" name="password" label="Password :" placeholder="Your Password" onKeyUp={null} autocomplete="current-password" />
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