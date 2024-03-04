<template>
  <main>
    <feature-viewer v-if="currentFeature !== null" :feature="currentFeature" />
    <l-map ref="map" v-model:zoom="zoom" v-model:center="center" :useGlobalLeaflet="false">
      <LTileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
          layer-type="base"
          name="OpenStreetMap"
        />

        <l-geo-json v-for="(data, type, index) in geoJsonData" :key="index"
          :geojson="data"
          :options="geoJsonOptions"
          :options-style="getStyleOptionsFunction(type)"
        />
    </l-map>
  </main>
</template>


<script setup>
import "leaflet/dist/leaflet.css"
import { LMap, LTileLayer, LMarker, LGeoJson, LPopup } from "@vue-leaflet/vue-leaflet"
import { ref, onMounted, watch, computed } from 'vue'
import EventService from '@/services/EventService.js'
import { useFeatureStore } from "@/stores/featureStore";
import FeatureViewer from '@/components/FeatureViewer.vue';

const geoJsonData = ref({});

const zoom = ref(12.48);
const center = ref([51.45322, 5.359482]);

const dataTypes = [
    'weiland',
    'boomgaard',
    'bebouwing',
    'dennenbos',
    'hakhout',
    'hooiland',
    'kerkhof',
    'tuin',
    'heide',
    'bouwland'
];

const defaultOptions = {
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8
};

const fillColors = {
  weiland: '#35ac10',
  boomgaard: '#e8c030',
  bebouwing: '#d1c40f',
  dennenbos: '#31714c',
  hakhout: '#72a35b',
  hooiland: '#99995a',
  kerkhof: '#d53ccd',
  tuin: '#aa6e05',
  heide: '#9152d5',
  bouwland: '#d1c40f',
  wateren: '#44afef',
  bouw: '#460156',
};

const getGeoServer = (async (type) => {
  const response = await EventService.getGeoServer(type);
  console.log(response);
  return response.data;
});

const getGeoServerPerceel = (async (type) => {
  const response = await EventService.getGeoServerPerceel(type);
  return response.data;
});

const getStyleOptionsFunction = ((type) => {
  const styleOptions = { ...defaultOptions };
  if (type in fillColors) {
    styleOptions.fillColor = fillColors[type];
  }
  return () => {
    return styleOptions;
  };
});

const featureStore = useFeatureStore();

const currentFeature = computed(() => featureStore.currentFeature );

const layerClick = ((e) => {
  console.log('CLICK!!');
  console.log(e.target.feature);
  featureStore.setCurrentFeature(e.target.feature);
});

const onEachFeature = ((feature, layer) => {
  layer.on({
    click: layerClick,
  })
});

const geoJsonOptions = {
  onEachFeature,
};

onMounted(async () => {
  const promises = [];
  promises.push(getGeoServer('bouw'));
  promises.push(getGeoServer('wateren'));
  promises.push(getGeoServer('perceel'));
  promises.push(getGeoServerPerceel('weiland'));
  promises.push(getGeoServerPerceel('boomgaard'));
  promises.push(getGeoServerPerceel('bebouwing'));
  promises.push(getGeoServerPerceel('dennenbos'));
  promises.push(getGeoServerPerceel('hakhout'));
  promises.push(getGeoServerPerceel('hooiland'));
  promises.push(getGeoServerPerceel('kerkhof'));
  promises.push(getGeoServerPerceel('tuin'));
  promises.push(getGeoServerPerceel('heide'));
  promises.push(getGeoServerPerceel('bouwland'));

  const [ bouw, wateren, perceel, weiland,boomgaard,bebouwing,dennenbos,hakhout,hooiland,kerkhof,tuin,heide,bouwland ] = await Promise.all(promises);
  console.log(bouw);
  geoJsonData.value = {
    bouw,
    wateren,
    perceel,
    weiland,
    boomgaard,
    bebouwing,
    dennenbos,
    hakhout,
    hooiland,
    kerkhof,
    tuin,
    heide,
    bouwland,
  };
  console.log(geoJsonData.value);
});




</script>


<style>
html, body {
  margin: 0;
  padding: 0;
}

main {
  height: 100vh;
  width: 100vw;
}
</style>