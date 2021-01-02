import { point2D } from "../index"
import { transform } from "../transform"

test("transform EPSG:4326 to EPSG:3857", () => {
    const transformed = transform(point2D(10, 43, "EPSG:4326"), "EPSG:3857")
    expect(transformed.crs).toBe("EPSG:3857")
    expect(transformed.x).toBeCloseTo(1113195, 0)
    expect(transformed.y).toBeCloseTo(5311972, 0)
})

test("transform EPSG:3857 to EPSG:4326", () => {
    const transformed = transform(
        point2D(1113195, 5311972, "EPSG:3857"),
        "EPSG:4326",
    )
    expect(transformed.crs).toBe("EPSG:4326")
    expect(transformed.x).toBeCloseTo(10, 0)
    expect(transformed.y).toBeCloseTo(43, 0)
})

test("transform EPSG:4326 to EPSG:32632", () => {
    const transformed = transform(point2D(9, 43, "EPSG:4326"), "EPSG:32632")
    expect(transformed.crs).toBe("EPSG:32632")
    expect(transformed.x).toBeCloseTo(500000, 0)
    expect(transformed.y).toBeCloseTo(4760815, 0)
})
