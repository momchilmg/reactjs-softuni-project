import { Link, useNavigate, useParams } from "react-router"
import Hero from "../bars/HeroBar"
import { GlobalContext } from "../context/GlobalContext"
import { useContext, useEffect, useState } from "react"
import Spinner from "../Spinner";
import OneAppointment from "./OneAppointement";
import { apiURL } from "../misc/Global"

export default function PrivateAppointements() {

    const [openLoginForm, setOpenLoginForm] = useContext(GlobalContext)[0]
    const [authorizedUser, setAuthorizedUser] = useContext(GlobalContext)[1]
    const [openInfoPopup, setOpenInfoPopup] = useContext(GlobalContext)[2]
    const navigation = useNavigate()
    const { page } = useParams()
    const [isPending, setIsPending] = useState(true)
    const [members, setMembers] = useState([])
    const [appointments, setAppointments] = useState([])
    const [count, setCount] = useState(0)
    const [order, setOrder] = useState(false)
    const pageSize = 4
    let t = 0
    if (page !== undefined) {
        try {
            if (page > 1)
                t = (page - 1) * pageSize
        } catch {
            //nothing
        }
    }
    const [offSet, setOffSet] = useState(t)

    const onLoad = useEffect(() => {

        document.getElementsByClassName("baseHeroBar")[0].scrollIntoView()

        fetch(apiURL() + `/data/members`)
            .then(response => response.json())
            .then(data => {
                const result = Object.values(data)
                setMembers(result)
            })
            .catch(error => {
                console.log(error.message)
                setTimeout(() => { navigation("/") }, 1000)
            })

        fetch(apiURL() + `/data/appointments/?where=_ownerId%3D%22${authorizedUser._id}%22&count=1`)
            .then(response => response.json())
            .then(data => {
                setCount(data)

                //check total number of appointments 
                if (data == 0) {
                    setIsPending(false)
                    setOpenInfoPopup("You don't have appointments")
                    return
                }

                //check last page
                let maxPages = Math.ceil(data / pageSize)
                if (offSet / pageSize > Math.ceil(data / pageSize) - 1)
                    setOffSet((maxPages - 1) * pageSize)
            })
            .catch(error => {
                console.log(error.message)
            })
    }, [])

    const changeOrder = useEffect(() => {
        if (count > 0)
            LoadMore()
        else
            setAppointments([])
    }, [order, offSet, count])

    const LoadMore = () => {
        if (count <= 0) {
            setIsPending(false)
            return
        }

        //calcul the current page
        let p = (offSet / pageSize) + 1
        navigation("/myappointments" + (p <= 1 ? "" : "/" + p), { replace: true });

        fetch(apiURL() + `/data/appointments/?where=_ownerId%3D%22${authorizedUser._id}%22&sortBy=date%20${(order ? 'desc' : '')}%2Ctime%20${(order ? 'desc' : '')}&offset=${offSet}&pageSize=${pageSize}`)
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
                            count={count}
                            setCount={setCount}
                            LoadMore={LoadMore}
                        />)}
                    </div>
                    <div className="col-lg-12" style={{
                        position: "sticky",
                        bottom: 0
                    }}>
                        <center>
                            <Link to="#" id="previousPage" className={"btn btn-primary py-2 px-4" + (offSet >= pageSize ? "" : " disabled")} style={{ width: "300px" }} onClick={() => setOffSet(offSet - pageSize)}>&#11207; Previous page</Link>
                            <Link to="#" className={"btn btn-primary py-2 px-4" + (offSet < count - pageSize ? "" : " disabled")} style={{ width: "300px" }} onClick={() => setOffSet(offSet + pageSize)}>Next page &#11208;</Link>
                        </center>
                    </div>
                </div>
            </div>
        </>
    )
}

