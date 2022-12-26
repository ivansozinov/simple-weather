export default function Point(props) {
    const {type, value, leftOffset} = props;

    let style = {};

    if(leftOffset) {
        style = {
            left: leftOffset + "%"
        }
    }

    return (
        <div style={style} className={'day-' + type}><span>{value}&deg;</span></div>
    )
}