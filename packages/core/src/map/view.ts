import { ReferencedPoint } from "../reference"

export type Center = ReferencedPoint

export type Resolution = number

export type MapView = {
    center: Center
    resolution: Resolution
}
