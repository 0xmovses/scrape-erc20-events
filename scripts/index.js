const ethers = require('ethers');  
const myTokenAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const accountZero = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266"
const accountOne= "0x70997970c51812dc3a010c7d01b50e0d17dc79c8";

async function main() {

    const myTokenABI = [
        'function totalSupply() view returns (uint256)',
        'function transferFrom(address from, address to, uint256 amount)',
        'function balanceOf(address account) view returns (uint256)',
        'function transfer(address recipient, uint256 amount)  returns (bool)',
        'event Transfer(address indexed from, address indexed to, uint value)']
    
    const iface = new ethers.utils.Interface(myTokenABI)
    const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
    const signer = provider.getSigner();
    const contract = new ethers.Contract(myTokenAddress, myTokenABI, signer);

    const amount = ethers.utils.parseUnits('10')
    const reciept = await contract.transfer(accountOne, amount._hex);
    const data = reciept.data;

    //const filter =  contract.filters.Transfer(myTokenAddress);
    const topics = [
        "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
        "0x0000000000000000000000008ba1f109551bd432803012645ac136ddd64dba72",
        "0x000000000000000000000000ab7c8803962c0f2f5bbbe3fa8bf41cd82aa1923c"
      ];

    //const events = await contract.queryFilter(filter, 0, 'latest');
    const logDescription = iface.parseLog({ data, topics})

    // console.log('Check amount', checkAmount);

    console.log(logDescription.args) 
}
  
  // We recommend this pattern to be able to use async/await everywhere
  // and properly handle errors.
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });