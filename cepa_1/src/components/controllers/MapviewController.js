import L from 'leaflet';


export default {
    name: 'Mapview',
    components: {},
    data() {
        return {
            url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
            zoom: 10,
            center: [0.3476, 32.5825],
            bounds: null,
            content: [],
            all_colors: ['red', 'yellow', 'orange', 'blue', 'green', 'violet'],
            colours: {
                // "Violence against civilians": L.icon({
                //     iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
                //     shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',

                //     iconSize: [25, 41],
                //     iconAnchor: [12, 41],
                //     popupAnchor: [1, -34],
                //     shadowSize: [41, 41]
                // }),
                // "Protests": L.icon({
                //     iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
                //     shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',

                //     iconSize: [25, 41],
                //     iconAnchor: [12, 41],
                //     popupAnchor: [1, -34],
                //     shadowSize: [41, 41]
                // }),
                // "Riots": L.icon({
                //     iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
                //     shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',

                //     iconSize: [25, 41],
                //     iconAnchor: [12, 41],
                //     popupAnchor: [1, -34],
                //     shadowSize: [41, 41]
                // }),
                // "Strategic developments": L.icon({
                //     iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
                //     shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',

                //     iconSize: [25, 41],
                //     iconAnchor: [12, 41],
                //     popupAnchor: [1, -34],
                //     shadowSize: [41, 41]
                // }),
                // "Battles": L.icon({
                //     iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
                //     shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',

                //     iconSize: [25, 41],
                //     iconAnchor: [12, 41],
                //     popupAnchor: [1, -34],
                //     shadowSize: [41, 41]
                // }),
                // "Explosions/Remote violence": L.icon({
                //     iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
                //     shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',

                //     iconSize: [25, 41],
                //     iconAnchor: [12, 41],
                //     popupAnchor: [1, -34],
                //     shadowSize: [41, 41]
                // }),
            },
            cur: [],
        };
    },
    props: ['points', 'cats', 'curval'],
    watch: {
        points: function() {
            this.points.map((obj, index) => { this.getSubEvent(obj, index); });
            this.cats.map((inst, index) => { this.make_color(inst, index); });
        },
        // cats: function() {
        //     this.cats.map((inst, index) => { this.make_color(inst, index); });
        // }
    },

    methods: {
        zoomUpdated(zoom) {
            this.zoom = zoom;
        },
        centerUpdated(center) {
            this.center = center;
        },
        boundsUpdated(bounds) {
            this.bounds = bounds;
        },
        getSubEvent(point, index) {
            let data = { 'sub_event_id': point.sub_event };
            if (this.curval) {
                this.$axios.get(this.appConfig.$api_url + 'subevents/by_sub_event', { params: data }).then(response => {
                    this.$set(this.cur, index, response.data.e_type.description);
                });
            } else {
                this.$axios.get(this.appConfig.$api_url + 'subevents/by_sub_event', { params: data }).then(response => {
                    this.$set(this.cur, index, response.data.description);
                });
            }

        },
        pointClick(point) {
            this.$emit('pointClicked', point);
        },
        make_color(inst, index) {
            // this.colours = {};
            let color_choice = this.all_colors[index];
            let url_link = `https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color_choice}.png`;
            let color_obj = L.icon({
                iconUrl: url_link,
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',

                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            });
            this.colours[inst] = color_obj;
            // console.log(this.colours);
        }
    }
};