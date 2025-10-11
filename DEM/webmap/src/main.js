//import { useGsiTerrainSource } from 'maplibre-gl-gsi-terrain';
import { useGsiTerrainSource } from 'https://www.unpkg.com/maplibre-gl-gsi-terrain@2.2.2/dist/terrain.js';
const gsiTerrainSource = useGsiTerrainSource(maplibregl.addProtocol);
// MapLibre GL JSのMapインスタンスを初期化＝地図画面を作成
const map = new maplibregl.Map({
    container: 'map',
    zoom: 12.5,
    center: [138.7, 35.32],
    minzoom: 5,
    maxzoom: 18,
    pitch: 70,
    maxPitch: 100,
    style: {
        version: 8,
		projection: {
			type: 'globe',
        },
        sources: {
            terrain: gsiTerrainSource,
            seamlessphoto: {
                type: 'raster',
                tiles: [
                    'https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg',
                ],
                maxzoom: 18,
                tileSize: 256,
                attribution:
                    '<a href="https://maps.gsi.go.jp/development/ichiran.html">地理院タイル</a>',
            },
        },
        layers: [
            {
                id: 'seamlessphoto',
                source: 'seamlessphoto',
                type: 'raster',
            },
        ],
        terrain: {
            source: 'terrain',
            exaggeration: 1.2,
        },
    },
});