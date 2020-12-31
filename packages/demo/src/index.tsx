import React from "react"
import ReactDOM from "react-dom"
import App from "./app"
import { Map as MapConfig } from "@mappette/core"
import { longitude, latitude } from "@mappette/reference/lib/defs/epsg4326"
import api from "@mappette/maplibre-gl"

const map: MapConfig = {
    center: {
        x: longitude(10),
        y: latitude(43),
        crs: "EPSG:4326",
    },
    resolution: 78000,
    layers: [
        {
            type: "osm",
            id: "osm",
            name: "osm",
        },
    ],
}

ReactDOM.render(<App map={map} api={api} />, document.getElementById("app"))
