# Crypton Test Task

Charitable smart contract, accepts donations from users, saves donation balances, emits 'Donation' event with 'donor' address and donation 'amount'.
Assets can we withdrawn from smart contract only by owner (deployer), emits 'Withdrawal' event with 'to' address and 'amount'

# Bulding & testing locally

Install depencies
```shell
npm install
```
Copy .env.example to .env, fill appropriate fields with your values
```shell
cp .env.example .env
```
Build the project
```shell
npm run build
```
Run tests locally
```shell
npm run test
```
Test local deployment
```shell
npm run deploy
```
Test local deployment using hardhat task
```shell
npm run deploy:task
```
# Deployment to Rinkeby and Etherscan verification

Run Hardhat 'accounts' task
```shell
npx hardhat accounts
```

Fund first account on [Chainlink Rinkeby Faucet](https://faucets.chain.link/rinkeby)

Deploy to Rinkeby, copy deployment address to use in step later
```shell
npm run deploy_rinkeby
```

Verify deployed contract on Etherscan, paste deployent address in to replace `DEPLOYED_CONTRACT_ADDRESS` in this command:
```shell
npm run verify DEPLOYED_CONTRACT_ADDRESS
```

Charitable deployed on Rinkeby at 0xc6db69127ee7f7175ffb12e18ce0403922afc605 and verified on [Etherscan](https://rinkeby.etherscan.io/address/0xc6db69127ee7f7175ffb12e18ce0403922afc605#code)