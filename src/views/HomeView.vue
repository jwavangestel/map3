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
        :geojson="bouwland"
        :options="perceel_bouwlandOptions"
        :options-style="perceelBouwlandStyleFunction"
      />
      <l-geo-json 
        :geojson="dennenbos"
        :options="perceel_dennenbosOptions"
        :options-style="perceelDennenbosStyleFunction"
      />
      <l-geo-json 
        :geojson="heide"
        :options="perceel_heideOptions"
        :options-style="perceelHeideStyleFunction"
      />
      <l-geo-json 
        :geojson="hakhout"
        :options="perceel_hakhoutOptions"
        :options-style="perceelHakhoutStyleFunction"
      />
      <l-geo-json 
        :geojson="boomgaard"
        :options="perceel_boomgaardOptions"
        :options-style="perceelBoomgaardStyleFunction"
      />
      <l-geo-json 
        :geojson="hooiland"
        :options="perceel_hooilandOptions"
        :options-style="perceelHooilandStyleFunction"
      />
      <l-geo-json 
        :geojson="kerkhof"
        :options="perceel_kerkhofOptions"
        :options-style="perceelKerkhofStyleFunction"
      />
      <l-geo-json 
        :geojson="tuin"
        :options="perceel_tuinOptions"
        :options-style="perceelTuinStyleFunction"
      />
      <l-geo-json 
        :geojson="weiland"
        :options="perceel_weilandOptions"
        :options-style="perceelWeilandStyleFunction"
      />
      <l-geo-json 
        :geojson="bouw"
        :options="bouwOptions"
        :options-style="bouwStyleFunction"
      />
    </l-map>
    {{ weiland }}
  </main>
</template>


<script setup>
import "leaflet/dist/leaflet.css"
import { LMap, LTileLayer, LMarker, LGeoJson } from "@vue-leaflet/vue-leaflet"
import { ref, onMounted, watch, computed } from 'vue'
import EventService from '@/services/EventService.js'

import arcades from "@/data/arcades.json"
import perceelgrens from "@/data/perceelgrens.json"
//import perceel from "@/data/perceel.json"
import perceel_dennenbos from "@/data/perceel_dennenbos.json"
import perceel_heide from "@/data/perceel_heide.json"
import perceel_hakhout from "@/data/perceel_hakhout.json"
import perceel_boomgaard from "@/data/perceel_boomgaard.json"
import perceel_hooiland from "@/data/perceel_hooiland.json"
import perceel_kerkhof from "@/data/perceel_kerkhof.json"
import perceel_tuin from "@/data/perceel_tuin.json"
//import perceel_weiland from "@/data/perceel_weiland.json"
import perceel_bebouwing from "@/data/perceel_bebouwing.json"

// import bouw from "@/data/bouw.json"

// import wateren from "@/data/wateren.json"




const  perceelBouwlandStyleFunction = {   fillColor: "#d1c40f",
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

    const  perceelStyleFunction = {   fillColor: "#969696",
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

//const props = defineProps({
//   id: { required: true },
//})

const bouw = ref(null)
const wateren = ref(null)
const perceel = ref(null)
const weiland = ref(null)
const boomgaard = ref(null)
const bebouwing = ref(null)
const dennenbos = ref(null)
const hakhout = ref(null)
const hooiland = ref(null)
const kerkhof = ref(null)
const tuin = ref(null)
const heide = ref(null)
const bouwland= ref(null)

const soort = ["weiland", "boomgaard", "bebouwing", "dennenbos", "hakhout", "hooiland", "kerkhof", "tuin", "heide", "bouwland"]

onMounted(() => {
  // get bouw
    EventService.getGeoServer("bouw")
    .then((response) => {
      bouw.value = response.data

    })
    .catch((error) => {
      console.log(error)
    })

    // get wateren
    EventService.getGeoServer("wateren")
    .then((response) => {
      wateren.value = response.data

    })
    .catch((error) => {
      console.log(error)
    })

    // get percelen
      // get alle percelen
      EventService.getGeoServer("perceel")
    .then((response) => {
      perceel.value = response.data

    })
    .catch((error) => {
      console.log(error)
    })
    for (let i = 0; i < soort.length ; i++) {
      EventService.getGeoServerPerceel(soort[i])
      .then((response) => {
        if (i === 0) {weiland.value = response.data}
        if (i === 1) {boomgaard.value = response.data}
        if (i === 2) {bebouwing.value = response.data}
        if (i === 3) {dennenbos.value = response.data}
        if (i === 4) {hakhout.value = response.data}
        if (i === 5) {hooiland.value = response.data}
        if (i === 6) {kerkhof.value = response.data}
        if (i === 7) {tuin.value = response.data}
        if (i === 8) {heide.value = response.data}
        if (i === 9) {bouwland.value = response.data}


      })
      .catch((error) => {
        console.log(error)
      })
    }
})


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