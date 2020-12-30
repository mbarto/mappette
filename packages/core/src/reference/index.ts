export type Point2D = {
    x: number
    y: number
}

export type Point3D = Point2D & {
    z: number
}

export type Point = Point2D | Point3D

export enum CoordinateReferenceSystemType {
    GEOGRAPHIC,
    PROJECTED,
}

export type CoordinateReferenceSystemId = string

export interface CoordinateReferenceSystem {
    type: CoordinateReferenceSystemType
    id: CoordinateReferenceSystemId
}

export const EPSG_4326: CoordinateReferenceSystem = {
    type: CoordinateReferenceSystemType.GEOGRAPHIC,
    id: "EPSG:4326",
}

export const EPSG_3857: CoordinateReferenceSystem = {
    type: CoordinateReferenceSystemType.PROJECTED,
    id: "EPSG:3857",
}

export type ReferencedPoint = Point & {
    crs: CoordinateReferenceSystem
}
