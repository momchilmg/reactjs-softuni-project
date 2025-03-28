import { Link } from "react-router"

export default function Footer() {
    return (
        <>
            <div className="container-fluid bg-dark text-light py-5">
                <div className="container pt-5">
                    <div className="row g-5 pt-4">
                        <div className="col-lg-3 col-md-6">
                            <h3 className="text-white mb-4">Quick Links</h3>
                            <div className="d-flex flex-column justify-content-start">
                                <Link to="/"><i className="bi bi-arrow-right text-primary me-2"></i>Home</Link>
                                <Link to="/about"><i className="bi bi-arrow-right text-primary me-2"></i>About Us</Link>
                                <Link to="/service"><i className="bi bi-arrow-right text-primary me-2"></i>Our Services</Link>
                                <Link to="/contact"><i className="bi bi-arrow-right text-primary me-2"></i>Contact Us</Link>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <h3 className="text-white mb-4">Popular Links</h3>
                            <div className="d-flex flex-column justify-content-start">
                                <Link to="/"><i className="bi bi-arrow-right text-primary me-2"></i>Home</Link>
                                <Link to="/about"><i className="bi bi-arrow-right text-primary me-2"></i>About Us</Link>
                                <Link to="/service"><i className="bi bi-arrow-right text-primary me-2"></i>Our Services</Link>
                                <Link to="/contact"><i className="bi bi-arrow-right text-primary me-2"></i>Contact Us</Link>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <h3 className="text-white mb-4">Get In Touch</h3>
                            <p className="mb-2"><i className="bi bi-geo-alt text-primary me-2"></i>123 Street, New York, USA</p>
                            <p className="mb-2"><i className="bi bi-envelope-open text-primary me-2"></i>info@example.com</p>
                            <p className="mb-0"><i className="bi bi-telephone text-primary me-2"></i>+012 345 67890</p>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <h3 className="text-white mb-4">Follow Us</h3>
                            <div className="d-flex">
                                <Link className="btn btn-lg btn-primary btn-lg-square rounded me-2" to="#"><i className="fab fa-twitter fw-normal"></i></Link>
                                <Link className="btn btn-lg btn-primary btn-lg-square rounded me-2" to="#"><i className="fab fa-facebook-f fw-normal"></i></Link>
                                <Link className="btn btn-lg btn-primary btn-lg-square rounded me-2" to="#"><i className="fab fa-linkedin-in fw-normal"></i></Link>
                                <Link className="btn btn-lg btn-primary btn-lg-square rounded" to="#"><i className="fab fa-instagram fw-normal"></i></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid text-light py-4" style={{background: '#051225'}}>
                <div className="container">
                    <div className="row g-0">
                        <div className="col-md-6 text-center text-md-start">
                            <p className="mb-md-0">&copy; <Link className="text-white border-bottom" to="/">DentCare</Link>. All Rights Reserved.</p>
                        </div>
                        <div className="col-md-6 text-center text-md-end">
                            <p className="mb-0">Designed by <Link className="text-white border-bottom" to="https://htmlcodex.com" target="_blank">HTML Codex</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}