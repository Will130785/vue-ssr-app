<template>
    <div id="app">
        <div class="main">
            <h1>{{title}}</h1>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: 'App',

        metaInfo: {
            meta: [
                { charset: 'utf-8' },
            ]
        },

        computed: {
            ...mapGetters({
                title: 'title',
            })
        },
        created () {
          console.log('Server side')
        },
        mounted () {
          console.log('Client side')
        }
    };
</script>
