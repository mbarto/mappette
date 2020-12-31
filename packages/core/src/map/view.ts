import { ReferencedPoint2D } from "@mappette/reference"

export type Center = ReferencedPoint2D<"EPSG:4326">

export type Resolution = number

export type MapView = {
    center: Center
    resolution: Resolution
}
