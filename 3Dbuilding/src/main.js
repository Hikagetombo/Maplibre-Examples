// MapLibre GL JSのMapインスタンスを初期化＝地図画面を作成
const map = new maplibregl.Map({
    container: 'map',
    maxZoom:   17.99, // 地図の最大ズームレベル
    style: {
        version: 8,
        sources: {
            /*
            osm: { // OpenStreetMapのタイルデータを定義
                type: 'raster',
                tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
                tileSize: 256,
                attribution:
                    '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
            },
            */
            gsi_vector: {　// 地理院ベクトル
                type: 'vector',
                tiles: ['https://cyberjapandata.gsi.go.jp/xyz/experimental_bvmap/{z}/{x}/{y}.pbf'],
                maxzoom: 16,
                minzoom: 4,
                attribution: "<a href='https://www.gsi.go.jp/' target='_blank'>国土地理院</a>",
            },
        },
        layers: [
            /*
            {// OpenStreetMapのタイルデータを表示
                id: 'osm',
                type: 'raster',
                source: 'osm',
            },
            */
            {
                id: 'building',　// 建物レイヤー
                source: 'gsi_vector',
                'source-layer': 'building',　// buildingを指定して建物のみ表示
                type: 'fill-extrusion',　// fill-extrusionで立体表示
                minzoom: 13,
                maxzoom: 18,
                paint: {
                    'fill-extrusion-color': '#BEE6FF',　// 色を指定
                    'fill-extrusion-height': [
                        'match',　         // 建物の種類によって高さを変える
                        ['get', 'ftCode'], // ftCodeで建物の種類を区別する
                        3101, 10,          // 普通建物
                        3102, 40,          // 堅ろう建物
                        3103, 100,         // 高層建物
                        3111, 10,          // 普通無壁舎
                        3112, 40,          // 堅ろう無壁舎
                        10], // その他
                    'fill-extrusion-opacity': 0.6,　// 不透明度を指定
                },
            },
        ],
    },
    center: [141.354444, 43.061667],
    zoom: 16,
});