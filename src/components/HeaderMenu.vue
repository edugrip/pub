<template>
    <div>


  <!-- Start Site Header Wrap -->
    <header class="tm-site-header">
        <div class="tm-header-menu">
            <div class="container tm-header-menu-container">
                <div class="tm-site-branding">
                    <!-- For Image Logo -->
                    <a href="/" class="tm-logo-link">
                        <img src="../assets/img/asdasdasdlogo.png" alt="" class="tm-logo">
                        <img src="../assets/img/asdasdasdlogo.png" alt="" class="tm-mobile-logo">
                    </a>
                    <!-- For Site Title -->
                    <!-- <span class="tm-site-title">
                    	<a href="index.html">Ocher</a>
                    </span> -->
                </div>
                <nav class="tm-primary-nav tm-section-active">
                    <ul class="tm-primary-nav-list">
                        <li class="menu-item"><a href="/" class="nav-link">HOME</a></li>
                        <li class="menu-item"><a href="#buytoken" class="nav-link">BUY PUBG TOKEN</a></li>
                        <li class="menu-item"><a href="#about" class="nav-link">REFERRAL</a></li>
                        <li class="menu-item"><a href="#roadmap" class="nav-link">ROADMAP</a></li>
                        <li class="menu-item"><a href="swap" class="nav-link">SWAP</a></li>
                        <li class="menu-item"><a href="stake" class="nav-link">STAKE</a></li>
                        <li class="menu-item"><a href="farm" class="nav-link">FARM</a></li>
                        <li class="menu-item"><a href="nftgame" class="nav-link">NFT GAME</a></li>
                        <li class="menu-item"><a href="https://www.bscscan.com/token/0xFeCE7e6c21Adf0Ef172192009C1E1c7DCA33631b" target="_blank" class="nav-link">CONTRACT</a></li>
                        <li class="menu-item"><a href="#" class="nav-link">CONTACT US</a></li>
                    </ul>

                    <!-- <div class="tm-menu-meta">
                    	<button class="tm-btn tm-style1 tm-with-border" data-toggle="modal" data-target="#tm-login">LOGIN</button>
                    	<button class="tm-btn tm-style1 tm-with-border" data-toggle="modal" data-target="#tm-signup">SIGNUP</button>
                    </div> -->
                </nav>
            </div><!-- .tm-header-menu-container -->
        </div><!-- .tm-header-menu -->
    </header><!-- .tm-site-header -->
    </div>
</template>

<script>
    import { mapState } from 'vuex';

    export default {
        name: "LoginForm",

        data() {
            return {
                valid: false,

                email: 'disasterovich@mail.ru',
                password: 'zstebgtu',

                passwordRules: [
                    v => !!v || 'Password is required',
                    //v => v.length <= 10 || 'Name must be less than 10 characters',
                ],

                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+/.test(v) || 'E-mail must be valid',
                ],
            }
        },

        computed: {
            ...mapState({
                errors: state => state.user.errors,
                loading: state => state.user.loading,
                user: state => state.user.item,
            }),
        },

        methods: {
            login() {
                this.$store.dispatch({'type': 'loginUser',
                    'email': this.email,
                    'password': this.password})
            }
        }

    }
</script>


