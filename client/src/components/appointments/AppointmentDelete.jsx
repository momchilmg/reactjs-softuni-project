import { useContext } from "react";
import commentCSS from "../../css/Bio.module.css"
import CommentButton from "./../comments/CommentButton"
import { GlobalContext } from "../context/GlobalContext";

export default function AppointmentDelete({ setForDelete, deleteAppointement }) {

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
                <div style={{ paddingTop: "1%", textAlign: "center" }}>The selected appointment will be deleted. Please, confirm!</div>
                <CommentButton css={commentCSS.confirmDelete} click={deleteAppointement} name="Delete" />
                <CommentButton css={commentCSS.cancelDelete} click={() => setForDelete(false)} name="Cancel" />
            </div>
        </>
    )
}