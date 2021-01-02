import fs from "fs"
import proj4 from "proj4"

try {
    var args = process.argv.slice(2)
    if (args.length < 1) {
        console.error("wkt2ts <crs_code>")
        process.exit(1)
    }
    const code = args[0]
    const epsgCode = `EPSG:${code}`
    const wkt = fs.readFileSync(`./wkt/EPSG-CRS-${code}.wkt`, "utf8")
    const [
        ,
        minY,
        minX,
        maxY,
        maxX,
    ] = /BBOX\[([-0-9.]+),([-0-9.]+),([-0-9.]+),([-0-9.]+)]/g.exec(wkt)
    const defs = JSON.parse(fs.readFileSync(`./proj/defs.json`, "utf8"))
    const def = defs[epsgCode]
    proj4.defs(epsgCode, def)
    const p1 = proj4("EPSG:4326", epsgCode).forward([
        parseFloat(minX),
        parseFloat(minY),
    ])
    const p2 = proj4("EPSG:4326", epsgCode).forward([
        parseFloat(maxX),
        parseFloat(maxY),
    ])
    const tsDef = `import { CoordinateReferenceSystem } from "../index"
import proj4 from "proj4"

export type EPSG_${code} = CoordinateReferenceSystem & {
    id: "EPSG:${code}"
    extent: {
        minX: ${p1[0]}
        minY: ${p1[1]}
        maxX: ${p2[0]}
        maxY: ${p2[1]}
    }
}

export const EPSG_${code}_DEF: EPSG_${code} = {
    id: "EPSG:${code}",
    extent: {
        minX: ${p1[0]},
        minY: ${p1[1]},
        maxX: ${p2[0]},
        maxY: ${p2[1]},
    }
}
proj4.defs("EPSG:${code}", "${def}")`
    fs.writeFileSync(`./src/defs/epsg${code}.ts`, tsDef)
} catch (err) {
    console.error("ERROR: ", err)
}
