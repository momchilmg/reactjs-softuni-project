import { useContext } from "react";
import commentCSS from "../../css/Bio.module.css"
import { CommentsContext } from "./CommentsContext";
import CommentButton from "./CommentButton"
import { GlobalContext } from "../context/GlobalContext";

export default function CommentDelete({ setDeletePopup, id }) {

    const [comments, setComments] = useContext(CommentsContext)
    const [authorizedUser, setAuthorizedUser] = useContext(GlobalContext)[1]
    
    const options = {
        method: 'DELETE',
        headers: { 
            'X-Authorization': authorizedUser.accessToken,
            'Content-Type': 'application/json'
        }
    }
    
    function Delete() {
        fetch(`http://localhost:3030/data/comments/${id}`, options)
        .then(response => response.json())
        .then(data => {     
            if(data._deletedOn != undefined)
                setComments(comments.filter(function (comment) { return comment._id !== id }))
            else
                console.log(data.code + " " + data.message)
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
                    height: "100px",
                    minWidth: "300px",
                    backgroundColor: "white",
                    zIndex: 3,
                    right: "35%",
                    left: "35%",
                    top: "20%",
                    width: "30%"
                }}
            >
                <div style={{paddingTop: "1%", textAlign: "center"}}>The selected comment will be deleted. Please, confirm!</div>
                <CommentButton css={commentCSS.confirmDelete} click={Delete} name="Delete" />
                <CommentButton css={commentCSS.cancelDelete} click={() => setDeletePopup(false)} name="Cancel" />
            </div>
        </>
    )
}