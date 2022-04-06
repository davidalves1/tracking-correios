<template>
  <q-layout ref="layout" view="hHr LpR lFf">
    <q-toolbar slot="header" color="warning">
  	  <q-toolbar-title>
  	    Rastreio Correios
  	  </q-toolbar-title>
    </q-toolbar>

    <q-field label="Código de Rastreio" class="content">
      <q-input v-model="trackingCode" />
      <q-btn color="primary" class="button" @click="getTracking">Rastrear</q-btn>
      <q-btn color="primary" class="button" @click="clearResult">Limpar</q-btn>
    </q-field>

    <status-list :tracking="tracking" v-if="hasTrackingStatus" />
  </q-layout>
</template>

<script>
import {
  Loading,
  QLayout,
  QToolbar,
  QToolbarTitle,
  QField,
  QInput,
  QBtn,
  QSpinnerGears,
  Toast
} from 'quasar'
import StatusList from './StatusList.vue'
import { getTracking } from '../services/postmonApi'

const TRACKING_CODE_LENGTH = 13

export default {
  components: {
    QLayout,
    QToolbar,
    QToolbarTitle,
    QField,
    QInput,
    QBtn,
    QSpinnerGears,
    Toast,
    StatusList
  },
  data () {
    return {
      trackingCode: '', // YC059602439BR QB610653136BR
      tracking: []
    }
  },
  computed: {
    hasTrackingStatus () {
      return !!this.tracking.length
    }
  },
  methods: {
    async getTracking () {
      if (this.trackingCode.length !== TRACKING_CODE_LENGTH) {
        this.showError('Informe um código de rastreio válido')
        return
      }

      try {
        Loading.show({
          delay: 50
        })
        const { historico } = await getTracking(this.trackingCode)
        this.tracking = historico
      }
      catch (error) {
        const errorCode = (error.response && error.response.status) || 0
        this.showError(`Não foi possível obter o histório de rastreio. [${errorCode}]`)
      }
      finally {
        Loading.hide()
      }
    },
    clearResult () {
      this.tracking = []
    },
    showError (msg) {
      Toast.create.negative({
        html: msg,
        timeout: 2000
      })
    }
  }
}
</script>

<style>
  .content {
    max-width: 768px;
    text-align: center;
    margin: 1rem;
  }

  .button {
    margin: 1rem;
  }
</style>
