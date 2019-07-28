<template>
	<v-container>
        <div>
            <h2>
                Cepa GeoVis |  <v-btn text @click="getAllEvents" color="success"> All Types </v-btn>
            </h2> 
        </div>
        <v-toolbar>
            
            <v-toolbar-items class="hidden-sm-and-down" v-if="curval">
                <v-btn flat v-for="(category,index) in categories" :key="'k' + category.id" @click="getSubEvents(category.id,category.description)">
                    <svg style="height:10px; width:30px;">
                        <rect y="5" width="25" height="10" :fill="all_colors[index]"/>
                    </svg>
                    {{ category.description.substring(0,24) }}
                </v-btn>
            </v-toolbar-items>
            <v-toolbar-items class="hidden-sm-and-down" v-if="!curval">
                <v-btn flat>
                    <h4>Event Type: {{parent_cat}}</h4>
                </v-btn>
                <v-btn flat v-for="(category,index) in categories" :key="'c' + category.id" aria-disabled="true">
                    
                    <svg style="height:10px; width:30px;">
                        <rect y="5" width="25" height="10" :fill="all_colors[index]"/>
                    </svg>
                    {{ category.description.substring(0,20) }}
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>
        <v-layout row wrap mt-2>
            <Mapview :points="points" style="box-shadow:#888888 2px 4px 5px;" 
            class="md6 mr-1" @pointClicked="grabinfo" :cats ="cat_descr" :curval="curval"></Mapview>
            <v-flex md5>
                <Eventinfo :point="point"></Eventinfo>
                <div class="datectrl text-md-left">
                    Start Date:<input v-model="date1" type="date"><br>

                    End Date:<input v-model="date2" type="date">
                    <v-btn @click="updateValues" class="primary">Get Events</v-btn>
                </div>
            </v-flex>
        </v-layout>
        <v-layout row wrap mt-1>
            
        </v-layout>
	</v-container>
</template>
<style scoped>
input {
  border: 1px solid #c4c4c4;
  border-radius: 5px;
  background-color: #fff;
  padding: 3px 5px;
  box-shadow: inset 0 3px 6px rgba(0,0,0,0.1);
  width: 190px;
}
.datectrl{
    box-shadow: #888888 2px 5px 5px;
    font-size:14px;
    padding:10px;
}
</style>
<script src="../controllers/HomeController.js"></script>
