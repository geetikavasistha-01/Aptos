import { AptosClient } from "aptos";

const client = new AptosClient("https://fullnode.mainnet.aptoslabs.com");

const storeCIDOnAptos = async (encryptedCID) => {
  if (!window.aptos) {
    console.error(
      "Aptos wallet not found. Please install a compatible wallet."
    );
    return;
  }

  try {
    // Ensure the user is connected
    const sender = await window.aptos.account();
    console.log("Connected Wallet Address:", sender.address);

    const payload = {
      type: "entry_function_payload",
      function:
        "0xYourDeployedContractAddress::MedicalReportStorage::store_report",
      arguments: [Array.from(new TextEncoder().encode(encryptedCID))], // Convert CID to vector<u8>
      type_arguments: [],
    };

    // Sign and submit the transaction
    const response = await window.aptos.signAndSubmitTransaction(payload);
    console.log("Transaction Submitted. Hash:", response.hash);

    // Wait for transaction confirmation
    await client.waitForTransaction(response.hash);
    console.log("Transaction Confirmed!");

    return response.hash;
  } catch (error) {
    console.error("Transaction failed:", error);
  }
};
