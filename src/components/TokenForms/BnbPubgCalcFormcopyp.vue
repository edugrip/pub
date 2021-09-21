<template>
  <div class="">
    <div class="col-md-12 card card-body" style="background-color: #21013e">
      <div class="head-form">
        <div class="row">
          <div class="col-md-6">
            <form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left" >
              <div class="form-group">
                <label>Enter BNB Amount</label>
                <input
                  type="number"
                  name=""
                  id="bnbamout"

                  class="form-control"
                  placeholder="0.000"
                  @input="updateValue"
                />
              </div>
              <div class="form-group">
                <label>You will Receive PUBG</label>
                <input
                  name=""
                  type="number"
                  id="pubgamount"
                  class="form-control"
                  placeholder="0.000"
                  @input="updateValue"
                />
              </div>
               <div class="tm-btn-group">
        <button type="button"  class="tm-btn tm-style1" @click.prevent="handleWalletLogin">Test </button>
        <button type="button"  class="tm-btn tm-style1" @click.prevent="test">Test </button>

      </div>

            </form>
          </div>
          <div class="col-md-6 text-center">
            <img
              src="../../assets/img/logo.png"
              class="img-fluid desktop-view"
              style="max-width: 160px; margin: 20px 0"
            />
          </div>
        </div>
      </div>

      <h4 class="mt-3" style="font-weight: bold">Min 0.02 BNB - Max 10 BNB</h4>
      <p class="mt-0">
        When will I receive my Referral Reward ? You will instantly receive a
        10% BNB reward of any amount your referrer deposit straight to your
        wallet whenever the referred user purchases from the presale. You also
        receive 10% of PUBG Tokens instantly to your wallet.
      </p>
    </div>
  </div>
</template>

<script>
import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3';
var Tx = require('ethereumjs-tx').Transaction;
import Swal from 'sweetalert2';
const common = require('ethereumjs-common');
const axios = require('axios');
const BSCOptions = {
/* Smart Chain - Testnet RPC URL */
  rpcUrl: 'https://bsc-dataseed.binance.org/',
  chainId: 56 // Smart Chain - Testnet chain id
}
/******************************************************/
/////// Setup config variables
/******************************************************/
// Setting network to Smart Chain - Testnet

// const web3 = new Web3(Web3.providers || new Web3.providers.HttpProvider("wss://bsc-dataseed.binance.org"));
//  const web3 = new Web3('http://localhost:8080');
const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');


//  const web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/my_access_token_here'));



let currentAccount = null;


/******************************************************/
/////// Setup config variables
/******************************************************/
const MaxBNB = 10; // maximum BNB Amount
const MinBNB = 0.02; // minimum BNB Amount
const PubgValue = 13500000000; // Pubg Coin Vaue
const MaxPubg = 100000; // maximum PUBG Amount

const AdminAddress = '0x41fE9B8c2Ff04E6ED7c5Cfa942a3C37CeF0c8947'; // Admin Wallet Address


