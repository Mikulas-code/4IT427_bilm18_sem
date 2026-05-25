import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import type { Coordinates } from "../types/Bird";

interface BirdMapProps {
  location: Coordinates;
  name: string;
}

export function BirdMap({ location, name }: BirdMapProps) {
  return (
    <MapContainer
      center={[location.lat, location.lng]}
      zoom={13}
      className="w-full h-128 rounded-lg"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[location.lat, location.lng]}>
        <Popup>{name}</Popup>
      </Marker>
    </MapContainer>
  );
}
