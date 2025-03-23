import commentCSS from "../../css/Bio.module.css"

export default function Comment(props) {
    return (
        <>
            <div className={"col-lg-12 " + commentCSS.commentItem}>
                <div className="bg-light p-3">
                    <div className="section-title">
                        <h1 className="display-6">{props.author}</h1>
                    </div>
                    <span>Published on {props.date}</span>
                    <div className="d-flex align-items-center mb-2">
                        <i className="bi bi-geo-alt fs-1 text-primary"></i>
                        <div className="text-start">
                            <h5 className="mb-0">{props.comment}</h5>                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}