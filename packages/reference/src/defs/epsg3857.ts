import { CoordinateReferenceSystem } from "../index"

export type EPSG_3857 = CoordinateReferenceSystem & {
    id: "EPSG:3857"
    extent: {
        minX: -20037508.342789244
        minY: -20048966.1040146
        maxX: 20037508.342789244
        maxY: 20048966.1040146
    }
}

export const EPSG_3857_DEF: EPSG_3857 = {
    id: "EPSG:3857",
    extent: {
        minX: -20037508.342789244,
        minY: -20048966.1040146,
        maxX: 20037508.342789244,
        maxY: 20048966.1040146,
    },
}
