<template>
    <div id="inspire">
    
        <header-menu></header-menu>
        <v-content>
            <div class="container-fluid" style="padding:0">
                <router-view />
            </div>
        </v-content>
        <footer-comp></footer-comp>
        <v-snackbar :value="message.snackbar" @input="hideMessage" :color="message.color" :bottom="message.bottom" :right="message.right">
            {{message.text}}
            <v-btn text @click="hideMessage">{{$t('close')}}</v-btn>
        </v-snackbar>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import FooterComp from './components/FooterComp.vue';

import HeaderMenu from './components/HeaderMenu.vue';



    export default {
  components: { HeaderMenu, FooterComp },

        data: () => ({
            drawer: null,
        }),

        computed: {
            ...mapState({
                user: state => state.user,
                message: state => state.message,
            }),
        },

        methods: {
            logout() {
                this.$store.commit({type: 'LOGOUT_USER'})
                this.$router.push({path: 'login'})
            },
            setLocale(locale) {
                this.$store.commit('UPDATE_SETTINGS_FIELD', { key: 'locale', value: locale })
            },
            hideMessage() {
                this.$store.commit('HIDE_MESSAGE')
            },
        },

    }
</script>

