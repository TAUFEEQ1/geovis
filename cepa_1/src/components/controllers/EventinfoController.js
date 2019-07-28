export default {
    name: 'Eventinfo',
    components: {},
    props: ['point'],
    data() {
        return {
            actor1: '',
            actor2: '',
            sub_event: '',
            category: 'Click event to view',
            conflict_info: '',
            location_data: '',
            nodata: true,
            media_data: '',
        };
    },
    watch: {
        "point.id": {
            handler() {
                this.getEventinfo();
                this.nodata = false;
            }
        }
    },
    methods: {
        getActorGroup() {
            let data = { 'group_id': this.point.actors_group };
            this.$axios.get(this.appConfig.$api_url + 'groups/by_group', { params: data }).then(response => {
                this.actor1 = response.data.actor1.name;
                this.actor2 = response.data.actor2.name;
            });
        },
        getSubEvent() {
            let data = { 'sub_event_id': this.point.sub_event };
            this.$axios.get(this.appConfig.$api_url + 'subevents/by_sub_event', { params: data }).then(response => {
                this.sub_event = response.data.description;
                this.category = response.data.e_type.description;
            });
        },
        getConflictinfo() {
            let data = { 'conflict_id': this.point.conflict };
            this.$axios.get(this.appConfig.$api_url + 'conflicts/conflict_details', { params: data }).then(response => {
                this.conflict_info = response.data.description;
            });
        },
        getLocationInfo() {
            let data = { 'location_id': this.point.location };
            this.$axios.get(this.appConfig.$api_url + 'locations/location_details', { params: data }).then(response => {
                this.location_data = response.data.name;
            });
        },
        getMediaInfo() {
            let data = { 'media_id': this.point.media };
            this.$axios.get(this.appConfig.$api_url + 'media/media_details/', { params: data }).then(response => {
                this.media_data = response.data.description;
            });
        },
        getEventinfo() {
            this.getActorGroup();
            this.getConflictinfo();
            this.getSubEvent();
            this.getLocationInfo();
            this.getMediaInfo();
        }
    }
};