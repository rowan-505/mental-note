import { useEffect, useMemo, useState } from 'react';
import L from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import {
  AJOU_CENTER,
  NAVER_MAP_URL,
  PLACE_CATEGORY_LABELS,
  PLACE_SETTING_LABELS,
  type AjouPlace,
  type MoodKey,
  type PermaKey,
} from '../data/ajouPlaces';
import type { Mission } from '../data/missions';
import { pickRecommendedAjouPlace, type PlaceRecommendationParams } from '../lib/placeRecommendation';

const MAP_ZOOM = 15;
const MAP_HEIGHT = 152;

const placeMarkerIcon = L.divIcon({
  className: '',
  html: '<div style="width:14px;height:14px;border-radius:50%;background:#7C3AED;border:2px solid #fff;box-shadow:0 1px 4px rgba(36,26,68,0.35);"></div>',
  iconSize: [14, 14],
  iconAnchor: [7, 7],
});

const centerMarkerIcon = L.divIcon({
  className: '',
  html: '<div style="width:10px;height:10px;border-radius:50%;background:#14B8A6;border:2px solid #fff;box-shadow:0 1px 3px rgba(36,26,68,0.25);"></div>',
  iconSize: [10, 10],
  iconAnchor: [5, 5],
});

type RecenterMapProps = {
  lat: number;
  lng: number;
  zoom: number;
};

function RecenterMap({ lat, lng, zoom }: RecenterMapProps) {
  const map = useMap();

  useEffect(() => {
    map.setView([lat, lng], zoom, { animate: true });
  }, [lat, lng, zoom, map]);

  return null;
}

export type AjouMiniMapCardProps = {
  focusAreas: PermaKey[];
  mood: MoodKey;
  mbtiType: string;
  currentMission?: Mission;
  recommendationMode?: 'perma' | 'mbti';
  selectedPerma?: PermaKey;
};

export function AjouMiniMapCard({
  focusAreas,
  mood,
  mbtiType,
  currentMission,
  recommendationMode = 'perma',
  selectedPerma,
}: AjouMiniMapCardProps) {
  const recommendationParams = useMemo<PlaceRecommendationParams>(
    () => ({
      focusAreas,
      mood,
      mbtiType,
      missionPerma: currentMission?.perma,
      recommendationMode,
      selectedPerma,
    }),
    [focusAreas, mood, mbtiType, currentMission?.perma, recommendationMode, selectedPerma],
  );

  const [recentPlaceIds, setRecentPlaceIds] = useState<string[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<AjouPlace>(() =>
    pickRecommendedAjouPlace(recommendationParams),
  );

  useEffect(() => {
    setRecentPlaceIds([]);
    setSelectedPlace(pickRecommendedAjouPlace(recommendationParams));
  }, [recommendationParams, currentMission?.id]);

  const mapCenter = useMemo(
    () => [selectedPlace.lat, selectedPlace.lng] as [number, number],
    [selectedPlace.lat, selectedPlace.lng],
  );

  const openNaverMap = () => {
    window.open(selectedPlace.naverUrl ?? NAVER_MAP_URL, '_blank', 'noopener,noreferrer');
  };

  const recommendAnother = () => {
    const nextPlace = pickRecommendedAjouPlace({
      ...recommendationParams,
      currentPlaceId: selectedPlace.id,
      currentPlaceCategory: selectedPlace.category,
      excludePlaceIds: recentPlaceIds,
      preferVariety: true,
    });

    setRecentPlaceIds((current) => [...current, selectedPlace.id].slice(-5));
    setSelectedPlace(nextPlace);
  };

  return (
    <section className="rounded-3xl border border-[#E7DFF7] bg-white p-4 shadow-sm">
      <div>
        <h2 className="text-sm font-semibold text-[#241A44]">Recommended near Ajou</h2>
        <p className="mt-0.5 text-[11px] leading-snug text-[#7C719A]">
          Matched to your mission, mood, and style.
        </p>
        <p className="mt-1 text-[10px] text-[#7C719A]">Demo recommendation · matched to your reflection</p>
      </div>

      <div className="ajou-mini-map relative z-0 mt-3 overflow-hidden rounded-xl border border-[#E7DFF7]">
        <MapContainer
          center={mapCenter}
          zoom={MAP_ZOOM}
          scrollWheelZoom={false}
          zoomControl={false}
          dragging
          doubleClickZoom={false}
          touchZoom={false}
          boxZoom={false}
          keyboard={false}
          className="relative z-0 h-[152px] w-full rounded-xl"
          style={{ height: MAP_HEIGHT, width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <RecenterMap lat={selectedPlace.lat} lng={selectedPlace.lng} zoom={MAP_ZOOM} />
          <Marker position={[AJOU_CENTER.lat, AJOU_CENTER.lng]} icon={centerMarkerIcon}>
            <Popup>Ajou University</Popup>
          </Marker>
          <Marker position={[selectedPlace.lat, selectedPlace.lng]} icon={placeMarkerIcon}>
            <Popup>{selectedPlace.title}</Popup>
          </Marker>
        </MapContainer>
      </div>

      <div className="mt-3">
        <p className="text-sm font-semibold text-[#241A44]">{selectedPlace.title}</p>
        <p className="mt-0.5 text-[11px] font-semibold text-[#7C3AED]">
          {PLACE_CATEGORY_LABELS[selectedPlace.category]}
        </p>
        <p className="mt-0.5 text-xs leading-snug text-[#7C719A]">{selectedPlace.description}</p>
      </div>

      <div className="mt-2 flex flex-wrap gap-2">
        <span className="rounded-full bg-[#CCFBF1] px-2.5 py-0.5 text-[11px] font-semibold text-[#0F766E]">
          {selectedPlace.duration}
        </span>
        <span className="rounded-full bg-[#F1ECFF] px-2.5 py-0.5 text-[11px] font-semibold text-[#7C719A]">
          {PLACE_SETTING_LABELS[selectedPlace.setting]}
        </span>
      </div>

      <p className="mt-2 rounded-xl bg-[#F8F5FF] px-3 py-2 text-[11px] leading-snug text-[#7C719A]">
        {selectedPlace.missionHint}
      </p>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={recommendAnother}
          className="rounded-2xl border border-[#E7DFF7] bg-[#F8F5FF] py-2.5 text-xs font-bold text-[#7C3AED] transition-colors hover:bg-[#EDE9FE]"
        >
          Recommend another
        </button>
        <button
          type="button"
          onClick={openNaverMap}
          className="rounded-2xl bg-[#EDE9FE] py-2.5 text-xs font-bold text-[#7C3AED] transition-colors hover:bg-[#DDD6FE]"
        >
          Open Naver Map ↗
        </button>
      </div>
    </section>
  );
}
