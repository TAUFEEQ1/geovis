<template>
	<l-map style="height:80vh; width:100vh;"
		:zoom="zoom" :center="center" 
		@update:zoom="zoomUpdated" 
		@update:center="centerUpdated" @update:bounds="boundsUpdated">
		<l-tile-layer :url="url"></l-tile-layer>
		<l-marker v-for="(point,index) in points" :lat-lng="[point.latitude,point.longitude]" 
        :key="'t'+index" :icon="colours[cur[index]]" @click="pointClick(point)">
		</l-marker>
	</l-map>
</template>
<style scoped>
</style>
<script src="../controllers/MapviewController.js"></script>