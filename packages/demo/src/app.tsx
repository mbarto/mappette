import React, { useState } from "react"
import Map from "@mappette/react"
import { Map as MapConfig, MapApi } from "@mappette/core"
import { MapEventViewChanged } from "@mappette/core/lib/api"
import { longitude, latitude } from "@mappette/reference/lib/defs/epsg4326"

type AppProps = {
    map: MapConfig
    api: MapApi
}

const App: React.FC<AppProps> = ({ api, map }) => {
    const [resolution, setResolution] = useState(156543.03)
    const [center, setCenter] = useState({ x: 10, y: 43 })
    const config: MapConfig = {
        ...map,
        center: {
            ...map.center,
            x: longitude(center.x),
            y: latitude(center.y),
        },
        resolution,
    }
    const zoomIn = () => setResolution((r) => r / 2)
    const zoomOut = () => setResolution((r) => r * 2)
    const viewChanged = (evt: MapEventViewChanged) => {
        setResolution(evt.resolution)
        setCenter({
            x: evt.center.x,
            y: evt.center.y,
        })
    }
    return (
        <>
            <button onClick={zoomIn}>Zoom +</button>
            <button onClick={zoomOut}>Zoom -</button>
            <div>
                {center.x}, {center.y}, {resolution}
            </div>
            <Map
                api={api}
                map={config}
                width={1000}
                height={500}
                onViewChanged={viewChanged}
            />
        </>
    )
}

export default App
