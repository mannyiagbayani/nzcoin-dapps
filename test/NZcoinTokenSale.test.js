const NZToken = artifacts.require("./NZToken.sol");
const NZTokenSale = artifacts.require("./NZcoinTokenSale.sol");


contract('NZTokenSale', async (accounts) => {
    let owner = accounts[0];
    let buyer = accounts[1];
    let tokenForSale = 100000/2;
    let tokenPrice = 1000000000000000;
    let tokenSold;

    it('initialize contract with correct values', async () => {
        let instance = await NZTokenSale.deployed();

        let address = await instance.address;
        assert.notEqual(address,0x0, ' has an address attached');

        let tokenprice = await instance.tokenPrice();
        assert.equal(tokenprice,tokenPrice,' has same token price');
    })

    it('allow users to buy NZtoken', async () => {
        let instanceSaleToken = await NZTokenSale.deployed();
        let instanceToken = await NZToken.deployed();

        let transferredToken = await instanceToken.transfer(instanceSaleToken.address,tokenForSale, {from: owner});

        let buyToken = await instanceSaleToken.buyTokens(10,{
            from: buyer,
            value: 10 * tokenPrice
        });

        let buyerBalance = await instanceToken.balanceOf(buyer);
         assert.equal(buyerBalance,10, ' should have 10 balance for the buyer');

        let contractBalance = await instanceToken.balanceOf(instanceSaleToken.address);
        assert.equal(contractBalance, tokenForSale - 10, ` contract should have ${tokenForSale - 10}` );
    })
})