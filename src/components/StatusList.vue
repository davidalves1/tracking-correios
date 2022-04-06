<template>
  <q-list class="content">
    <q-list-header>Histórico</q-list-header>
    <q-item-separator />
    <q-item v-for="track in tracking" :key="track.id">
      <q-item-side left label><small>{{track.data}}</small></q-item-side>
      <q-item-main><small>{{track.local}}</small> <br> {{track.situacao}}</q-item-main>
    </q-item>
    <q-item-separator />
  </q-list>
</template>

<script>
import {
  QList,
  QListHeader,
  QItem,
  QItemSide,
  QItemMain,
  QItemSeparator
} from 'quasar'

export default {
  components: {
    QList,
    QListHeader,
    QItem,
    QItemSide,
    QItemMain,
    QItemSeparator
  },
  props: {
    tracking: Array
  }
}
</script>
