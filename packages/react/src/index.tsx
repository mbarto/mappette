import React, { useEffect, useRef } from "react"
import { Map as MapConfig, MapApi, MapInstance } from "@mappette/core"
import { MapEventViewChanged } from "@mappette/core/lib/api"

type MapProps = {
    map: MapConfig
    api: MapApi
    width: number
    height: number
    onViewChanged?: (evt: MapEventViewChanged) => void
}

const Map: React.FC<MapProps> = ({
    map,
    api,
    width,
    height,
    onViewChanged: onViewChanged = () => {},
}) => {
    const { resolution } = map
    const mapRef = useRef<MapInstance>()
    useEffect(() => {
        mapRef.current = api.create(map, "map")
        mapRef.current.on("viewchanged", onViewChanged)
        return () => {
            if (mapRef.current) {
                mapRef.current.destroy()
                mapRef.current = undefined
            }
        }
    }, [])
    useEffect(() => {
        if (mapRef.current) {
            mapRef.current.update(map)
        }
    }, [resolution])
    return (
        <div
            id="map"
            style={{
                position: "absolute",
                width: `${width}px`,
                height: `${height}px`,
                top: "100px",
                left: "100px",
            }}
        ></div>
    )
}

export default Map
