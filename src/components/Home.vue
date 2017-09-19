<template>
  <q-layout ref="layout" view="hHr LpR lFf">
    <q-toolbar slot="header" color="warning">
  	  <q-toolbar-title>
  	    Rastreio Correios
  	  </q-toolbar-title>
    </q-toolbar>
    
    <q-field label="Código de Rastreio" class="content">
      <q-input v-model="tracking_code" />
      <q-btn color="primary" class="button" @click="getTracking">Rastrear</q-btn>
      <q-btn color="primary" class="button" @click="clearResult">Limpar</q-btn>
    </q-field>

    <q-list class="content" v-if="tracking.length !== 0">
      <q-list-header>Histórico</q-list-header>
      <q-item-separator />
      <q-item v-for="track in tracking" :key="track.id">
        <q-item-side left label><small>{{track.data}}</small></q-item-side>
        <q-item-main><small>{{track.local}}</small> <br> {{track.situacao}}</q-item-main>
      </q-item>
      <q-item-separator />
    </q-list>
  </q-layout>
</template>

<script>
import {
  QLayout,
  QToolbar,
  QToolbarTitle,
  QField,
  QInput,
  QBtn,
  QList,
  QListHeader,
  QItem,
  QItemSide,
  QItemMain,
  QItemSeparator,
  Toast
} from 'quasar'

export default {
  components: {
    QLayout,
    QToolbar,
    QToolbarTitle,
    QField,
    QInput,
    QBtn,
    QList,
    QListHeader,
    QItem,
    QItemSide,
    QItemMain,
    QItemSeparator,
    Toast
  },
  data () {
    return {
      tracking_code: '',
      tracking: []
    }
  },
  methods: {
    getTracking () {
      if (this.tracking_code === '' || this.tracking_code.length !== 13) {
        this.showError('Informe um código de rastreio válido')
        return
      }

      let uri = `http://api.postmon.com.br/v1/rastreio/ect/${this.tracking_code}`

      let vm = this

      this.$http.get(uri)
        .then((res) => {
          if (res.status !== 200) {
            vm.showError('Não foi possível obter o histório de rastreio')
          }

          vm.tracking = res.data.historico
        })
        .catch((err) => {
          console.log(err)
        })
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
    text-align: center;
    margin: 1rem;
  }

  .button {
    margin: 1rem;
  }
</style>
