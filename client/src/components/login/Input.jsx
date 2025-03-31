export default function Input(props) {
    return (
        <>
            <div className="col-12 col-sm-12">
                <label style={{float: "left", color: "white"}}>{props.label}</label>
                <input type={props.type} id={props.id} name={props.name} className="form-control bg-light border-0" placeholder={props.placeholder} onKeyUp={props.onKeyUp} autoComplete={props.autocomplete} defaultValue={props.value} style={{height: 55 + 'px'}} />
            </div>
        </>
    )
}