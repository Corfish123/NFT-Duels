import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import '../Styles/css/style.css'
import searchIcon from '../Images/random/SearchIcon.svg'
import Moralis from 'moralis'
import { useNFTBalances } from 'react-moralis'
import NFTCard from './NFTCard';
import useVerifyMetadata from '../Helpers/UseVerifyMetadata'

function PickNFTModal(props) {
    const { verifyMetadata } = useVerifyMetadata();
    const [NFTs, setNFTs] = useState([]);
    const { getNFTBalances, data: fetchedNFTs, error, isLoading, isFetching } = useNFTBalances();

    // eth switch
    // const chainId = "0x1"
    // const blockExplorerUrl = "https://etherscan.io/nft/"
    // const blockSeparator = "/";
    // const openSeaUrl = "https://opensea.io/assets/ethereum/"

    // polygon switch
    const chainId = "0x89"
    const blockExplorerUrl = "https://polygonscan.com/token/"
    const blockSeparator = "?a=";
    const openSeaUrl = "https://opensea.io/assets/matic/"

    async function getNFTs() {
        // https://github.com/MoralisWeb3/changelog/blob/main/2022-06-01.md
        // follow code example for cursor fake pagination
        await getNFTBalances({ params: { chain: chainId, address: "0x68265954216e4e55c1b00bee93da3467caefbf35" } })
        console.log(fetchedNFTs)
        fetchedNFTs?.result.forEach(async NFT => {
            NFT = await verifyMetadata(NFT);
            NFT.approved = false;
            setNFTs(NFTs => [...NFTs, NFT]);
        });
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <div className='modal-contents py-2'>
                <h4 className='modaltitle my-4 m-0'>NFTs</h4>
                <div className='modal-container pick-nft-modal-container'>
                    <div className='position-relative'>
                        <input type="text" className='m-input-field' placeholder='Search NFTs' />
                        <img src={searchIcon} className="m-searchIcon" alt="" />
                    </div>
                    <button onClick={getNFTs}>Get NFTs</button>
                    <button onClick={() => console.log(NFTs)}>See NFTs</button>
                    {/* modal card */}
                    <div className='modal-card my-4'>
                        {NFTs.map((NFT, i) => {
                            // if (NFT.metadata?.image.includes("Qmet3PF6WYcBMZGydZE66ypSh3gdwUpq5cgDDguLD7Z13d")) { console.log(NFT); }
                            return (<NFTCard key={i} image={NFT.metadata?.image} name={NFT.metadata?.name !== undefined ? NFT.metadata?.name : "UNKNOWN: " + NFT.name + " #" + NFT.token_id} openSeaUrl={openSeaUrl + NFT.token_address + "/" + NFT.token_id} explorerUrl={blockExplorerUrl + NFT.token_address + blockSeparator + NFT.token_id} price={100} />)
                        })}
                    </div>
                    {/* modal card */}
                </div>
            </div>
        </Modal >
    )
}

export default PickNFTModal