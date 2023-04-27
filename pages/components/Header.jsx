import { useMoralis } from "react-moralis";
import { useEffect } from "react";

export default function Header() {
	const { enableWeb3, account, isWeb3Enabled } = useMoralis();

	useEffect(() => {
		console.log(isWeb3Enabled);
	}, [isWeb3Enabled]);

	return (
		<div>
			{account ? (
				<div className='bg-blue-500 hover:bg-blue-700 w-44 text-center text-white font-bold py-2 px-4 rounded'>
					Connected to {account.slice(0, 6)}...{account.slice(-4)}
				</div>
			) : (
				<button
					className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
					onClick={async () => {
						await enableWeb3();
					}}>
					Connect Wallet
				</button>
			)}
		</div>
	);
}
