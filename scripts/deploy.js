const hre = require("hardhat");
async function main() {
  const Charitable = artifacts.require("Charitable");
  const charitable = await Charitable.new()
  console.log("Charitable deployed to:", charitable.address);
  return charitable;
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
module.exports = {
  main,
}
