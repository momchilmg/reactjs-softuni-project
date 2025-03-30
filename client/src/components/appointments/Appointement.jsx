import { useParams } from "react-router"
import Hero from "../bars/HeroBar"
import { GlobalContext } from "../context/GlobalContext"
import { useContext, useEffect, useState } from "react"
import Spinner from "../Spinner";
import { isValidDate, isValidTime, isFutureDateTime } from "./Validating"

export default function Appointement() {

    let params = useParams()

    const [openLoginForm, setOpenLoginForm] = useContext(GlobalContext)[0]
    const [authorizedUser, setAuthorizedUser] = useContext(GlobalContext)[1]
    const [openInfoPopup, setOpenInfoPopup] = useContext(GlobalContext)[2]
    const [isPending, setIsPending] = useState(true)
    const [members, setMembers] = useState([])

    const onLoad = useEffect(() => {

        if (!authorizedUser && !openLoginForm)
            setOpenLoginForm(true)
        document.getElementsByClassName("baseHeroBar")[0].scrollIntoView()

        fetch('http://localhost:3030/data/members')
            .then(response => response.json())
            .then(data => {
                const result = Object.values(data)
                setMembers(result)
                setIsPending(false)
            })
            .catch(error => {
                console.log(error.message)
                setTimeout(() => { navigation("/") }, 1000)
            })

    }, [])

    const makeAppointement = (appointmentForm) => {

        let service = appointmentForm.get('service')
        let member = appointmentForm.get('member')
        let date = appointmentForm.get('date')
        let time = appointmentForm.get('time')

        if (!isValidDate(date) ||
            !isValidTime(time) ||
            !(service > 0) ||
            !(member > 0) ||
            !isFutureDateTime(date + ' ' + time)) {

            setOpenInfoPopup("Please, insert a correct information in appointment form!")
            return
        }

        const options = {
            method: 'POST',
            headers: {
                'X-Authorization': authorizedUser.accessToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "authorName": authorizedUser.username,
                "service": service,
                "member": member,
                "date": date,
                "time": time,
            })
        }

        fetch(`http://localhost:3030/data/appointments/`, options)
            .then(response => response.json())
            .then(data => {
                if (data.code !== undefined)
                    return
                setOpenInfoPopup("Your appointment has been created")
            })
            .catch(error => {
                console.log(error.message)
            });
    }

    return (
        <>
            {isPending && <Spinner />}
            <Hero name="Appointment" url="appointment" />
            <div className="container-fluid bg-primary bg-appointment mb-5" style={{ marginTop: 50 + 'px' }}>
                <div className="container">
                    <div className="row gx-5">
                        <div className="col-lg-6 py-5">
                            <div className="py-5">
                                <h1 className="display-5 text-white mb-4">We Are A Certified and Award Winning Dental Clinic You Can Trust</h1>
                                <p className="text-white mb-0">Eirmod sed tempor lorem ut dolores. Aliquyam sit sadipscing kasd ipsum. Dolor ea et dolore et at sea ea at dolor, justo ipsum duo rebum sea invidunt voluptua. Eos vero eos vero ea et dolore eirmod et. Dolores diam duo invidunt lorem. Elitr ut dolores magna sit. Sea dolore sanctus sed et. Takimata takimata sanctus sed.</p>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="appointment-form h-100 d-flex flex-column justify-content-center text-center p-5">
                                <h1 className="text-white mb-4">Make Appointment</h1>
                                <form id="appointmentForm" action={makeAppointement}>
                                    <div className="row g-3">
                                        <div className="col-12 col-sm-6">
                                            <select className="form-select bg-light border-0" style={{ height: 55 + 'px' }} id="service" name="service" defaultValue={params.type}>
                                                <option>Select A Service</option>
                                                <option value="1">Teeth Whitening</option>
                                                <option value="2">Dental Implant</option>
                                                <option value="3">Root Canal</option>
                                            </select>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <select className="form-select bg-light border-0" id="member" name="member" style={{ height: 55 + 'px' }}>
                                                <option defaultValue>Select Doctor</option>
                                                {members.map(member => <option value={member.id} key={member.id}>{member.name}</option>)}
                                            </select>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="date" id="date1" data-target-input="nearest">
                                                <input type="date"
                                                    className="form-control bg-light border-0 datetimepicker-input"
                                                    placeholder="Appointment Date"
                                                    id="date"
                                                    name="date"
                                                    style={{ height: 55 + 'px' }} />
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="time" id="time1" data-target-input="nearest">
                                                <input type="time"
                                                    className="form-control bg-light border-0 datetimepicker-input"
                                                    placeholder="Appointment Time"
                                                    id="time"
                                                    name="time"
                                                    style={{ height: 55 + 'px' }}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <button className="btn btn-dark w-100 py-3" type="submit">Make Appointment</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}