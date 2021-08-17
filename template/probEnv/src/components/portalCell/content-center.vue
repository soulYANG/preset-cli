<template>
  <div class="content-inner">
    <overviewCell />
    <mapCell />
    <calendarCell />
  </div>
</template>

<script>
import overviewCell from '@/components/portalCell/ModuleOverview/overview'
import mapCell from '@/components/portalCell/ModuleMap/map'
import calendarCell from '@/components/portalCell/ModuleCalendar/calendar'
export default {
  data(){
    return{
    }
  },
  props:[],
  components:{
    calendarCell,
    mapCell,
    overviewCell
  },
  methods:{

  },
  mounted() {

  }
}
</script>
<style lang="less" scoped>
.content-inner{
  position: relative;
}
</style>