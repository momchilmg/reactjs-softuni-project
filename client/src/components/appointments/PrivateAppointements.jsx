import { Link, useParams } from "react-router"
import Hero from "../bars/HeroBar"
import { GlobalContext } from "../context/GlobalContext"
import { useContext, useEffect, useState } from "react"
import Spinner from "../Spinner";
import OneAppointment from "./OneAppointement";

export default function PrivateAppointements() {

    const [openLoginForm, setOpenLoginForm] = useContext(GlobalContext)[0]
    const [authorizedUser, setAuthorizedUser] = useContext(GlobalContext)[1]
    const [openInfoPopup, setOpenInfoPopup] = useContext(GlobalContext)[2]
    const [isPending, setIsPending] = useState(true)
    const [members, setMembers] = useState([])
    const [appointments, setAppointments] = useState([])
    const [count, setCount] = useState(0)
    const [order, setOrder] = useState(false)
    const [offSet, setOffSet] = useState(0)
    let pageSize = 4

    const onLoad = useEffect(() => {
        if (!authorizedUser && !openLoginForm) {
            setIsPending(false)
            setOpenLoginForm(true)
            return
        }

        document.getElementsByClassName("baseHeroBar")[0].scrollIntoView()

        fetch('http://localhost:3030/data/members')
            .then(response => response.json())
            .then(data => {
                const result = Object.values(data)
                setMembers(result)
            })
            .catch(error => {
                console.log(error.message)
                setTimeout(() => { navigation("/") }, 1000)
            })

        fetch(`http://localhost:3030/data/appointments/?where=_ownerId%3D%22${authorizedUser._id}%22&count=1`)
            .then(response => response.json())
            .then(data => {
                setCount(data)
            })
            .catch(error => {
                console.log(error.message)
                setTimeout(() => { navigation("/") }, 1000)
            })

        LoadMore()
    }, [])

    const changeOrder = useEffect(() => {
        LoadMore()
    }, [order, offSet])

    const LoadMore = () => {

        fetch(`http://localhost:3030/data/appointments/?where=_ownerId%3D%22${authorizedUser._id}%22&sortBy=date%20${(order ? 'desc' : '')}%2Ctime%20${(order ? 'desc' : '')}&offset=${offSet}&pageSize=${pageSize}`)
            .then(response => response.json())
            .then(data => {
                setAppointments([...data])
            })
            .catch(error => {
                console.log(error.message)
                setTimeout(() => { navigation("/") }, 1000)
            })

        setIsPending(false)
    }

    return (
        <>
            {isPending && <Spinner />}
            <Hero name="Your Appointments" url="myappointments" />
            <div className="container-fluid bg-primary bg-appointment mb-5" style={{ marginTop: 50 + 'px', minHeight: "880px" }}>
                <div className="container">
                    <div className="col-lg-12">
                        <center>
                            <Link to="#" className={"btn btn-primary py-2 px-4" + (!order ? " disabled" : "")} style={{ width: "300px" }} onClick={() => setOrder(false)}>Soonest appointments are first</Link>
                            <Link to="#" className={"btn btn-primary py-2 px-4" + (order ? " disabled" : "")} style={{ width: "300px" }} onClick={() => setOrder(true)}>Latest appointments are first</Link>
                        </center>
                    </div>
                    <div className="row gx-5" style={{ minHeight: "796px" }}>
                        {appointments.map(appointment => <OneAppointment
                            key={appointment._id}
                            id={appointment._id}
                            service={appointment.service}
                            members={members}
                            member={appointment.member}
                            date={appointment.date}
                            time={appointment.time}
                        />)}
                    </div>
                    <div className="col-lg-12" style={{
                        position: "sticky",
                        bottom: 0
                    }}>
                        <center>
                            <Link to="#" className={"btn btn-primary py-2 px-4" + (offSet >= pageSize ? "" : " disabled")} style={{ width: "300px" }} onClick={() => setOffSet(offSet - pageSize)}>&#11207; Previous page</Link>
                            <Link to="#" className={"btn btn-primary py-2 px-4" + (offSet < count - pageSize ? "" : " disabled")} style={{ width: "300px" }} onClick={() => setOffSet(offSet + pageSize)}>Next page &#11208;</Link>
                        </center>
                    </div>
                </div>
            </div>
        </>
    )
}

