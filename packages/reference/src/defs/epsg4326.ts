import { CoordinateReferenceSystem } from "../index"
import { Range, range } from "../range"

export type EPSG_4326 = CoordinateReferenceSystem & {
    id: "EPSG:4326"
    extent: {
        minX: -180
        minY: -90
        maxX: 180
        maxY: 90
    }
}

export type Longitude = Range<
    EPSG_4326["extent"]["minX"],
    EPSG_4326["extent"]["maxX"]
>
export function longitude(x: number): Longitude {
    return range(x, -180, 180)
}

export type Latitude = Range<
    EPSG_4326["extent"]["minY"],
    EPSG_4326["extent"]["maxY"]
>
export function latitude(x: number): Latitude {
    return range(x, -90, 90)
}
