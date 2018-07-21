<style scoped>
	#view-displayer {
		height: 100%;
	}

	#make-it-white {
		color: white;
	}

	#make-it-black {
		color: black;
	}
</style>

<template>

<v-app>
    <v-navigation-drawer persistent :mini-variant="miniVariant" :clipped="clipped" v-model="drawer" enable-resize-watcher fixed app>

        <v-toolbar flat color="primary">
            <v-list>
                <v-list-tile>
                    <v-list-tile-title class="title" id="make-it-white">
                        Menu
                    </v-list-tile-title>
                </v-list-tile>
            </v-list>
        </v-toolbar>

        <v-list>
            <v-list-tile value="true" v-for="(item, i) in items" :key="i">
                <v-list-tile-action id="make-it-black">
                    <v-icon v-html="item.icon"></v-icon>
                </v-list-tile-action>
                <v-list-tile-content id="make-it-black">
                    <v-list-tile-title v-text="item.title"></v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-navigation-drawer>
    <v-toolbar app :clipped-left="clipped" flat color="primary">
        <v-toolbar-side-icon @click.stop="drawer = !drawer" id="make-it-white"></v-toolbar-side-icon>
        <v-toolbar-title v-text="title" id="make-it-white"></v-toolbar-title>
    </v-toolbar>
    <v-content id="view-displayer">
        <router-view/>
    </v-content>
</v-app>

</template>

<script>

export default {
    data() {
            return {
                clipped: false,
                drawer: false,
                fixed: false,
                items: [{
                    icon: 'chat',
                    title: 'Chat'
                }, {
                    icon: 'history',
                    title: 'History'
                }, {
                    icon: 'info',
                    title: 'App Info'
                }],
                miniVariant: false,
                title: 'Tinder for Software Lads'
            }
        },
        name: 'App'
}

</script>
