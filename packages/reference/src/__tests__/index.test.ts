import { ReferencedPoint2D } from "../index"
import { longitude, latitude } from "../defs/epsg4326"
import { x, y } from "../defs"

test("EPSG:4326 point ok", () => {
    const point: ReferencedPoint2D<"EPSG:4326"> = {
        crs: "EPSG:4326",
        x: longitude(90),
        y: latitude(90),
    }
    expect(point.x).toBe(90)
    expect(point.y).toBe(90)
})

test("EPSG:3857 point ok", () => {
    const point: ReferencedPoint2D<"EPSG:3857"> = {
        crs: "EPSG:3857",
        x: x(90, "EPSG:3857"),
        y: y(90, "EPSG:3857"),
    }
    expect(point.x).toBe(90)
    expect(point.y).toBe(90)
})

test("EPSG:4326 point out of bounds", () => {
    try {
        const point: ReferencedPoint2D<"EPSG:4326"> = {
            crs: "EPSG:4326",
            x: longitude(200),
            y: latitude(90),
        }
        fail()
    } catch (e) {
        expect(true).toBe(true)
    }
})

test("EPSG:3857 point out of bounds", () => {
    try {
        const point: ReferencedPoint2D<"EPSG:3857"> = {
            crs: "EPSG:3857",
            x: x(20037510, "EPSG:3857"),
            y: y(90, "EPSG:3857"),
        }
        fail()
    } catch (e) {
        expect(true).toBe(true)
    }
})
