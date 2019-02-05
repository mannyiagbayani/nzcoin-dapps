const NZToken = artifacts.require("./NZToken");

contract('NZToken', async (accounts) => {
    it('initialize contract with correct values', async () => {
        let instance = await NZToken.deployed();

        let name = await instance.name();
        assert.equal(name,'NZCOIN ERC20 Token', 'has same name');

        let symbol = await instance.symbol();
        assert.equal(symbol,'NZT', 'has same name');

       
    })

    it('allocates the total supply on deployment', async() => {
        let instance = await NZToken.deployed();

        let supply = await instance.totalSupply();
        assert.equal(supply, 100000, ' has the same total supply')
    })

});