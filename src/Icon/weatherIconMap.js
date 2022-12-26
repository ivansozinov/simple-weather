export const ICON_MAP = new Map()

addMapping([0, 1], "sunny")
addMapping([2], "mostlycloudy")
addMapping([3], "cloudy")
addMapping([45, 48], "fog")
addMapping([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82], "rain")
addMapping([71, 73, 75], "sleet")
addMapping([77, 85, 86], "snow")
addMapping([95], "chancetstorms")
addMapping([95, 96, 99], "tstorms")

function addMapping(values, icon) {
  values.forEach(value => {
    ICON_MAP.set(value, icon)
  })
}