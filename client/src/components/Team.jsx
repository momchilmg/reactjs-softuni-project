import { Link, Navigate } from "react-router"
import Hero from "./bars/HeroBar"
import TeamMember from "./members/TeamMember"
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { useNavigate } from "react-router";

export default function Team() {
    const [isPending, setIsPending] = useState(true)
    const [members, setMembers] = useState([])
    const navigation = useNavigate()

    useEffect(() => {
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
                setTimeout(() => {navigation("/")},1000)
            });
    }, []);
    
    return (
        <>
            {isPending && <Spinner />}
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
                    {members.map(member => <TeamMember key={member.id} name={member.name} work={member.work} img={member.img} id={member.id} />)}
                </div>
            </div>
        </div>
        </>
    )
}