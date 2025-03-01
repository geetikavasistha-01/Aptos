const getDecryptedReport = async (secretKey) => {
  const client = new AptosClient("https://fullnode.mainnet.aptoslabs.com");
  const sender = await window.aptos.account();

  try {
    const accountData = await client.getAccountResource(
      sender.address,
      "0xb96a9ddc059c7f5a691ca39faa278bbf2a4f40186cdd65af077c35562afe417e::SecureMedicalStorage::MedicalReport"
    );

    const encryptedReport = new TextDecoder().decode(
      new Uint8Array(accountData.data.encrypted_report)
    );

    const decryptedReport = decryptReport(encryptedReport, secretKey);
    console.log("🔓 Decrypted Report:", decryptedReport);
    return decryptedReport;
  } catch (error) {
    console.error("❌ Failed to fetch report:", error);
  }
};
