const { expectEvent, expectRevert, constants, balance, ether } = require('@openzeppelin/test-helpers');
const { expect } = require('chai');
const { contract } = require('hardhat');
const BN = web3.utils.BN;
const chaiBN = require('chai-bn')(BN);
require('chai').use(chaiBN);

let charitable, owner, user1, user2;
contract('Charitable', async () => {
  before(async () => {
    [owner, user1, user2] = await web3.eth.getAccounts();
    const Charitable = artifacts.require("Charitable");
    charitable = await Charitable.new()
  });
  async function donate(user, amount){
    const donation = await charitable.donationOf(user);
    const tracker = await balance.tracker(charitable.address, unit = 'wei');
    const tx = await charitable.donate({value: amount, from: user});
    expect(await charitable.donationOf(user)).to.be.bignumber.equal(donation.add(amount));
    expect(await tracker.delta()).to.be.bignumber.equal(amount);
    expectEvent(tx, "Donation", {donor: user, amount: amount});
  }
  async function withdraw(to, amount){
    let _to = to, _amount = amount;
    if(to == constants.ZERO_ADDRESS) _to = owner;
    if(amount.isZero()) _amount = new BN(await web3.eth.getBalance(charitable.address));
    const tracker = await balance.tracker(charitable.address, unit = 'wei');
    const trackerTo = await balance.tracker(_to, unit = 'wei');
    const tx = await charitable.withdraw(to, amount);
    expect(await tracker.delta()).to.be.bignumber.equal(_amount.mul(new BN(-1)));
    const { delta, fees } = await trackerTo.deltaWithFees();
    expect(delta.add(fees)).to.be.bignumber.equal(_amount);
    expectEvent(tx, "Withdrawal", {to: _to, amount: _amount});
  }
  describe('Check deployment & withdraw can\'t be called from user address', () => {
    it('should check owner address is set correctly', async () => {
      expect(await charitable.owner()).to.eq(owner);
    });
    it('should check withdraw can\'t be called from non-onwer address', async () => {
      await expectRevert(charitable.withdraw(user1, 0, {from: user1}), "access denied");
    });
  });
  describe('Check donate method', () => {
    it('should donate from 0.01 ETH from user1', async () => {
      await donate(user1, ether('0.01'));
    });
    it('should donate from 0.01 ETH from user1 again (check donationOf properly increases)', async () => {
      await donate(user1, ether('0.01'));
    });
    it('should donate from 0.01 ETH from user2', async () => {
      await donate(user2, ether('0.01'));
    });
    it('should donate from 0.01 ETH from user2 again (check donationOf properly increases)', async () => {
      await donate(user2, ether('0.01'));
    });
  });
  describe('Check withdraw method', () => {
    it('withdraw to owner address 0.01 ETH providing \'to\' zero address', async () => {
      await withdraw(constants.ZERO_ADDRESS, ether('0.01'));
    });
    it('withdraw to user1 address 0.01 ETH', async () => {
      await withdraw(user1, ether('0.01'));
    });
    it('withdraw to owner address whole contract balance providing \'to\' zero address and zero amount', async () => {
      await withdraw(constants.ZERO_ADDRESS, new BN(0));
    });
  });
});
