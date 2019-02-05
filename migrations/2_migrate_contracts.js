const NZToken = artifacts.require("./NZToken.sol");
const NZTokenSale = artifacts.require("./NZcoinTokenSale.sol");

module.exports = function(deployer)  {
    deployer.deploy(NZToken,100000).then(function() {
        return deployer.deploy(NZTokenSale,NZToken.address,1000000000000000)
    });
};