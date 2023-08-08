import {ethers} from "hardhat";

async function main() {

    const seilor = await ethers.deployContract("SeilorToken");

    await seilor.waitForDeployment();

    console.log("SeilorToken deployed to:", seilor.target);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
