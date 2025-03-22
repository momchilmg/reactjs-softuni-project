export default function TeamMember(props) {
    return (
        <>
            <div className="col-lg-4 wow slideInUp" data-wow-delay="0.3s">
                <div className="team-item">
                    <div className="position-relative rounded-top" style={{zIndex: 1}}>
                        <img className="img-fluid rounded-top w-100" src={"src/img/" + props.img} alt="" />
                    </div>
                    <div className="team-text position-relative bg-light text-center rounded-bottom p-4 pt-5">
                        <h4 className="mb-2">{props.name}</h4>
                        <p className="text-primary mb-0">{props.work}</p>
                    </div>
                </div>
            </div>
        </>
    )
}