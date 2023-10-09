import { ThirdwebSDK } from "@thirdweb-dev/sdk";

(async () => {
    const sdk = ThirdwebSDK.fromPrivateKey(process.env.PRIVATE_KEY, "mumbai");

    const packAddress = "0x506e46b45D6C7Dd79BE5bA39661B0a63D585090b "; // enter the address of pack 
    const cardAddress = " 0xa5239b286BDD5445bA15cb8FB412775f53a7998E"; //enter the address of card

    const pack = sdk.getContract(packAddress, "pack");
    const card = sdk.getContract(cardAddress, "edition");

    (await card).setApprovalForAll(packAddress, true);
    console.log("Approved contract");

    const packImage = "ipfs://"; //enter the ips hash for pack
    console.log("Creating pack");

    const createPacks = (await pack).create ({
        packMetadata: {
            name:"Pack 01",
            description:"This is pack",
            image: packImage,
        },
        erc115Rewards : [
            {
                contractAddress: cardAddress,
                tokenID: 0,
                quantityPerReward: 1,
                totalRewards: 20,
            },
            {
                contractAddress: cardAddress,
                tokenID: 1,
                quantityPerReward: 1,
                totalRewards: 10,
            },
            {
                contractAddress: cardAddress,
                tokenID: 1,
                quantityPerReward: 1,
                totalRewards: 5,
            },
            // repeat the same for the number of cards created
        ],
        rewardsPerPack: 5,
    });
    console.log("packs created");
})();
