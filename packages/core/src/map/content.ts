export type LayerId = string
export type LayerType = string

export type Layer = {
    type: LayerType
    id: LayerId
    name: string
}

export type WMSLayer = Layer & {
    type: "wms"
    url: URL
}

export type OSMLayer = Layer & {
    type: "osm"
}

export type MapContent = {
    layers: Layer[]
}
