import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

export default function InfoMessage() {
    
    const [openInfoPopup, setOpenInfoPopup] = useContext(GlobalContext)[2]

    const CloseInfoForm = () => {
        setOpenInfoPopup(null)
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
                    margin: 0,
                    backdropFilter: "blur(3px)"
                }}
            >
            </div>
            <div style={{
                    position: "fixed",
                    minWidth: "400px",
                    zIndex: 3,
                    left: "50%",
                    transform: "translate(-50%, 0)",
                    top: "20%",
                    width: "30%",
                    backgroundColor: "aliceblue"
                }}
            >
                <div className="col-lg-12">
                    <div className="appointment-form h-100 d-flex flex-column justify-content-center text-center p-5">
                        <h3 className="text-white mb-4">Information</h3>
                        <div style={{minHeight: "50px", width: "100%", color: "black", whiteSpace: "pre-wrap", fontSize: "1.3rem"}} dangerouslySetInnerHTML={{__html: openInfoPopup}}>
                        </div>
                        <button className="btn btn-dark w-50 py-3" style={{ marginTop: "5%", left: "50%", position: "relative", transform: "translate(-50%, 0)"}} onClick={CloseInfoForm}>OK</button>
                    </div>
                </div>
            </div>
        </>
    )
}