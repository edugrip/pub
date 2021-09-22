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
                  value="0.02"
                  class="form-control"
                  placeholder="0.000"
                  @input="updateValue"
                />
              </div>
              <div class="form-group">
                <label>You will Receive PUBG Tokens</label>
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
        <button type="submit"  class="tm-btn tm-style1" @click.prevent="handleLogin">BUY NOW </button>

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
// const BSCOptions = {
// /* Smart Chain - Testnet RPC URL */
//   rpcUrl: 'https://bsc-dataseed.binance.org',
//   chainId: 97 // Smart Chain - Testnet chain id
// }
/******************************************************/
/////// Setup config variables
/******************************************************/
// Setting network to Smart Chain - Testnet
let web3 = new Web3('https://bsc-dataseed.binance.org');

let currentAccount = null;


/******************************************************/
/////// Setup config variables
/******************************************************/
const MaxBNB = 10; // maximum BNB Amount
const MinBNB = 0.02; // minimum BNB Amount
const PubgValue = 13500000000; // Pubg Coin Vaue
const MaxPubg = 100000; // maximum PUBG Amount
const AdminAddress = '0x41fE9B8c2Ff04E6ED7c5Cfa942a3C37CeF0c8947'; // Admin Wallet Address
let abi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "_mint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

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
        this.SendPubgCoin();
        this.testing();
  },
  methods: {
    async test(toAddress, amount){
      let referrer = this.$route.query.referrer
//let web3 = require("web3");
//const solc = require("solc");
//const Tx = require('ethereumjs-tx')
let web3 = await new Web3(new 
    Web3.providers.HttpProvider("https://bsc-dataseed.binance.org"));
     const provider = await detectEthereumProvider();
      // window.ethereum
      const { ethereum } = window;
      console.log("ethereum", ethereum);
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      console.log("ethereum", accounts);

   

const gasPrice = web3.eth.gasPrice;
//console.log(gasPrice)
 const gasPriceHex = web3.utils.toHex(30000000000);
 const gasLimitHex = web3.utils.toHex(3000000);

//var nonceval = '0x' + new Date().getTime();
let fromAddress = web3.utils.toChecksumAddress(("0x88b90075F8d71CE5b3c0fBd3505e220d30Ae72D0"))
let nonce = await web3.eth.getTransactionCount(fromAddress)
var fTx = {
    nonce: nonce,
    gasPrice: gasPriceHex,
    gasLimit: gasLimitHex,
    to: referrer,
    from: fromAddress,
    value:amount/10
};

// console.log(fTx)
 const chain = common.default.forCustomChain(
            'mainnet',{
              name: 'bnb',
              networkId: 56,
              chainId: 56,
              url: 'https://bsc-dataseed.binance.org'
            },
            'istanbul'
          )
var txx = new Tx(fTx, {'common':chain});
var bufferr = Buffer.from("1cb4673b0af8a0b5be2a90b2f463ef47ae7d6e1d21cb3d17a830d2073e6c2a91", 'hex')
txx.sign(bufferr);
console.log(txx)
var sTx =txx.serialize();

console.log(sTx)

if(referrer){
    web3.eth.sendSignedTransaction('0x' + sTx.toString('hex'), (err, hash) => {
    if (err) { console.log(err); return; }
    // Log the tx, you can explore status manually with eth.getTransaction()
    console.log('contract creation tx - 1 : ' + hash);
    }); 
  }
    
    let tokenAmount =  (amount*0.0135)
    var contract = new web3.eth.Contract(abi,"0xFeCE7e6c21Adf0Ef172192009C1E1c7DCA33631b")
   // let transferto = web3.utils.asciiToHex(toAddress)
   //amount = web3.utils.asciiToHex(amount)
    nonce = await web3.eth.getTransactionCount(fromAddress)

    var encodedABI = contract.methods.transfer(toAddress, tokenAmount ).encodeABI();
      var ctx = {
        nonce:nonce,
        from: fromAddress,
        to: "0xFeCE7e6c21Adf0Ef172192009C1E1c7DCA33631b",
        gas: 3000000,
        gasPrice:5000000000,
        data: encodedABI,
      };

 

var txx2 = new Tx(ctx, {'common':chain});
var bufferr2 = Buffer.from("1cb4673b0af8a0b5be2a90b2f463ef47ae7d6e1d21cb3d17a830d2073e6c2a91", 'hex')
txx2.sign(bufferr2);
console.log("txx2", txx2)
var sTx2 =txx2.serialize();
 web3.eth.sendSignedTransaction('0x' + sTx2.toString('hex'), (err, hash) => {
    if (err) { console.log(err); return; }
    // Log the tx, you can explore status manually with eth.getTransaction()
    console.log('contract creation tx 2 : ' + hash);
    }); 

},
    async testing(){

    },
    async SendPubgCoin(){
        

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
                                          //  console.log("Could not find a transaction for your id! ID you provided was " + txID);
                                        } else {
                                            if(data.status == '0x0') {
                                               // console.log("The contract execution was not successful, check your transaction !");
                                            } else {
                                                PaymentComplete.push(element)
                                               // console.log("Execution worked fine!");
                                            }
                                        }
                                        });
                          });

                            if(PaymentComplete.length === 0){
                              const UpdateData = new FormData();

                              InativeData.forEach((element, index) => {
                              //  console.log(element);
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
             })
              .then(function () {
                // always executed
              });





    },
    async handleLogin(e) {

      let bnbAmount = document.querySelector("#bnbamout");
      /// if value is less than limited values
      // if(bnbAmount.value < MinBNB){
      //   Swal.fire('Oops...', 'Please Enter Min 0.02 BNB - Max 10 BNB', 'error');
      //   return false;
      // }

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
        ethereum.enable();
        web3 = new Web3(ethereum)
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

        console.log(chainId);

        /** *********************************************************/
        /* Handle user accounts and accountsChanged (per EIP-1193) */
        /** *********************************************************/
        let currentAccount = null;

        ethereum.request({ method: 'eth_accounts' })
          .then((accounts) => {
            console.log(accounts);
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




        try {

           const bnb = document.getElementById('bnbamout').value;
           const pubg = document.getElementById('pubgamount').value;
           if(bnb == ''){
                 Swal.fire('Oops...', 'Please BNB amount..', 'error');
                 return false;
           }
          console.log(Web3);


		  const urlParams = new URLSearchParams(window.location.search);
			const myParam = urlParams.get('referUrl');

			if(window.location.href.indexOf("referUrl") > -1) {

			}

          web3.eth.sendTransaction({
            to: "0x88b90075F8d71CE5b3c0fBd3505e220d30Ae72D0", /// AdminAddress where client recieve coins
            from: accounts[0], ///  accounts[0] current wallet address
            value: Web3.utils.toWei(bnb),
          }, (err, transactionId) => {
            if (err) {
                // Swal.fire('Opps ... ', 'Payment failed.', 'error');
                 console.log('send transaction error', err);
              
            } else {
              "calling else .. in send transaction"
                  this.test(accounts[0], web3.utils.toWei(bnb))
              const formData = new FormData();
              formData.append('bnb', bnb);
              formData.append('pubg',pubg);
              formData.append('Transaction_Hash',transactionId);
              formData.append('from_account', accounts[0]);

              axios.post('https://pubgtoken.io/admin/bnbtransactionDB.php',formData)
              .then(function (response) {
                // Swal.fire('Good Job', 'Payment successful. Your Transaction Hash ' + response.data.transactionId, 'success');
              })
              .catch(function () {
                // Swal.fire('Opps ... ', 'Somthing wrong please try again.', 'error');
              });
              // $('#status').html('Payment successful');
            }
          });

          // web3.eth.sendTransaction({
          //   to: AdminAddress, /// AdminAddress where client recieve coins
          //   from: accounts[0], ///  accounts[0] current wallet address
          //   value: Web3.utils.toWei('0.02'),
          // }, (err, transactionId) => {
          //   if (err) {
          //        Swal.fire('Opps ... ', 'Payment failed.', 'error');
          //     // $('#status').html('Payment failed');
          //   } else {

          //     const formData = new FormData();
          //     formData.append('bnb', bnb);
          //     formData.append('pubg',pubg);
          //     formData.append('Transaction_Hash',transactionId);
          //     formData.append('from_account', accounts[0]);

          //     axios.post('https://pubgtoken.io/admin/bnbtransactionDB.php',formData)
          //     .then(function (response) {
          //        Swal.fire('Good Job', 'Payment successful. Your Transaction Hash ' + transactionId, 'success');
          //       console.log(response);
          //     })
          //     .catch(function (error) {
          //        Swal.fire('Opps ... ', 'Somthing wrong please try again.', 'error');
          //     });
          //     // $('#status').html('Payment successful');
          //   }
          // });

          const transaction_Hash = '';

          console.log(datalist);
          this.$store.dispatch('createPost', datalist);

          this.loading = true;
        } catch (error) {
          console.error(error);
        }

        // Note that this event is emitted on page load.
        // If the array of accounts is non-empty, you're already
        // connected.
        ethereum.on('accountsChanged', handleAccountsChanged);

        ethereum.request({ method: 'eth_requestAccounts' })
          .then(handleAccountsChanged)
          .catch((err) => {
            if (err.code === 4001) {
              // EIP-1193 userRejectedRequest error
              // If this happens, the user rejected the connection request.
              Swal.fire('Oops...', 'Please connect to MetaMask.', 'error');
              this.loading = true;

              return false;
            } else {
              console.error(err);
            }
          });
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

    async sendpugcoin() {
    
    },
  },
};
</script>

