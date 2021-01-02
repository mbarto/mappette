import { CoordinateReferenceSystem } from "../index"
import proj4 from "proj4"

export type EPSG_32632 = CoordinateReferenceSystem & {
    id: "EPSG:32632"
    extent: {
        minX: 166021.44308053964
        minY: 0
        maxX: 534994.6550611362
        maxY: 9329005.182447437
    }
}

export const EPSG_32632_DEF: EPSG_32632 = {
    id: "EPSG:32632",
    extent: {
        minX: 166021.44308053964,
        minY: 0,
        maxX: 534994.6550611362,
        maxY: 9329005.182447437,
    }
}
proj4.defs("EPSG:32632", "+proj=utm +zone=32 +datum=WGS84 +units=m +no_defs")