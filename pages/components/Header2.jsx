import { ConnectButton } from "web3uikit";

export default function Header2() {
	return (
		<div className='flex w-full items-center justify-around border-b-gray-200 border'>
			<h1 className='text-4xl font-bold text-center my-10'>
				Decentralized Lottery
			</h1>
			<ConnectButton moralisAuth={false} />
		</div>
	);
}
