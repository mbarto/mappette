import React from "react"
import ReactDOM from "react-dom"
import App from "./app"
import { EPSG_4326, Map as MapConfig } from "@mappette/core"
import api from "@mappette/maplibre-gl"

const map: MapConfig = {
    center: {
        x: 10,
        y: 43,
        crs: EPSG_4326,
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
