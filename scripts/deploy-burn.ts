import {ethers} from "hardhat";

async function main() {

    const seilorTokenAddress = "0xE29142E14E52bdFBb8108076f66f49661F10EC10";

    const exchangeSeilorToken = await ethers.deployContract("BurnSeilorToken",[seilorTokenAddress]);
    await exchangeSeilorToken.waitForDeployment();
    const exchangeSeilorTokenAddress = await exchangeSeilorToken.getAddress();
    console.log("ExchangeSeilorToken deployed to:", exchangeSeilorTokenAddress);



}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
