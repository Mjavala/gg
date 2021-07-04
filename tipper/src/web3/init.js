import { ethers } from "ethers";
import { HARMONY_MAINNET_PARAMS } from '@/constants/harmony.js'

async function initWeb3 (context) {
    if (window.ethereum) {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
        } catch (e) {
            console.log(e)
        }
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        // force harmony network
        let network = await provider.getNetwork()
        if (network.chainId !== 1666600000) requestNetworkChange(provider.provider)
        //const signer = provider.getSigner()
        /*
        let account = "0x0E86Ca9Cb163d8282A472430556a8AdCC7673fB2"
        let acc2 = "0x6c0aB067b18F9249FDE6E88aC60398379D00b77d"
        try {
            const val = ethers.utils.parseEther("1")
            console.log(await signer.sendTransaction({to:acc2, from: account, value: val}))
    
        } catch (e) {
            console.log(e)
        }
        */
    
        provider.provider.on('accountsChanged', accounts => {
            context.$store.commit('changeAccounts', accounts[0])
        })
        // force harmony chain
        provider.provider.on('chainChanged', chainId => {
            if (chainId !== '0x63564c40') context.$store.commit('incorrectNetwork', true)
            else context.$store.commit('incorrectNetwork', false)
        })
        context.$store.commit('changeIsConnected', true)
    } else {
        console.log('ethereum is not enabled')
    }
}

export { initWeb3 }

export function requestNetworkChange(provider) {
    try {
      provider.request({
        method: 'wallet_addEthereumChain',
        params: [HARMONY_MAINNET_PARAMS]
      })
    } catch (e) {
      console.log(e)
    }
}