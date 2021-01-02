import { EPSG_4326, EPSG_4326_DEF } from "./epsg4326"
import { EPSG_3857, EPSG_3857_DEF } from "./epsg3857"
import { EPSG_32632, EPSG_32632_DEF } from "./epsg32632"
import { CoordinateReferenceSystemId } from "../index"
import { Range, range } from "../range"

export type CoordinateReferenceSystems = {
    "EPSG:4326": EPSG_4326
    "EPSG:3857": EPSG_3857
    "EPSG:32632": EPSG_32632
}

export const CoordinateReferenceSystemsDefs = {
    "EPSG:4326": EPSG_4326_DEF,
    "EPSG:3857": EPSG_3857_DEF,
    "EPSG:32632": EPSG_32632_DEF,
}

export type CoordinateX<T extends CoordinateReferenceSystemId> = Range<
    CoordinateReferenceSystems[T]["extent"]["minX"],
    CoordinateReferenceSystems[T]["extent"]["maxX"]
>

export type CoordinateY<T extends CoordinateReferenceSystemId> = Range<
    CoordinateReferenceSystems[T]["extent"]["minY"],
    CoordinateReferenceSystems[T]["extent"]["maxY"]
>
export function x<T extends CoordinateReferenceSystemId>(
    x: number,
    crs: T,
): CoordinateX<T> {
    return range(
        x,
        CoordinateReferenceSystemsDefs[crs].extent.minX,
        CoordinateReferenceSystemsDefs[crs].extent.maxX,
    )
}

export function y<T extends CoordinateReferenceSystemId>(
    y: number,
    crs: T,
): CoordinateY<T> {
    return range(
        y,
        CoordinateReferenceSystemsDefs[crs].extent.minY,
        CoordinateReferenceSystemsDefs[crs].extent.maxY,
    )
}
