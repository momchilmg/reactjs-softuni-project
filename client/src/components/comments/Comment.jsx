import { useContext, useState } from "react"
import commentCSS from "../../css/Bio.module.css"
import CommentDelete from "./CommentDelete"
import CommentEditArea from "./CommentEditArea"
import { CommentsContext } from "./CommentsContext"
import CommentButton from "./CommentButton"

export default function Comment(props) {
    const [toDelete, setDelete] = useState(false)
    const [toEdit, setEdit] = useState(false)
    const [commentText, setCommentText] = useState(props.comment)
    const [comments, setComments] = useContext(CommentsContext)

    function CommentDel() {
        setDelete(!toDelete)
    }

    function SetEdit() {
        setEdit(!toEdit)
    }

    function SaveEdit() {
        fetch(`http://localhost:3030/data/comments/${props.id}`, {method: "PATCH", headers: {"X-Admin": ""}, body: '{"text": "' + encodeURIComponent(commentText) + '"}'})
        .then(response => response.json())
        .then(data => {        
            comments.filter(comment => comment._id === props.id)[0].text = commentText
            setComments([...comments])            
        })
        .catch(error => {
            console.log(error.message)
        });
        
        setEdit(!toEdit)
    }

    return (
        <>
            {toDelete && <CommentDelete childSetDelete={setDelete} key={props.id} id={props.id} />}
            <div className={"col-lg-12 " + commentCSS.commentItem}>                
                <div className={"bg-light p-3 " + commentCSS.commentBody}>
                    <CommentButton css={commentCSS.commentDeleteButton + (toEdit ? " " + commentCSS.beGreen : "")} click={(toEdit ? SetEdit : CommentDel)} name={(toEdit ? "Cancel" : "Delete")} />
                    <CommentButton css={commentCSS.commentEditButton} click={(!toEdit && SetEdit) || (toEdit && SaveEdit)} name={(toEdit ? "Save" : "Edit")} />
                    <div className="section-title">
                        <h1 className="display-6">{props.author}</h1>
                    </div>
                    <span>Published on {props.date}</span>
                    <div className="d-flex align-items-center mb-2">
                        <i className="bi bi-geo-alt fs-1 text-primary"></i>
                        <div className="text-start col-lg-12">
                            {toEdit ? <CommentEditArea id={"textArea" + props.id} comment={props.comment} setCommentText={setCommentText} />: <h5 className={"mb-0 " + commentCSS.h5mod}>{props.comment}</h5>}                           
                        </div>
                    </div>                    
                </div>
            </div>
        </>
    )
}