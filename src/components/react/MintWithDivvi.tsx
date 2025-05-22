import { useState } from 'react';
import { getDataSuffix, submitReferral } from '@divvi/referral-sdk';
import {
  createWalletClient,
  custom,
  encodeFunctionData,
} from 'viem';
import { base } from 'viem/chains';
import toast from 'react-hot-toast';
import { zoraDropAbi } from '../../abi/zoraAbi';

export default function MintWithDivvi() {
  const [account, setAccount] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'complete'>('idle');

  const walletClient = createWalletClient({
    chain: base,
    transport: custom(window.ethereum),
  });

  const connectWallet = async () => {
    try {
      const [addr] = await walletClient.getAddresses();
      setAccount(addr);
      toast.success('Wallet connected');
    } catch (err) {
      toast.error('Failed to connect wallet');
    }
  };

  const handleMint = async () => {
    if (!account) return;
    setStatus('loading');

    try {
      const dataSuffix = getDataSuffix({
        consumer: '0x40E144873a75a8d56999F0a4a84CBd588E0714c7',
        providers: [
          '0x0423189886d7966f0dd7e7d256898daeee625dca',
          '0xc95876688026be9d6fa7a7c33328bd013effa2bb',
          '0x5f0a55fad9424ac99429f635dfb9bf20c3360ab8'
        ]
      });

      const encodedMint = encodeFunctionData({
        abi: zoraDropAbi,
        functionName: 'mint',
        args: [account, 1] // You can change quantity if needed
      });

      const txHash = await walletClient.sendTransaction({
        account,
        to: '0xYourZoraContractAddress', // ✅ Replace with your actual contract
        data: encodedMint + dataSuffix,
        value: BigInt(0) // or BigInt(1000000000000000) for 0.001 ETH
      });

      const chainId = await walletClient.getChainId();
      await submitReferral({ txHash, chainId });

      toast.success('Mint successful!');
      setStatus('complete');
    } catch (err) {
      toast.error('Mint failed');
      setStatus('idle');
    }
  };

  return (
    <div className="text-center space-y-6">
      {!account ? (
        <button
          onClick={connectWallet}
          className="bg-neon-green text-black px-6 py-3 font-bold rounded-full"
        >
          Connect Wallet
        </button>
      ) : (
        <button
          onClick={handleMint}
          className="bg-neon-green text-black px-6 py-3 font-bold rounded-full"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Minting...' : 'Mint Tokn420'}
        </button>
      )}
    </div>
  );
}
