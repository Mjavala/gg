import { ethers } from "ethers";

async function initWeb3 (context) {
    try {
        await window.ethereum.enable()
    } catch (e) {
        console.log(e)
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner()
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

    context.$store.commit('changeIsConnected', true)
    provider.provider.on('accountsChanged', accounts => {
        context.$store.commit('changeAccounts', accounts[0])
    })
}

export { initWeb3 }