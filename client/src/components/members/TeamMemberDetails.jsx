import TeamMember from "./TeamMember"
import { useState, useEffect } from "react";
import Spinner from "../Spinner";
import { useParams, useNavigate } from "react-router";
import Hero from "../bars/HeroBar";
import Comment from "../comments/Comment";
import bioCSS from "../../css/Bio.module.css"

export default function TeamMemberDetails() {
    const [isPending, setIsPending] = useState(true)
    const [member, setMember] = useState([])
    const { id } = useParams()
    const navigation = useNavigate()

    useEffect(() => {
        document.getElementsByClassName("baseHeroBar")[0].scrollIntoView()
        fetch(`http://localhost:3030/jsonstore/doc/${id}`)
        .then(response => response.json())
        .then(data => {
            setMember(data)
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
            <Hero name="Our Dentist" url="team" one="true" nameMember={member.name}/>
            <div className="container-fluid py-5">
            <div className="container">
            <div className="row g-5">
            <TeamMember name={member.name} work={member.work} img={member.img} id={member.id} one="true" />
            <div className="col-xl-8 col-lg-6" data-wow-delay="0.1s">
                <div className="bg-light rounded h-100 p-5">
                    <div className="d-flex align-items-center mb-2">
                        <i className="bi bi-geo-alt fs-1 text-primary me-3"></i>
                        <div className="text-start">
                            <h3>Biography:</h3>
                            <h5 className={"mb-0 " + bioCSS.textJustify}>{member.bio}</h5>
                            <p>
                                <span>Updated on {member.updated}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <h2 style={{marginBottom: 0}}>Comments:</h2>
            <Comment author="kkk" comment="tes te st etsjkh test kjuh" date="XX xxxx XXXX"/>
            <Comment author="kkk" comment="tes te st etsjkh test kjuh" date="XX xxxx XXXX"/>
            <Comment author="kkk" comment="tes te st etsjkh test kjuh" date="XX xxxx XXXX"/>
            <Comment author="kkk" comment="tes te st etsjkh test kjuh" date="XX xxxx XXXX"/>
            <Comment author="kkk" comment="tes te st etsjkh test kjuh" date="XX xxxx XXXX"/>
            <Comment author="kkk" comment="tes te st etsjkh test kjuh" date="XX xxxx XXXX"/>
            </div>
            </div>
            </div>
        </>
    )
}