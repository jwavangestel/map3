<template>
  <main>
    <l-map ref="map" v-model:zoom="zoom" v-model:center="center" :useGlobalLeaflet="false">
      <LTileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
          layer-type="base"
          name="OpenStreetMap"
        />
      <l-geo-json 
        :geojson="perceelgrens"
        :options="perceelgrensOptions"
        :options-style="perceelgrensStyleFunction"
      />
      <l-geo-json 
        :geojson="wateren"
        :options="waterenOptions"
        :options-style="waterenStyleFunction"
      />
      <l-geo-json 
        :geojson="perceel"
        :options="perceelOptions"
        :options-style="perceelStyleFunction"
      />
      <l-geo-json 
        :geojson="perceel_dennenbos"
        :options="perceel_dennenbosOptions"
        :options-style="perceelDennenbosStyleFunction"
      />
      <l-geo-json 
        :geojson="perceel_heide"
        :options="perceel_heideOptions"
        :options-style="perceelHeideStyleFunction"
      />
      <l-geo-json 
        :geojson="perceel_hakhout"
        :options="perceel_hakhoutOptions"
        :options-style="perceelHakhoutStyleFunction"
      />
      <l-geo-json 
        :geojson="perceel_boomgaard"
        :options="perceel_boomgaardOptions"
        :options-style="perceelBoomgaardStyleFunction"
      />
      <l-geo-json 
        :geojson="perceel_hooiland"
        :options="perceel_hooilandOptions"
        :options-style="perceelHooilandStyleFunction"
      />
      <l-geo-json 
        :geojson="perceel_kerkhof"
        :options="perceel_kerkhofOptions"
        :options-style="perceelKerkhofStyleFunction"
      />
      <l-geo-json 
        :geojson="perceel_tuin"
        :options="perceel_tuinOptions"
        :options-style="perceelTuinStyleFunction"
      />
      <l-geo-json 
        :geojson="perceel_weiland"
        :options="perceel_weilandOptions"
        :options-style="perceelWeilandStyleFunction"
      />
      <l-geo-json 
        :geojson="bouw"
        :options="bouwOptions"
        :options-style="bouwStyleFunction"
      />
    </l-map>
  </main>
</template>


<script setup>
import "leaflet/dist/leaflet.css"
import { LMap, LTileLayer, LMarker, LGeoJson } from "@vue-leaflet/vue-leaflet"
import { ref } from "vue"

import arcades from "@/data/arcades.json"
import perceelgrens from "@/data/perceelgrens.json"
import perceel from "@/data/perceel.json"
import perceel_dennenbos from "@/data/perceel_dennenbos.json"
import perceel_heide from "@/data/perceel_heide.json"
import perceel_hakhout from "@/data/perceel_hakhout.json"
import perceel_boomgaard from "@/data/perceel_boomgaard.json"
import perceel_hooiland from "@/data/perceel_hooiland.json"
import perceel_kerkhof from "@/data/perceel_kerkhof.json"
import perceel_tuin from "@/data/perceel_tuin.json"
import perceel_weiland from "@/data/perceel_weiland.json"
import perceel_bebouwing from "@/data/perceel_bebouwing.json"

import bouw from "@/data/bouw.json"

import wateren from "@/data/wateren.json"




const  perceelStyleFunction = {   fillColor: "#d1c40f",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8}

  const  perceelDennenbosStyleFunction = {   fillColor: "#31714c",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8}

  const  perceelHeideStyleFunction = {   fillColor: "#9152d5",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8}

    const  perceelBoomgaardStyleFunction = {   fillColor: "#e8c030",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8}

    const  perceelHakhoutStyleFunction = {   fillColor: "#72a35b",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8}

    const  perceelHooilandStyleFunction = {   fillColor: "#99995a",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8}

    const  perceelKerkhofStyleFunction = {   fillColor: "#d53ccd",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8}

    const  perceelTuinStyleFunction = {   fillColor: "#aa6e05",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8}

    const  perceelWeilandStyleFunction = {   fillColor: "#35ac10",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8}

    const  perceelBebouwingStyleFunction = {   fillColor: "#969696",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8}

    const  waterenStyleFunction = {   fillColor: "#44afef",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8}


    const  bouwStyleFunction = {   fillColor: "#460156",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8}



const  perceelgrensStyleFunction = {color:  'gray'}

let zoom = ref(12.48)
let center = ref([51.45322, 5.359482])

//const wateren_pkl = await fetch("http://localhost:8080/geoserver/eghv/ows?service=WFS&typenames=eghv:wateren&version=2.0.0&outputformat=application/json&request=GetFeature", {
//    "cache": "default", "credentials": "omit", "headers": { "Accept": "*/*", "Accept-Language": "en-US,en;q=0.9", "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.3.1 Safari/605.1.15"},
//    "method": "GET", "mode": "cors","redirect": "follow", "referrer": "http://localhost:3000/", "referrerPolicy": "strict-origin-when-cross-origin"})
//  const data = await wateren_pkl.json();
//  const wateren = data;


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