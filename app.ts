import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  const lat = c.req.header("x-vercel-ip-latitude");
  const lng = c.req.header("x-vercel-ip-longitude");
  const city = c.req.header("x-vercel-ip-city");
  const country = c.req.header("x-vercel-ip-country");

  return c.html(`
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>お前はここだ</title>
  <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    h1 {
      color: white;
      font-size: 3em;
      margin: 20px;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    }
    #map {
      width: 90vw;
      max-width: 800px;
      height: 70vh;
      border-radius: 10px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    }
    .info {
      color: white;
      margin-top: 20px;
      font-size: 1.2em;
      text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
    }
  </style>
</head>
<body>
  <h1>📍 お前はここだ</h1>
  <div id="map"></div>
  <div class="info">
    📌 ${city}, ${country}<br>
    🌐 緯度: ${lat}, 経度: ${lng}
  </div>

  <script src="https://unpkg.com/leaflet"></script>
  <script>
    const lat = ${lat};
    const lng = ${lng};

    const map = L.map("map").setView([lat, lng], 15);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    const marker = L.circleMarker([lat, lng], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 10
    }).addTo(map);

    marker.bindPopup("<b>ここにいます！</b>").openPopup();
    map.flyTo([lat, lng], 16);
  </script>
</body>
</html>
  `);
});

export default app;
