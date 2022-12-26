export default function Point(props) {
    const {type, value, leftOffset, direction} = props;

    let style = {};

    if(leftOffset) {
        style = {
            left: leftOffset + "%"
        }
    }

    return (
        <div style={style} data-direction={direction} className={'day-' + type + ' direction-' + direction}><span>{value}&deg;</span></div>
    )
}