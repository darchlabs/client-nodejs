export type Transaction = {
  id: string;
  contract_id: string;
  hash: string;
  chain_id: string;
  block_number: string;
  from: string;
  from_balance: string;
  from_is_whale: string;
  value: string;
  contract_balance: string;
  gas: string;
  gas_price: string;
  gas_used: string;
  cumulative_gas_used: string;
  confirmations: string;
  is_error: string;
  tx_receipt_status: string;
  function_name: string;
  timestamp: string;
  created_at: string;
  updated_at: string;
}
