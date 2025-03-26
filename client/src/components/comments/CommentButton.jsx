export default function CommentButton(props) {
    return (
        <>
            <button className={"btn btn-primary py-2 px-4 " + props.css} onClick={props.click}>{props.name}</button>
        </>
    )
}