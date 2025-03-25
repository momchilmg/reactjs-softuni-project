import commentCSS from "../../css/Bio.module.css"

export default function CommentDelete({ childSetDelete, id, comments, setComments }) {
    
    function Cancel() {
        childSetDelete(false)
    }
    
    function Delete() {
        fetch(`http://localhost:3030/data/comments/${id}`, {method: "delete", headers: {"X-Admin": ""}})
        .then(response => response.json())
        .then(data => {     
            console.log(id)       
            setComments(comments.filter(function (comment) { return comment._id !== id }))
            console.log(comments)
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
                width: "300px",
                backgroundColor: "white",
                zIndex: 3,
                right: "35%",
                left: "35%",
                top: "20%",
                width: "30%"
                }}
            >
                <div style={{paddingTop: "1%", textAlign: "center"}}>The selected comment will be deleted. Please, confirm!</div>
                <button className={"btn btn-primary py-2 px-4 " + commentCSS.confirmDelete} onClick={Delete}>Delete</button>
                <button className={"btn btn-primary py-2 px-4 " + commentCSS.cancelDelete} onClick={Cancel}>Cancel</button>
            </div>
        </>
    )
}