function handleAccountsChanged(accounts) {
  if (accounts.length === 0) {
    // MetaMask is locked or the user has not connected any accounts
    Swal.fire('Oops...', 'Please connect to MetaMask.', 'error');
    this.loading = true;

    return false;
  } else if (accounts[0] !== currentAccount) {
    currentAccount = accounts[0];
    // Do any other work!
  }
}
function financialMfil(numMfil) {
  return Number.parseFloat(numMfil / 1e3).toFixed(3);
}
export default {
  name: 'Login',
  components: {
  },
  data() {
    const validateEmail = (rule, value, callback) => {
      if (!validEmail(value)) {
        callback(new Error('Please enter the correct email'));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value.length < 4) {
        callback(new Error('Password cannot be less than 4 digits'));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        bnbamount: '',
        pubgamount: '',
      },
      loginRules: {
        email: [{ required: true, trigger: 'blur', validator: validateEmail }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }],
      },
      loading: false,
      pwdType: 'password',
      redirect: undefined,
      otherQuery: {},
    };
  },
  watch: {

  },
  mounted:function(){
        this.getStatusTransaction(); //method1 will execute at pageload
        this.sendReferal();
  },
  methods: {
    async sendReferal(){
       // debugger;

    },

    async getStatusTransaction(){
            // Make a request for a user with a given ID

            axios.get('https://pubgtoken.io/admin/get_transaction.php')
              .then(function (response) {
                // handle success
                      var InativeData = response.data;
                      if(InativeData.length > 0){
                      let PaymentComplete = new Array();
                      let InativeData = response.data;
                      let objects = {};
                      if(InativeData.length > 0){
                          InativeData.forEach((element, index) => {
                                        web3.eth.getTransactionReceipt(element.Transaction_Hash, function (e, data) {
                                        if (e !== null) {
                                           // console.log("Could not find a transaction for your id! ID you provided was " + txID);
                                        } else {
                                            if(data.status == '0x0') {
                                               // console.log("The contract execution was not successful, check your transaction !");
                                            } else {
                                                PaymentComplete.push(element)
                                              //  console.log("Execution worked fine!");
                                            }
                                        }
                                        });
                          });

                            if(PaymentComplete.length === 0){
                              const UpdateData = new FormData();

                              InativeData.forEach((element, index) => {
                                UpdateData.append("data["+index+"][id]",element.id);
                                UpdateData.append("data["+index+"][Transaction_Hash]",element.Transaction_Hash);
                                UpdateData.append("data["+index+"][from_account]",element.from_account);
                              });


                                axios.post('https://pubgtoken.io/admin/updateStatus.php',UpdateData)
                                .then(function (response) {
                                  // console.log(response);
                                })
                                .catch(function (error) {
                                  //  Swal.fire('Opps ... ', 'Somthing wrong please try again.', 'error');
                                });
                            }

                      }
                      }


              })
              .catch(function (error) {
                // handle error
                console.log(error);
              })
              .then(function () {
                // always executed
              });
    },
    async handleWalletLogin(e) {






      let bnbAmount = document.querySelector("#bnbamout");
      /// if value is less than limited values
      if(bnbAmount.value < MinBNB){
        Swal.fire('Oops...', 'Please Enter Min 0.02 BNB - Max 10 BNB', 'error');
        return false;
      }

      // this.$refs.loginForm.validate(valid => {
      this.loading = true;
      /** ********************************************************/
      /* Check this code if metamask is installed or not */
      /** ********************************************************/
      if (typeof window.ethereum !== 'undefined' || (typeof window.web3 !== 'undefined')) {

        // Web3 browser user detected. You can now use the provider.
      } else {
        Swal.fire('Oops...', 'Please install MetaMask!', 'error');
        return false;
      }

      /** ********************************************************/
      /* If installed metamask then get provider */
      /** ********************************************************/

      const provider = await detectEthereumProvider();

      // window.ethereum
      const { ethereum } = window;
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      if (provider) {

        // If the provider returned by detectEthereumProvider is not the same as
        // window.ethereum, something is overwriting it, perhaps another wallet.
        // Access the decentralized web!
        if (provider !== window.ethereum) {
          console.error('Do you have multiple wallets installed?');
        }
        /** ********************************************************/
        /* Handle chain (network) and chainChanged (per EIP-1193) */
        /** ********************************************************/
        const chainId = await ethereum.request({ method: 'eth_chainId' }).then(function(result) {
          return result;
        });

        


        ethereum.on('chainChanged', function(chainId){
          // We recommend reloading the page, unless you must do otherwise
          window.location.reload();
        });



        /** *********************************************************/
        /* Handle user accounts and accountsChanged (per EIP-1193) */
        /** *********************************************************/
        let currentAccount = null;

        ethereum.request({ method: 'eth_accounts' })
          .then((accounts) => {
            // console.log(accounts);
            if (accounts.length === 0) {
              // MetaMask is locked or the user has not connected any accounts
              Swal.fire('Oops...', 'Please connect to MetaMask.', 'error');
              this.loading = true;
              return false;
            } else if (accounts[0] !== currentAccount) {
              currentAccount = accounts[0];
              // Do any other work!
            }
          })
          .catch((err) => {
          // Some unexpected error.
          // For backwards compatibility reasons, if no accounts are available,
          // eth_accounts will return an empty array.
            console.log(err);
          });

        // Note that this event is emitted on page load.
        // If the array of accounts is non-empty, you're already
        // connected.

        
        ethereum.on('accountsChanged', function(){
          if (accounts.length === 0) {
            // MetaMask is locked or the user has not connected any accounts
            Swal.fire('Oops...', 'Please connect to MetaMask.', 'error');
            this.loading = true;
            return false;
          } else if (accounts[0] !== currentAccount) {
            currentAccount = accounts[0];
            // Do any other work!
          }
        });

        /** *******************************************/
        /* Access the user's accounts (per EIP-1102) */
        /** *******************************************/
        // window.ethereum
        let chainds = await web3.eth.net.getId();
        if(chainds === 56){
            /// 
        }else{
             Swal.fire('Oops...', 'Please select your wallet at BSC Main-net.', 'error');
           // return false;
        }

        try {

           const bnb = document.getElementById('bnbamout').value;
           const pubg = document.getElementById('pubgamount').value;
           if(bnb == ''){
                 Swal.fire('Oops...', 'Please BNB amount..', 'error');
                 return false;
           }
           if(accounts[0] == ''){
             return false;
           }
            console.log(accounts[0]);
            // 	const urlParams = new URLSearchParams(window.location.search);
            // const myParam = urlParams.get('referUrl');

            // if(window.location.href.indexOf("referUrl") > -1) {

            // }

          web3.eth.sendTransaction({
            to: AdminAddress, /// AdminAddress where client recieve coins
            from: accounts[0], ///  accounts[0] current wallet address
            value: Web3.utils.toWei(bnb),
          }, (err, transactionId) => {
            if (err) {
              console.log('========================================');
                 console.log(err);
              console.log('========================================');

                 Swal.fire('Opps ... ', 'Payment failed.', 'error');
              // $('#status').html('Payment failed');
            } else {

              const formData = new FormData();
              formData.append('bnb', bnb);
              formData.append('pubg',pubg);
              formData.append('Transaction_Hash',transactionId);
              formData.append('from_account', accounts[0]);

              axios.post('https://pubgtoken.io/admin/bnbtransactionDB.php',formData)
              .then(function (response) {
                 Swal.fire('Good Job', 'Payment successful. Your Transaction Hash ' + transactionId, 'success');
                console.log(response);
              })
              .catch(function (error) {
                 Swal.fire('Opps ... ', 'Somthing wrong please try again.', 'error');
              });
              // $('#status').html('Payment successful');
            }
          });
        }
         catch(err) {
          document.getElementById("demo").innerHTML = err.message;
        }

        // Note that this event is emitted on page load.
        // If the array of accounts is non-empty, you're already
        // connected.
       
      }
    },
    updateValue(event){

      let bnbAmount = document.querySelector("#bnbamout");// Get BNB Amount Value
      let pubgAmount = document.querySelector("#pubgamount");// Get PUBG Amount Value
      // If user Enter negtive value
      if (Math.sign(bnbAmount.value) === -1 || Math.sign(pubgAmount.value) === -1 ){
        bnbAmount.value = "";
        pubgAmount.value = "";
        return false;
      }
      /// if value is grater than limited values
      if(bnbAmount.value > MaxBNB ||  pubgAmount.value > MaxPubg ){
        bnbAmount.value = "";
        pubgAmount.value = "";
        return false;
      }
      let newBnbAmount = pubgAmount.value / PubgValue;
      let newPubgAmount = bnbAmount.value * PubgValue;
      if(event.target.id == 'bnbamout'){
           pubgAmount.value = newPubgAmount;
      }
      if(event.target.id == 'pubgamount'){
           bnbAmount.value = newBnbAmount;
      }

    },
  },
};
</script>

