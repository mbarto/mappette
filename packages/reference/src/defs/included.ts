import { CoordinateReferenceSystemId } from "../index"
import { EPSG_4326_ID, EPSG_4326, EPSG_4326_DEF } from "./epsg4326"
import { EPSG_3857_ID, EPSG_3857, EPSG_3857_DEF } from "./epsg3857"
import { EPSG_32632_ID, EPSG_32632, EPSG_32632_DEF } from "./epsg32632"

export type CoordinateReferenceSystems = {
    EPSG_4326_ID: EPSG_4326
    EPSG_3857_ID: EPSG_3857
    EPSG_32632_ID: EPSG_32632
}

export const CoordinateReferenceSystemsDefs = {
    "EPSG:4326": EPSG_4326_DEF,
    "EPSG:3857": EPSG_3857_DEF,
    "EPSG:32632": EPSG_32632_DEF,
}
