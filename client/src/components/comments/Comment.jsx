import { useState } from "react"
import commentCSS from "../../css/Bio.module.css"
import CommentDelete from "./CommentDelete"

export default function Comment(props) {
    const [toDelete, setDelete] = useState(false)

    function CommentDel() {
        setDelete(!toDelete)
    }

    return (
        <>
            {toDelete && <CommentDelete childSetDelete={setDelete} key={props.id} id={props.id} comments={props.comments} setComments={props.setComments} />}
            <div className={"col-lg-12 " + commentCSS.commentItem}>                
                <div className={"bg-light p-3 " + commentCSS.commentBody}>
                    <button className={"btn btn-primary py-2 px-4 " + commentCSS.commentDeleteButton} onClick={CommentDel}>Delete</button>
                    <button className={"btn btn-primary py-2 px-4 " + commentCSS.commentEditButton}>Edit</button>
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