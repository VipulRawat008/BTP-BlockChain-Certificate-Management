const App = {
  web3Provider: null,
  contracts: {},
  accounts: ['0x0'],

  initWeb3: async function () {
    console.log('initWeb3');
    const provider = await detectEthereumProvider();
    if (provider) {
      // From now on, this should always be true:
      App.initContract(provider); // initialize your app
    } else {
      console.log('Please install MetaMask!');
    }
  },

  initContract: async function (provider) {
    console.log('initContract', provider);
    const cert = await $.getJSON("Certificates.json");

    // Instantiate a new truffle contract from the artifact
    App.contracts.Certificates = TruffleContract(cert);

    // Connect provider to interact with contract
    await App.contracts.Certificates.setProvider(provider);

    // App.listenForEvents();
    // return App.render();
  },
}

function updateStatus(status) {
  const statusEl = document.getElementById('status');
  statusEl.innerHTML = status;
  console.log(status);
}

async function loadContract() {
  return await new window.web3.eth.Contract([
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "certificate",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "issuer",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        }
      ],
      "name": "CertificateIssued",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "issuer",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "_ipfsHash",
          "type": "string"
        }
      ],
      "name": "CertificateRegistered",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "issuer",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "_ipfsHash",
          "type": "string"
        }
      ],
      "name": "IssuerRegistered",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "_ipfsHash",
          "type": "string"
        }
      ],
      "name": "RecipientRegistered",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "certificate_counter",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "issuerPK",
          "type": "string"
        }
      ],
      "name": "registerIssuer",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "studentPK",
          "type": "string"
        }
      ],
      "name": "registerRecipient",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_ipfsHash",
          "type": "string"
        }
      ],
      "name": "registerCertificate",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_recipient",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "certificate_hash",
          "type": "string"
        }
      ],
      "name": "issueCertificate",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_ipfsHash",
          "type": "string"
        }
      ],
      "name": "getIssuerOfCertificate",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_issuer",
          "type": "address"
        }
      ],
      "name": "getIssuer",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_recipient",
          "type": "address"
        }
      ],
      "name": "getRecipient",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_ipfsHash",
          "type": "string"
        }
      ],
      "name": "getAllRecipientOfCertificate",
      "outputs": [
        {
          "internalType": "address[]",
          "name": "",
          "type": "address[]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_recipient",
          "type": "address"
        }
      ],
      "name": "getRecipientCertificates",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_issuer",
          "type": "address"
        }
      ],
      "name": "getIssuerCertificates",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "getCertificateIdentifier",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    }
  ], ADDRESS);
}

async function regissuer(){
  var issuedCandidate = document.getElementById("regissuer").value;
  console.log(issuedCandidate);
    if (issuedCandidate) {
      App.contracts.Certificates.deployed().then(function (instance) {
        return instance.registerIssuer(issuedCandidate, { from: App.accounts[0] });
      })
    }
  }

async function regrec(){
  var receiverCandidate = document.getElementById("regrec").value;
  console.log(receiverCandidate);
    if (receiverCandidate) {
      App.contracts.Certificates.deployed().then(function (instance) {
        return instance.registerRecipient(receiverCandidate, { from: App.accounts[0] });
      })
    }
  }
  

async function regcert(){
  var registeredCandidate = document.getElementById("regcert").value;
  console.log(registeredCandidate);
    if (registeredCandidate) {
      App.contracts.Certificates.deployed().then(function (instance) {
        return instance.registerCertificate(registeredCandidate, { from: App.accounts[0] });
      })
    }
  }
  
async function vercert(){
  var certverify = document.getElementById("vercert").value;
  console.log(certverify);
    if (certverify) {
      App.contracts.Certificates.deployed().then(function (instance) {
        return instance.verify(certverify, { from: App.accounts[0] });
      })
    }
  }

async function issueCert(){
  var recipCandidate = document.getElementById("recAddrs").value;
  var certHash = document.getElementById("certHash").value;
  // console.log(registeredCandidate);
    if (recipCandidate && certHash) {
      App.contracts.Certificates.deployed().then(function (instance) {
        return instance.registerCertificate(recipCandidate ,certHash, { from: App.accounts[0] });
      })
    }
  }
  
  
async function load() {
  await loadWeb3();
  updateStatus('Ready!');
}

// async function addIPFShash() {
//   var value = document.getElementById('ipfsHash').value;
//   console.log(value);
//   // var account = await getCurrentAccount();
//   const account = App.accounts[0];
//   console.log(account);
//   let x = await App.contracts.Certificates.deployed()
//   x.issueCertificate('0xd9af6f09b50b9dd298997f3bfacdede179db0f14',value, {from:account})
//   // const IPFShash = await window.contract.methods.issueCertificate(value).send({ from: account });
//   updateStatus('Added');
// }

$(window).load(async function () { 
  // App.ethereumButton = document.getElementById('enableEthereumButton');
  // App.ethereumButton.addEventListener('click', async function () {
  //   Will Start the metamask extension
  App.accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  window.ethereum.on('accountsChanged', accounts => {
    console.log(accounts);
  })
  App.initWeb3();
  // App.accounts.registerIssuer("0xFe3356f84C6B45C72D2384dF6824D9171dC6CA03", {from:App.accounts[0]})
})

// let provider = window.ethereum;

//     if(typeof provider !== 'undefined') {
//       // MetaMask is installed
//       provider.request({ method: 'eth_requestAccounts' }).then(accounts => {
//         console.log(accounts);
//       }).catch(error => {
//         console.log(error);
//       })

      
//     }
    
//     const web3 = new Web3(provider);