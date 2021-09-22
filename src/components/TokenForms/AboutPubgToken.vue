<template>
<div class="tm-countdown-outer">
    <div class="tm-countdown-wrap tm-style1 text-center" style="background: #1e0139">
        <div class="tm-countdown-bg"></div>
        <div class="tm-countdown-box">
            <div class="tm-countdown-heading tm-f20 tm-white-c tm-lh16">
                PUBG Token
            </div>
            <div class="empty-space col-xs-b25"></div>

            <div class="tm-token-status-bar tm-f16 tm-white-c">
                <form>
                    <div class="form-group">
                        <input type="" id="postWalletAddress" name="" class="form-control" placeholder="Create Link" />
                    </div>
                    <!-- .tm-token-status-bar -->
                    <div class="row">
                        <div class="col-md-6">
                            <div class="text-center">
                                <button class="tm-btn w-100" @click.prevent="genrate_refer">Get Referral Now</button>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="text-center">
                                <button @click.prevent="copyRefer" class="tm-btn w-100">Copy Now</button>
                            </div>
                        </div>
                    </div>

                </form>
            </div>

        </div>
        <!-- .tm-countdown-box -->
    </div>
    <!-- .tm-countdown-wrap -->
</div>
</template>

<script>
import Swal from 'sweetalert2';
const axios = require('axios');

export default {
    methods: {
        async genrate_refer() {

            const UpdateData = new FormData();
            let postWalletAddress = document.getElementById('postWalletAddress').value;
             let link = "http://pubgtoken.io?referrer="+postWalletAddress;
             document.getElementById('postWalletAddress').value = link
            if(postWalletAddress.value == ''){
              Swal.fire('Opps ... ', 'Please enter your wallet address.', 'error');
              return false;
            }
            UpdateData.append("walletAddress" , postWalletAddress.value);
            axios.post('https://pubgtoken.io/admin/generate_refer.php', UpdateData)
                .then(function (response) {
                     let data = response.data;
                     if(data.res === 1){
                         Swal.fire('Good job', 'Your referal link has been generated successfully.', 'success');
                         document.getElementById('postWalletAddress').value = data.refer_link;
                         document.getElementById('postWalletAddress').setAttributes('value',data.refer_link);
                     }else{
                          Swal.fire('Opps ... ', 'You address didn\'t found our database..', 'error');
                     }
                    // console.log(response);
                })
                .catch(function (error) {
                    //  Swal.fire('Opps ... ', 'Somthing wrong please try again.', 'error');
                });

                ///// copy link

        },
        copyRefer() {
            let postWalletAddress = document.getElementById('postWalletAddress');
            if(postWalletAddress.value ==''){
                return false;
            }
            postWalletAddress.select();
            document.execCommand('copy',false);
        }
    }
};
</script>
