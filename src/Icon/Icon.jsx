import { ICON_MAP } from "./weatherIconMap";

function getIconUrl(iconCode) {
    return ICON_MAP.get(iconCode)
  }

export default function Icon(props) {
    const {iconCode} = props;
    return (
        <div className='weather-icon' style={{ backgroundImage: `url(/weather_icons/${getIconUrl(iconCode)}.svg)` }}></div>
    )
}