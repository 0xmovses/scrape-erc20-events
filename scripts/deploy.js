
const hre = require("hardhat");

async function main() {

  const MyToken = await hre.ethers.getContractFactory("MyToken");
  const myToken = await MyToken.deploy("My Token", "TKN");

  await myToken.deployed();


  console.log("My Token deployed to:", myToken.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });