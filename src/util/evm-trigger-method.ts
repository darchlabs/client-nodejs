import { ethers } from "ethers";
import { IsEVM, type Network } from "./network";
import { Abi } from "./abi";

export type TriggerEVMMethodConfig = {
  network: Network;
  nodeUrl: string;
  abi: Abi[];
  address: string;
  privateKey: string;
  methodName: string;
}

export const TriggerEVMMethod = async (config: TriggerEVMMethodConfig): Promise<ethers.Transaction> => {
  if (!IsEVM(config.network)) {
    throw new Error(`trigger are not implemented to network=${config.network}`)
  }

  const provider = new ethers.JsonRpcProvider(config.nodeUrl);
  const wallet = new ethers.Wallet(config.privateKey, provider);
  const contract = new ethers.Contract(config.address, config.abi, wallet);

  const call = await contract[config.methodName]();
  const tx = await call.wait();

  return tx;
}