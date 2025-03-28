import commentCSS from "../../css/Bio.module.css"
import CommentButton from "./CommentButton";
import CommentEditArea from "./CommentEditArea";
import { useContext, useEffect, useState } from "react";
import { CommentsContext, NewSetCommentContext } from "./CommentsContext";
import { LoginContext } from "../context/LoginContext";

export default function CommentNew() {
    const [comments, setComments] = useContext(CommentsContext)
    const setNew = useContext(NewSetCommentContext)[0]
    const setFromComment = useContext(NewSetCommentContext)[1]
    const setCommentsLength = useContext(NewSetCommentContext)[2]
    const setCommentsLastCreated = useContext(NewSetCommentContext)[3]
    const setHaveNoMore = useContext(NewSetCommentContext)[4]
    const memberId = useContext(NewSetCommentContext)[5]
    const [commentText, setCommentText] = useState("")
    const [authorizedUser, setAuthorizedUser] = useContext(LoginContext)[1]

    const options = {
        method: 'POST',
        headers: {
            'X-Authorization': authorizedUser.accessToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "author": authorizedUser.username,
            "text": encodeURIComponent(commentText),
            "memberId": + memberId
        })
    }

    function SaveComment() {
        if (commentText.trim() === '') {
            setNew(false)
            return
        }
        fetch(`http://localhost:3030/data/comments/`, options)
            .then(response => response.json())
            .then(data => {
                setFromComment(0)
                setHaveNoMore(false)
                setCommentsLastCreated(data._createdOn)
                setCommentsLength(2)
                setComments([data])
                setNew(false)
            })
            .catch(error => {
                console.log(error.message)
            });
    }

    return (
        <>
            <div style={{
                position: "fixed",
                height: "100%",
                width: "100%",
                left: 0,
                top: 0,
                backgroundColor: "rgba(9, 30, 62, .85)",
                zIndex: 2,
                margin: 0
            }}
            >
            </div>
            <div style={{
                position: "fixed",
                height: "150px",
                minWidth: "470px",
                zIndex: 3,
                right: "35%",
                left: "35%",
                top: "20%",
                width: "30%",
                backgroundColor: "aliceblue"
            }}
            >
                <div className="col-lg-12">
                    <center><h5>New comment</h5></center>
                    <div className="bg-light">
                        <div className="d-flex align-items-center mb-2">
                            <i className="bi bi-geo-alt fs-1 text-primary"></i>
                            <div className="text-start col-lg-12">
                                <CommentEditArea id="textArea-1" comment="" setCommentText={setCommentText} />
                            </div>
                        </div>
                        <CommentButton css={commentCSS.newCommentCancelButton} click={() => setNew(false)} name="Cancel" />
                        <CommentButton css={commentCSS.newCommentSaveButton + " " + commentCSS.beGreen} click={SaveComment} name="Save" />
                    </div>
                </div>
            </div>
        </>
    )
}