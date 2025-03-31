import Input from "./Input";
import { useNavigate, useResolvedPath } from "react-router";
import { isValidEmail } from "../misc/Validating"
import Hero from "../bars/HeroBar";
import { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext"

export default function Register(props) {

    const [openLoginForm, setOpenLoginForm] = useContext(GlobalContext)[0]
    const [authorizedUser, setAuthorizedUser] = useContext(GlobalContext)[1]
    const [openInfoPopup, setOpenInfoPopup] = useContext(GlobalContext)[2]
    const [username, setUsername] = useState((authorizedUser ? authorizedUser.username : ''))
    const [address, setAddress] = useState((authorizedUser ? authorizedUser.address : ''))
    const [phone, setPhone] = useState((authorizedUser ? authorizedUser.phone : ''))
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [password2, setPassword2] = useState()
    const navigate = useNavigate()

    const onLoad = useEffect(() => { document.getElementsByClassName("baseHeroBar")[0].scrollIntoView() }, [])

    const submitRegister = (formData) => {
        formData.preventDefault()

        if ((props.type === "register" && (
            !isValidEmail(email) ||
            password === '' ||
            password !== password2 ||
            username === '' ||
            address === '' ||
            phone === ''
        )) ||
            (props.type === "profile" && (
                username === '' ||
                address === '' ||
                phone === ''
            ))
        ) {
            setOpenInfoPopup("Please, insert a correct information in registration form!")
            return
        }

        let jsonA = {
            "email": email,
            "password": encodeURIComponent(password)
        }

        let jsonB = {
            "username": encodeURIComponent(username),
            "address": encodeURIComponent(address),
            "phone": encodeURIComponent(phone)
        }

        let json
        if (props.type === "register")
            json = JSON.stringify({ ...jsonA, ...jsonB })
        else
            json = JSON.stringify({...jsonB})

        const options = {
            method: (props.type === "register" ? 'POST' : 'PATCH'),
            body: json
        }

        if (props.type === "register") {
            options.headers = {
                'Content-Type': 'application/json'
            }
        } else if (props.type === "profile") {
            options.headers = {
                'Content-Type': 'application/json',
                'X-Authorization': authorizedUser.accessToken
            }
        }

        fetch(`http://localhost:3030/users/` + (props.type === "register" ? 'register' : 'me'), options)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.code !== undefined && data.code == 409) {
                    setOpenInfoPopup(data.message)
                } else if (data.code === undefined && props.type === "register") {
                    setOpenInfoPopup("Registration completed")
                    navigate("/")
                } else if (data.code === undefined && props.type === "profile") {
                    let t = authorizedUser
                    t.username = username
                    t.address = address
                    t.phone = phone
                    setAuthorizedUser(t)
                    setOpenInfoPopup("Profile updated")
                } else {
                    setOpenInfoPopup("Unknown error")
                }
            })
            .catch(error => {
                console.log(error.message)
            })
    }

    return (
        <>
            <div className="col-lg-12" style={{
                height: "100%",
                width: "100%",
                backgroundColor: "rgba(9, 30, 62, .85)"
            }}
            >
                <Hero name="Register" url="register" />
                <div className="appointment-form h-100 d-flex flex-column justify-content-center text-center p-5">
                    <h1 className="text-white mb-4">{(props.type === "register" ? "Register" : "Your Profile")}</h1>
                    <form id="loginForm" onSubmit={submitRegister}>
                        <div className="row g-3" style={{ maxWidth: "700px", margin: "auto" }}>
                            <Input type="name" id="name" name="name" label="Your Name :" placeholder="Your Name, ex.: John Smith" onKeyUp={e => setUsername(e.target.value)} autocomplete="given-name family-name" value={(props.type === "register" ? "" : decodeURIComponent(authorizedUser.username))} />
                            <Input type="address" id="address" name="address" label="Your Address :" placeholder="Your Address" onKeyUp={e => setAddress(e.target.value)} autocomplete="shipping street-address" value={(props.type === "register" ? "" : decodeURIComponent(authorizedUser.address))} />
                            <Input type="phone" id="phone" name="phone" label="Your Phone Number :" placeholder="Your Phone Number" onKeyUp={e => setPhone(e.target.value)} autocomplete="tel" value={(props.type === "register" ? "" : decodeURIComponent(authorizedUser.phone))} />
                            {props.type === "register" && <Input type="email" id="email" name="email" label="Your Email :" placeholder="Your Email" onKeyUp={e => setEmail(e.target.value.trim())} autocomplete="email" />}
                            {props.type === "register" && <Input type="password" id="password" name="password" label="Your Password :" placeholder="Your Password" onKeyUp={e => setPassword(e.target.value.trim())} autocomplete="new-password" />}
                            {props.type === "register" && <Input type="password" id="password2" name="password2" label="Confirm Your Password :" placeholder="Confirm Your Password" onKeyUp={e => setPassword2(e.target.value.trim())} autocomplete="new-password" />}
                            <div className="col-12">
                                <button className="btn btn-dark w-50 py-3" type="submit">{(props.type === "register" ? "Register" : "Update")}</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}