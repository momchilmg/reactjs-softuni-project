import { Link } from 'react-router';

export default function MainBanner() {
    return (
        <>
            <div className="active carousel-inner">
                <img className="w-100" src="src/img/carousel-1.jpg" alt="Image" />
                <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                    <div className="p-3" style={{maxWidth: 900 + 'px'}}>
                        <h5 className="text-white text-uppercase mb-3 animated slideInDown">Keep Your Teeth Healthy</h5>
                        <h1 className="display-1 text-white mb-md-4 animated zoomIn">Take The Best Quality Dental Treatment</h1>
                        <Link to="/appointment" className="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft">Appointment</Link>
                        <Link to="/contact" className="btn btn-secondary py-md-3 px-md-5 animated slideInRight">Contact Us</Link>
                    </div>
                </div>
            </div>
        </>
    )
}