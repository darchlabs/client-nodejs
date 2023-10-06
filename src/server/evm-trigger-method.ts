import { IsEVM, type Network } from "../utils/network";
import { Abi } from "../utils/abi";

export type TriggerEVMMethodConfig = {
  network: Network;
  nodeUrl: string;
  abi: Abi[];
  address: string;
  privateKey: string;
  methodName: string;
}


export const TriggerEVMMethod = async (config: TriggerEVMMethodConfig): Promise<any> => {
  if (typeof window !== "undefined") {
    throw new Error("This function cannot be executed in a Browser environment");
  }

  if (!IsEVM(config.network)) {
    throw new Error(`trigger are not implemented to network=${config.network}`)
  }

  const ethers = await import("ethers");
  const provider = new ethers.JsonRpcProvider(config.nodeUrl);
  const wallet = new ethers.Wallet(config.privateKey, provider);
  const contract = new ethers.Contract(config.address, config.abi, wallet);

  const call = await contract[config.methodName]();
  const tx = await call.wait();

  return tx;
}