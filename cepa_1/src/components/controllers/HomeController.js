// @ is an alias to /src
import Mapview from '../views/Mapview.vue';
import Eventinfo from '../views/Eventinfo.vue';
import { VDaterange } from "vuetify-daterange-picker";
import "vuetify-daterange-picker/dist/vuetify-daterange-picker.css";
// import L from 'leaflet';
export default {
    name: 'home',
    components: {
        'Mapview': Mapview,
        'Eventinfo': Eventinfo,
        'v-daterange': VDaterange
    },
    data() {
        return {
            date1: '2015-03-01',
            date2: '2015-05-01',
            // tpoints: [],
            points: [],
            point: {},
            range: {},
            all_colors: ['red', '#CCCC00', '#FFA500', '#1E90FF', '#32CD32', '#8A2BE2'],
            categories: [],
            cat_descr: [],
            curval: 0,
            parent_cat: '',
        };
    },
    // watch: {
    //     tpoints: function() {
    //         var ids = this.tpoints.map(obj => { return obj.crimemeta });
    //         this.$axios.post('http://cepa.glassociates.engineering:8080/locationquery/mass_locator/', ids).then(response => {
    //             var resp = response.data;
    //             this.points = resp.map(obj => {
    //                 var hg = {};
    //                 hg['crimemeta'] = obj.crimemeta;
    //                 hg['gps'] = [obj.latitude, obj.longitude];
    //                 return hg;
    //             });
    //         });
    //     }
    // },
    mounted() {
        this.FetchByDate();
        this.getAllEvents();
    },
    methods: {
        FetchByDate() {
            var data = { start: this.date1, end: this.date2 };
            this.$axios.get(this.appConfig.$api_url + 'events/by_date', { params: data }).then(response => {
                this.points = response.data;
            });
        },
        grabinfo(point) {
            this.point = point;
            // this.$refs.event_stuff.getEventinfo();
        },
        updateValues() {
            this.points = [];
            this.FetchByDate();
        },
        getAllEvents() {
            if (!this.curval)
                this.$axios.get(this.appConfig.$api_url + 'eventTypes').then(response => {
                    this.categories = response.data;
                    this.cat_descr = response.data.map((inst) => { return inst.description; });
                });
            this.FetchByDate();
            this.curval = !this.curval;
        },
        getSubEvents(type_id, parent_cat) {
            if (this.curval) {
                this.$axios.get(this.appConfig.$api_url + 'eventTypes/sub_events', { params: { event_type_id: type_id } }).then(response => {
                    this.categories = response.data;
                    this.cat_descr = response.data.map((inst) => { return inst.description; });
                    this.parent_cat = parent_cat;
                    var data = { start: this.date1, end: this.date2, event_type_id: type_id };
                    this.$axios.get(this.appConfig.$api_url + 'events/by_date_and_event_type', { params: data }).then(response => {
                        this.points = response.data;
                    });
                });

            }
            this.curval = !this.curval;
        }
    }
};