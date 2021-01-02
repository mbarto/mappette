import { x, y } from "./defs"
import { CoordinateReferenceSystemId, ReferencedPoint2D } from "./index"
import proj4 from "proj4"

export function transform<
    F extends CoordinateReferenceSystemId,
    T extends CoordinateReferenceSystemId
>(point: ReferencedPoint2D<F>, to: T): ReferencedPoint2D<T> {
    const transformed = proj4(point.crs, to).forward(point)
    return {
        x: x<T>(transformed.x, to),
        y: y<T>(transformed.y, to),
        crs: to,
    }
}
