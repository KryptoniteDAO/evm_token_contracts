import * as dotenv from "dotenv";
import {HardhatUserConfig} from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

dotenv.config();


const config: HardhatUserConfig = {
    solidity: {
        version: "0.8.19",
        settings: {optimizer: {enabled: true, runs: 200}}
    },
    networks: {
        bsc: {
            url: "https://bsc-dataseed.binance.org/",
            accounts: [process.env.PRIVATE_KEY || ''],
        },
        bsc_testnet: {
            url: "https://bsc-testnet.publicnode.com/",
            accounts: [process.env.PRIVATE_KEY || ''],
        }
    },
    etherscan: {
        apiKey: {
            bsc: process.env.BSCSCAN_API_KEY || '',
            bsc_testnet: process.env.BSCSCAN_API_KEY || '',
        },
        customChains: [
            {
                network: "bsc",
                chainId: 56,
                urls: {
                    apiURL: "https://api.bscscan.com/",
                    browserURL: "https://bscscan.com/"
                }
            },
            {
                network: "bsc_testnet",
                chainId: 97,
                urls: {
                    apiURL: "https://api-testnet.bscscan.com/api/",
                    browserURL: "https://testnet.bscscan.com/"
                }
            }
        ]
    }
};

export default config;
