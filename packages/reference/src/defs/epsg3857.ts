import { CoordinateReferenceSystem } from "../index"
import { Range, range } from "../range"

export type EPSG_3857 = CoordinateReferenceSystem & {
    id: "EPSG:3857"
    extent: {
        minX: -20037508.3427892
        minY: -20037508.3427892
        maxX: 20037508.3427892
        maxY: 20037508.3427892
    }
}

export type MercatorCoordinate = Range<
    EPSG_3857["extent"]["minX"],
    EPSG_3857["extent"]["maxX"]
>

export function mercatorCoordinate(x: number): MercatorCoordinate {
    return range(x, -20037508.3427892, 20037508.3427892)
}
