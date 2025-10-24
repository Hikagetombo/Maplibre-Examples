//import { useGsiTerrainSource } from 'maplibre-gl-gsi-terrain';
import { useGsiTerrainSource } from 'https://www.unpkg.com/maplibre-gl-gsi-terrain@2.2.2/dist/terrain.js';
const gsiTerrainSource = useGsiTerrainSource(maplibregl.addProtocol);

// PMTilesの、MapLibre GL JS用のプロトコルをグローバルに追加
let protocol = new pmtiles.Protocol();
// addProtocolで、カスタムURLスキーマを使用するときに呼び出される関数を追加する
// pmtiles://~~ が使用されたときに、protocol.tileが呼び出される
maplibregl.addProtocol("pmtiles", protocol.tile);

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
        glyphs: "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
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
            "hyakumeizan": {
              type: "vector",
              // タイルが利用可能な最小ズームレベル
              //minzoom: 2,
              // タイルが利用可能な最大ズームレベル
              //maxzoom: 16,
              // リソースへのURL
              url: "pmtiles://hyakumeizan.pmtiles",
              attribution:
                "© MapTiler",
            },

        },
        layers: [
            {
                id: 'seamlessphoto',
                source: 'seamlessphoto',
                type: 'raster',
            },
            {
                id: "hyakumeizan_points",
                // 塗りつぶされたポリゴン
                type: "circle",
                source: "hyakumeizan",
                // ベクトルタイルソースから使用するレイヤ
                "source-layer": "hyakumeizan_layer",
                paint: {
                    'circle-color': '#0BB1AF',      // ポイントの色
                    'circle-radius': 8,             // ポイントのサイズ
                    'circle-stroke-width': 2,       // ポイントの枠線の太さ
                    'circle-stroke-color': '#fff',  // ポイントの枠線の色
                }
             },
             {
                  id: 'hyakumeizan_labels',
                  type: 'symbol',
                  source: 'hyakumeizan', // ベクトルタイルのソース
                  'source-layer': 'hyakumeizan_layer', // レイヤー名
                  layout: {
                      'icon-image': '', //アイコン画像は使わない
                      'text-font': ['Noto Sans Regular'], // 表示するフォント
                      'text-size': ['interpolate',['linear'],['zoom'],5,8,8,11,15,18], //テキストサイズはズームレベルに応じて指定
                      'text-anchor': 'top', // テキストのアンカーを上部に設定
                      'text-offset': [0, 0.5], // マーカーからの相対的な位置 (Y軸方向に下に1em)
                      'text-field': ['format',['get', 'name'],{'text-color':'#0000FF'}] // '山名'プロパティをテキストとして表示
                  },
                  paint: {
                      'text-color': '#000000',
                      'text-halo-color': '#ffffff', // テキストの縁取り
                      'text-halo-width': 2
                  }
             },
        ],
        terrain: {
            source: 'terrain',
            exaggeration: 1.2,
        },
    },
});