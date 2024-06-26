import { HardhatRuntimeEnvironment } from 'hardhat/types';
import chalk from 'chalk';

const deployScript = async function (hre: HardhatRuntimeEnvironment) {
    console.info(chalk.yellow(`Running deploy script for the Foo contract`));

    const zkWallet = await hre.deployer.getWallet(0);
    hre.deployer.setWallet(zkWallet);

    // Deposit some funds to L2 in order to be able to perform deposits.
    // const depositHandle = await zkWallet.deposit({
    //     to: zkWallet.address,
    //     token: zk.utils.ETH_ADDRESS,
    //     amount: ethers.parseEther('0.01'),
    // });
    // await depositHandle.wait();

    // Load the artifact we want to deploy.
    const artifact = await hre.deployer.loadArtifact('Foo');

    // Deploy this contract. The returned object will be of a `Contract` type, similarly to ones in `ethers`.
    // This contract has no constructor arguments.
    const factoryContract = await hre.deployer.deploy(artifact, []);

    // Show the contract info.
    const contractAddress = await factoryContract.getAddress();
    console.info(chalk.green(`${artifact.contractName} was deployed to ${contractAddress}!`));
}

export default deployScript;

deployScript.tags = ['second'];
deployScript.dependencies = ['first'];
deployScript.priority = 800;


