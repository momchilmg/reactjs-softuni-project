import serviceCSS from '../../css/Service.module.css'
import { Link } from 'react-router'

export default function ServiceItem(props) {
    return (
        <>
            <div className='col-lg-6'>
                <div className={"price-item pb-4 " + serviceCSS.serviceItem} >
                    <div className="position-relative">
                        <img className="img-fluid rounded-top" src={"src/img/" + props.img} alt="" />
                        <div className="d-flex align-items-center justify-content-center bg-light rounded pt-2 px-3 position-absolute top-100 start-50 translate-middle" style={{zIndex: 2}}>
                            <h2 className="text-primary m-0">${props.price}</h2>
                        </div>
                    </div>
                    <div className="position-relative text-center bg-light border-bottom border-primary py-5 p-4">
                        <h4>{props.serviceName}</h4>
                        <hr className="text-primary w-50 mx-auto mt-0" />
                        <div className="d-flex justify-content-between mb-3"><span>Modern Equipment</span><i className="fa fa-check text-primary pt-1"></i></div>
                        <div className="d-flex justify-content-between mb-3"><span>Professional Dentist</span><i className="fa fa-check text-primary pt-1"></i></div>
                        <div className="d-flex justify-content-between mb-2"><span>24/7 Call Support</span><i className="fa fa-check text-primary pt-1"></i></div>
                        <Link to="/appointment" className="btn btn-primary py-2 px-4 position-absolute top-100 start-50 translate-middle">Appointment</Link>
                    </div>
                </div>
            </div>
        </>
    )
}