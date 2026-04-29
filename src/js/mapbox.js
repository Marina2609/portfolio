mapboxgl.accessToken =
  "pk.eyJ1Ijoic2FoYXY1MDAiLCJhIjoiY2t1Y3g0bnZqMTUxczJxcXZ3NmtqajdtMyJ9.5d40H3jkosojmMLd3oAhhQ";
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/light-v10",
  center: [2.3364, 48.86091],
  zoom: 16,
});
var marker1 = new mapboxgl.Marker({ color: "black", width: "80px" })
  .setLngLat([2.3364, 48.86091])
  .addTo(map);
var marker2 = new mapboxgl.Marker({ color: "grey" })
  .setLngLat([2.3333, 48.8602])
  .addTo(map);
var marker3 = new mapboxgl.Marker({ color: "grey" })
  .setLngLat([2.3397, 48.8607])
  .addTo(map);
var marker4 = new mapboxgl.Marker({ color: "grey" })
  .setLngLat([2.333, 48.8619])
  .addTo(map);
var marker5 = new mapboxgl.Marker({ color: "grey" })
  .setLngLat([2.3365, 48.8625])
  .addTo(map);
const nav = new mapboxgl.NavigationControl({
  visualizePitch: true,
});
map.addControl(nav, "top-right");
