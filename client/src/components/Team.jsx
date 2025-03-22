import { Link } from "react-router"
import Hero from "./bars/HeroBar"
import TeamMember from "./members/TeamMember"

export default function Team() {
    return (
        <>
            <Hero name="Our Dentist" url="team" />
            <div className="container-fluid py-5">
            <div className="container">
                <div className="row g-5">
                    <div className="col-lg-4 wow slideInUp" data-wow-delay="0.1s">
                        <div className="section-title bg-light rounded h-100 p-5">
                            <h5 className="position-relative d-inline-block text-primary text-uppercase">Our Dentist</h5>
                            <h1 className="display-6 mb-4">Meet Our Certified & Experienced Dentist</h1>
                            <Link to="/appointment" className="btn btn-primary py-3 px-5">Appointment</Link>
                        </div>
                    </div>
                    <TeamMember name="Dr. John Doe 1" work="Implant Surgeon" img="team-1.jpg" />
                    <TeamMember name="Dr. John Doe 2" work="Implant Surgeon" img="team-2.jpg" />
                    <TeamMember name="Dr. John Doe 3" work="Implant Surgeon" img="team-3.jpg" />
                    <TeamMember name="Dr. John Doe 4" work="Implant Surgeon" img="team-4.jpg" />
                    <TeamMember name="Dr. John Doe 5" work="Implant Surgeon" img="team-5.jpg" />
                </div>
            </div>
        </div>
        </>
    )
}