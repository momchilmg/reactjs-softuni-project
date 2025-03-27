import { useContext, useState } from "react"
import commentCSS from "../../css/Bio.module.css"
import CommentDelete from "./CommentDelete"
import CommentEditArea from "./CommentEditArea"
import { CommentsContext } from "./CommentsContext"
import CommentButton from "./CommentButton"

export default function Comment(props) {
    const [openDeletePopup, setDeletePopup] = useState(false)
    const [toEdit, setEdit] = useState(false)
    const [commentText, setCommentText] = useState(props.comment)
    const [comments, setComments] = useContext(CommentsContext)

    function CommentDel() {
        setDeletePopup(!openDeletePopup)
    }

    function SetEdit() {
        setEdit(!toEdit)
    }

    const options = {
        method: 'PATCH',
        headers: { 
            'X-Admin': 'admin@abv.bg',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            "text": encodeURIComponent(commentText)
        })
    }

    function SaveEdit() {
        if (commentText.trim() === '') {
            setEdit(false)
            return
        }
        fetch(`http://localhost:3030/data/comments/${props.id}`, options)
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
            {openDeletePopup && <CommentDelete setDeletePopup={setDeletePopup} key={props.id} id={props.id} />}
            <div className={"col-lg-12 " + commentCSS.commentItem}>                
                <div className={"bg-light p-3 " + commentCSS.commentBody}>
                    <CommentButton css={commentCSS.commentDeleteButton + (toEdit ? " " + commentCSS.beGreen : "")} click={(toEdit ? SetEdit : CommentDel)} name={(toEdit ? "Cancel" : "Delete")} />
                    <CommentButton css={commentCSS.commentEditButton} click={(!toEdit && SetEdit) || (toEdit && SaveEdit)} name={(toEdit ? "Save" : "Edit")} />
                    <h5>{props.author}</h5>
                    <span>Published on {getGoodDate(props.date)}</span>
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

function getGoodDate(timestamp) {
    const date = new Date(timestamp)
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'Europe/Sofia',
        hour: '2-digit',
        minute: '2-digit'
    }
    
    return date.toLocaleDateString('en-GB', options)
  }