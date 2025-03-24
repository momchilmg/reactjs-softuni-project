import { Link } from "react-router"

export default function Hero(props) {

    let member = ""
    if (props.one === "true") {
        member = <><span className="h4 text-white px-2">&#9655;</span><Link to="#" className="h4 text-white">{props.nameMember}</Link></>
    }

    return (
        <>
            <div className="container-fluid bg-primary py-5 hero-header baseHeroBar">
                <div className="row py-3">
                    <div className="col-12 text-center">
                        <h1 className="display-3 text-white animated zoomIn">{props.name}</h1>
                        <Link to="/" className="h4 text-white">Home</Link>
                        <span className="h4 text-white px-2">&#9655;</span>
                        <Link to={"/" + props.url} className="h4 text-white">{props.name}</Link>
                        {member}
                    </div>
                </div>
            </div>
        </>
    )
}