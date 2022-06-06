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
    const [search, setSearch] = useState("");
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
        // if total after this function doesnt equal actual total - check console for "uncaught errors"
        // i dont think api open sea stuff works with throttling
        await getNFTBalances({ params: { chain: chainId, address: "0x60f4c86457c1954c0ca963dc03534c3311967beb" } });
        await includeAllPages(fetchedNFTs, 9);
    }

    async function includeAllPages(response, numPages) {
        let i = 0;
        while (response && response.result.length > 0 && i < numPages) {
            console.log(response)
            response.result.forEach(async NFT => {
                NFT = await verifyMetadata(NFT);
                NFT.approved = false;
                setNFTs(NFTs => [...NFTs, NFT]);
            });
            response = await response.next(); // might throw error at end when no "next function"'
            i += 1;
        }
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
                    {/* maybe add other things to search by like collection, token id, etc. */}
                    <div className='position-relative'>
                        <input type="text" className='m-input-field' placeholder='Search NFTs by name' onChange={(e) => setSearch(e.target.value.toLowerCase())} />
                        <img src={searchIcon} className="m-searchIcon" alt="" />
                    </div>
                    <button onClick={getNFTs}>Get NFTs</button>
                    <button onClick={() => console.log(NFTs)}>See NFTs</button>
                    {/* modal card */}
                    <div className='modal-card my-4'>
                        {NFTs.filter(potentialNFT => potentialNFT.metadata?.name !== undefined ?
                            potentialNFT.metadata?.name.toLowerCase().includes(search) :
                            ("UNKNOWN: " + potentialNFT.name + " #" + potentialNFT.token_id).toLowerCase().includes(search)).map((NFT, i) => {
                                return (<NFTCard
                                    key={i}
                                    image={NFT.metadata?.image}
                                    name={NFT.metadata?.name !== undefined ? NFT.metadata?.name : "UNKNOWN: " + NFT.name + " #" + NFT.token_id}
                                    openSeaUrl={openSeaUrl + NFT.token_address + "/" + NFT.token_id}
                                    explorerUrl={blockExplorerUrl + NFT.token_address + blockSeparator + NFT.token_id}
                                    price={100} />)
                            })}
                    </div>
                    {/* modal card */}
                </div>
            </div>
        </Modal >
    )
}

export default PickNFTModal