export default function LHTemp(props) {
    const {type, value} = props;
    return (
        <div className={'temp--' + type}>{value}&deg;</div>
    )
}