import TeamMember from "./TeamMember"
import { useState, useEffect } from "react";
import Spinner from "../Spinner";
import { useParams, useNavigate } from "react-router";
import Hero from "../bars/HeroBar";
import Comment from "../comments/Comment";
import bioCSS from "../../css/Bio.module.css"
import { CommentsContext } from "../comments/CommentsContext";
import CommentButton from "../comments/CommentButton";
import CommentNew from "../comments/CommentNew";

export default function TeamMemberDetails() {
    const [isPending, setIsPending] = useState(true)
    const [haveNoMore, setHaveNoMore] = useState(false)
    const [member, setMember] = useState([])
    const [fromComment, setFromComment] = useState(0)
    const [comments, setComments] = useState([])
    const [commentsLength, setCommentsLength] = useState(0)
    const [commentsLastId, setCommentsLastId] = useState(-1)
    const [commentsWhereLastId, setCommentsWhereLastId] = useState(null)
    const { id } = useParams()
    const navigation = useNavigate()
    const [btnText, setBtnText] = useState("Load more comments")
    const pageSize = 3
    const [toNew, setNew] = useState(false)

    useEffect(() => {
        document.getElementsByClassName("baseHeroBar")[0].scrollIntoView()
        fetch(`http://localhost:3030/data/members/?where=id%3D${id}`)
        .then(response => response.json())
        .then(data => {
            setMember(...data)
            loadComments()
            setIsPending(false)
        })
        .catch(error => {
            console.log(error.message)
            setTimeout(() => {navigation("/")},1000)
        })
    }, [])

    useEffect(
        () => {
            if (comments.length < commentsLength) {
                setFromComment(0)
                setCommentsWhereLastId(encodeURIComponent(" AND id>") + commentsLastId)
            }
            setCommentsLength(comments.length)
    }, [comments])

    function loadComments() {
        setHaveNoMore(true)
        fetch(`http://localhost:3030/data/comments/?where=` + encodeURIComponent("memberId=" + id) + (commentsWhereLastId || "") + `&offset=${fromComment}&pageSize=${pageSize}`)
        .then(response => response.json())
        .then(data => {          
            if (data.length == 0) {
                setBtnText("No more comments") 
                return
            }
            setComments([...comments, ...data])
            setCommentsLastId(data[data.length - 1].id)
            setFromComment(fromComment + data.length)
            if (data.length == pageSize) {
                setHaveNoMore(false)
            } else {
                setBtnText("No more comments")
            }
        })
        .catch(error => {
            console.log(error.message)
        });
    }

    return (
        <>
            {isPending && <Spinner />}
            <Hero name="Our Dentist" url="team" one="true" nameMember={member.name}/>
            <div className="container-fluid py-5">
            <div className="container">
            <div className="row g-5">
            <TeamMember name={member.name} work={member.work} img={member.img} id={member.id} one="true" />
            <div className="col-xl-8 col-lg-6" data-wow-delay="0.1s">
                <div className="bg-light rounded h-100 p-5">
                    <div className="d-flex align-items-center mb-2">
                        <i className="bi bi-geo-alt fs-1 text-primary me-3"></i>
                        <div className="text-start">
                            <h3>Biography:</h3>
                            <h5 className={"mb-0 " + bioCSS.textJustify}>{member.bio}</h5>
                            <p>
                                <span>Updated on {member.updated}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <h2 style={{marginBottom: 0}}>Comments:</h2>  
            <CommentsContext.Provider value={[comments, setComments]}>      
                {comments.map(data => <Comment key={"comment" + data.id} id={data._id} author={data.author} comment={decodeURIComponent(data.text)}  date={data.created} />)}
            </CommentsContext.Provider>    
            {toNew && <CommentNew />}
            <CommentButton css={"col-lg-2 " + bioCSS.loadCommentsButton + (haveNoMore ? " " + bioCSS.loadCommentsButtonDisabled : "")} click={loadComments} name={btnText} />
            <CommentButton css={"col-lg-2 " + bioCSS.newCommentButton} click={() => setNew(true)} name="New comment" />
            </div>
            </div>
            </div>
        </>
    )
}