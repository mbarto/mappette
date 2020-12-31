import { Range } from "./range"
import { CoordinateReferenceSystems } from "./defs"

export type Point2D = {
    x: number
    y: number
}

export type Point3D = Point2D & {
    z: number
}

export type Point = Point2D | Point3D

export type Bounds = {
    minX: number
    minY: number
    maxX: number
    maxY: number
}

export type CoordinateReferenceSystem = {
    id: string
    extent: Bounds
}

export type CoordinateReferenceSystemId = keyof CoordinateReferenceSystems

export type ReferencedPoint2D<T extends CoordinateReferenceSystemId> = {
    crs: T
    x: Range<
        CoordinateReferenceSystems[T]["extent"]["minX"],
        CoordinateReferenceSystems[T]["extent"]["maxX"]
    >
    y: Range<
        CoordinateReferenceSystems[T]["extent"]["minY"],
        CoordinateReferenceSystems[T]["extent"]["maxY"]
    >
}
