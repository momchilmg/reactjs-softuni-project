import commentCSS from "../../css/Bio.module.css"
import CommentButton from "./CommentButton";
import CommentEditArea from "./CommentEditArea";

export default function CommentNew() {
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
                <div className={"col-lg-12 " + commentCSS.commentItem}>                
                    <div className={"bg-light p-3 " + commentCSS.commentBody}>
                        {/*<CommentButton css={commentCSS.commentDeleteButton + (toEdit ? " " + commentCSS.beGreen : "")} click={(toEdit ? SetEdit : CommentDel)} name={(toEdit ? "Cancel" : "Delete")} />
                        <CommentButton css={commentCSS.commentEditButton} click={(!toEdit && SetEdit) || (toEdit && SaveEdit)} name={(toEdit ? "Save" : "Edit")} />*/}
                        <div className="d-flex align-items-center mb-2">
                            <i className="bi bi-geo-alt fs-1 text-primary"></i>
                            <div className="text-start col-lg-12">
                                <CommentEditArea id="textArea-1" comment="" setCommentText={null} />                           
                            </div>
                        </div>                    
                    </div>
                </div>
            </div>
        </>
    )
}