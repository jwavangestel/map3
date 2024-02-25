import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/geoserver/eghv/ows',
  withCredentials: false,

})

export default {
  getGeoServer(laag) {
    return apiClient.get("?service=WFS&version=1.0.0&request=GetFeature&outputFormat=application%2Fjson&typeName=eghv%3A" + laag)
  },
  getGeoServerPerceel(soort) {
      return apiClient.get("?service=WFS&version=1.0.0&request=GetFeature&outputFormat=application%2Fjson&typeName=eghv%3Aperceel&cql_filter=oat_omschrijving%20=%20%27" + soort + "%27")
    },
 
  getSelection(v_naam, k_naam, kad_plaats, kad_sectie, kad_kavel, ra_of_na, register, folio, datum, plaats, qkaart_nr ) {
      return apiClient.get("/?v_naam=" + v_naam + "&k_naam=" + k_naam + "&kad_plaats=" + kad_plaats  + "&kad_a=" + kad_sectie  + "&kad_nr=" + kad_kavel + "&ra_of_na=" + ra_of_na + "&register=" + register  + "&folio=" + folio + "&qdatum=" + datum  + "&plaats=" + plaats + "&qkaart_nr=" + qkaart_nr)
  },

  getEvent(id) {
    return apiClient.get('?id=' + id)
  },
}