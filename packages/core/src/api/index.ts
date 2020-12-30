import { Center, Resolution } from "../map/view"
import { Map as MapConfig } from "../map"

export type MapContainer = string

export type MapEventType = {
    viewchanged: MapEventViewChanged
    generic: MapEvent
}

export type MapEvent = MapEventViewChanged

export type MapEventViewChanged = {
    type: "viewchanged"
    resolution: Resolution
    center: Center
}

export type MapEventListener<T extends MapEvent> = (evt: T) => void
export type DetachEventListener = () => void

export type MapInstance = {
    update: (config: MapConfig) => void
    destroy: () => void
    on<T extends keyof MapEventType>(
        event: T,
        listener: MapEventListener<MapEventType[T]>,
    ): DetachEventListener
}

export type MapApi = {
    create: (config: MapConfig, container: MapContainer) => MapInstance
}
