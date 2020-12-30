import { MapApi, Center, EPSG_4326, Layer, Resolution } from "@mappette/core"
import { MapEventType } from "@mappette/core/lib/api"
import {
    AnyLayer,
    LngLat,
    Map as MapLibreMap,
    MapEventType as MapLibreEventType,
    MapboxEvent,
} from "maplibre-gl"

const EQUATOR_LENGTH = 40075.016686 * 1000
const ZOOM_ZERO_RESOLUTION = EQUATOR_LENGTH / 256.0

function getCenter(c: Center): LngLat {
    switch (c.crs.id) {
        case EPSG_4326.id:
            return new LngLat(c.x, c.y)
        default:
            throw new Error(`Unsupported crs: ${c.crs}`)
    }
}

function getZoom(r: Resolution): number {
    return Math.log(ZOOM_ZERO_RESOLUTION / r) * Math.LOG2E
}

function getResolution(z: number): Resolution {
    return ZOOM_ZERO_RESOLUTION / Math.pow(2, z)
}

function getSource(layer: Layer) {
    switch (layer.type) {
        case "osm":
            return {
                osm: {
                    type: "raster",
                    tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
                    tileSize: 256,
                    attribution:
                        'Map tiles by <a target="_top" rel="noopener" href="https://tile.openstreetmap.org/">OpenStreetMap tile servers</a>, under the <a target="_top" rel="noopener" href="https://operations.osmfoundation.org/policies/tiles/">tile usage policy</a>. Data by <a target="_top" rel="noopener" href="http://openstreetmap.org">OpenStreetMap</a>',
                },
            }
        default:
            return {}
    }
}

function getSources(layers: Layer[]) {
    return layers.reduce((sources, l: Layer) => {
        return {
            ...sources,
            ...getSource(l),
        }
    }, {})
}

function getLayer(layer: Layer): AnyLayer {
    switch (layer.type) {
        case "osm":
            return {
                id: "osm",
                type: "raster",
                source: "osm",
            }
        default:
            throw new Error(`Unsupported layer type ${layer.type}`)
    }
}

function getLayers(layers: Layer[]) {
    return layers.map(getLayer)
}

type LibraryEventType = keyof MapLibreEventType

function apiToMapLibre(evt: keyof MapEventType): LibraryEventType[] {
    switch (evt) {
        case "viewchanged":
            return ["moveend"]
        default:
            return []
    }
}

const api: MapApi = {
    create: (config, container) => {
        const { center, resolution, layers } = config
        const map = new MapLibreMap({
            container,
            style: {
                version: 8,
                sources: getSources(layers),
                layers: getLayers(layers),
            },
            center: getCenter(center),
            zoom: getZoom(resolution),
        })
        return {
            destroy: () => {
                map.remove()
            },
            update: (config) => {
                const newZoom = getZoom(config.resolution)
                if (newZoom !== map.getZoom()) {
                    map.setZoom(newZoom)
                }
            },
            on(evt, listener) {
                const apiListener = (e: MapboxEvent) => {
                    switch (evt) {
                        case "viewchanged":
                            listener({
                                type: "viewchanged",
                                center: {
                                    x: map.getCenter().lng,
                                    y: map.getCenter().lat,
                                    crs: EPSG_4326,
                                },
                                resolution: getResolution(map.getZoom()),
                            })
                            break
                        default:
                            throw new Error(
                                `Received event ${e.type}, expected ${evt}`,
                            )
                    }
                }
                apiToMapLibre(evt).forEach((e) => {
                    map.on(e, apiListener)
                })
                return () => {
                    apiToMapLibre(evt).forEach((e) => {
                        map.off(evt, apiListener)
                    })
                }
            },
        }
    },
}

export default api
