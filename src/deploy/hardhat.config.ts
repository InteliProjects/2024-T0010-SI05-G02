import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

// Substitua os valores abaixo pelos seus detalhes específicos do Alchemy e pela chave privada da carteira
const SEPOLIA_PRIVATE_KEY = process.env.SEPOLIA_PRIVATE_KEY || ""; // Substitua pela sua chave privada
const config: HardhatUserConfig = {
  solidity: "0.8.0",
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/S5M0Gzi4s7ejgXV782qXDZqUOwknGc9X`,
      accounts: [SEPOLIA_PRIVATE_KEY]
    }
  }
};

export default config;
