import { useContext } from "react"
import { GlobalContext } from "../context/GlobalContext"
import { isValidDate, isValidTime, isFutureDateTime } from "./Validating"

export default function OneAppointment(props) {

    const [authorizedUser, setAuthorizedUser] = useContext(GlobalContext)[1]
    const [openInfoPopup, setOpenInfoPopup] = useContext(GlobalContext)[2]

    const changeAppointement = (appointmentForm) => {

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
            method: 'PATCH',
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

        fetch(`http://localhost:3030/data/appointments/` + props.id, options)
            .then(response => response.json())
            .then(data => {
                if (data.code !== undefined)
                    return
                setOpenInfoPopup("Your appointment has been changed")
            })
            .catch(error => {
                console.log(error.message)
            });
    }

    return (
        <>
            <div className="col-lg-6" style={{marginTop: "15px", marginBottom: "15px", maxHeight: "368px"}}>
                <div className="appointment-form h-100 d-flex flex-column justify-content-center text-center p-5">
                    <h1 className="text-white mb-4">Appointment</h1>
                    <form id="appointmentForm" action={changeAppointement}>
                        <div className="row g-3">
                            <div className="col-12 col-sm-6">
                                <select className="form-select bg-light border-0" style={{ height: 55 + 'px' }} id="service" name="service" defaultValue={props.service}>
                                    <option>Select A Service</option>
                                    <option value="1">Teeth Whitening</option>
                                    <option value="2">Dental Implant</option>
                                    <option value="3">Root Canal</option>
                                </select>
                            </div>
                            <div className="col-12 col-sm-6">
                                <select className="form-select bg-light border-0" id="member" name="member" style={{ height: 55 + 'px' }} defaultValue={props.member}>
                                    <option defaultValue>Select Doctor</option>
                                    {props.members.map(member => <option value={member.id} key={member.id}>{member.name}</option>)}
                                </select>
                            </div>
                            <div className="col-12 col-sm-6">
                                <div className="date" id="date1" data-target-input="nearest">
                                    <input type="date"
                                        className="form-control bg-light border-0 datetimepicker-input"
                                        placeholder="Appointment Date"
                                        id="date"
                                        name="date"
                                        style={{ height: 55 + 'px' }}
                                        defaultValue={props.date}
                                    />
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
                                        defaultValue={props.time}
                                    />
                                </div>
                            </div>
                            <div className="col-12">
                                <button className="btn btn-dark w-100 py-3" type="submit">Change Appointment</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}