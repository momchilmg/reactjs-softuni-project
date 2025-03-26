import bioCSS from "../../css/Bio.module.css"

export default function CommentEditArea({id, comment, setCommentText}) {
    function OnChangeText() {
        setCommentText(document.getElementById(id).value)
    }

    return (
        <>
            <textarea id={id} className={"commentTextArea " + bioCSS.textArea} defaultValue={comment} onKeyUp={OnChangeText}></textarea>
        </>
    )
}