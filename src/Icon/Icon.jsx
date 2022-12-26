import { ICON_MAP } from "./weatherIconMap";

function getIconUrl(iconCode) {
    return ICON_MAP.get(iconCode)
}

const hours = new Date().getHours()
const isDayTime = hours > 7 && hours < 20

export default function Icon(props) {
    const {iconCode} = props;
    return (
        <div className='weather-icon' style={{ backgroundImage: `url(/weather_icons/${isDayTime ? '' : 'nt_'}${getIconUrl(iconCode)}.svg)` }}></div>
    )
}