<template>
    <v-card>
        <v-img
          :src="require('../../assets/cepa.png')"
          aspect-ratio="4.0"
        ></v-img>

        <v-card-title primary-title>
          <div>
            <h4 class="headline mb-0">Event Date: {{point.event_date}}</h4>
            <h4 class="headline mb-0" v-if="nodata">Click Event for details</h4>
          </div>
        </v-card-title>
        <v-card-text v-if="!nodata">
            <ul style="list-style:none;text-align:left; overflow-y:auto; max-height:300px;">
                <li>
                  <b>Source:</b>{{media_data}}
                </li>
                <li>
                    <b>Actors :</b> {{actor1}} , {{actor2}}
                </li>
                <transition name="fade">
                  <li>
                      <b>Location Info:</b> {{location_data}}
                  </li>
                </transition>
                <li>
                    <b>Major Category:</b> {{category}}<br>
                    <b>Sub Event Type:</b> {{sub_event}}
                </li>
                <transition name="slide-fade">
                  <li>
                      <b>Conflict Info:</b> {{conflict_info}}
                  </li>
                </transition>
            </ul>
        </v-card-text>
      </v-card>
</template>
<style scoped>
  ul li{
    margin-top:2%;
  }
  .fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
<script src="../controllers/EventinfoController.js"></script>