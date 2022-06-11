import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import '../Styles/css/style.css'
import searchIcon from '../Images/random/SearchIcon.svg'
import BasicNFTCard from './BasicNFTCard';
import AdvancedNFTCard from './AdvancedNFTCard';


// pass in NFTs, chainId
function PickNFTModal(props) {

    const [search, setSearch] = useState("");
    const [price, setPrice] = useState(0);
    const [selectedNFT, setSelectedNFT] = useState({});

    // eth switch
    const blockExplorerUrl = "https://etherscan.io/nft/"
    const blockSeparator = "/";
    const openSeaUrl = "https://opensea.io/assets/ethereum/"

    // polygon switch
    // const blockExplorerUrl = "https://polygonscan.com/token/"
    // const blockSeparator = "?a=";
    // const openSeaUrl = "https://opensea.io/assets/matic/"

    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <div className='modal-contents py-2'>
                <h4 className='modaltitle my-4 m-0'>NFTs</h4>
                <p>{!props.pricePage}</p>
                <div className='modal-container pick-nft-modal-container'>
                    {!props.pricePage ? (
                        <div>
                            <div className='position-relative'>
                                {/* maybe add other things to search by like collection, token id, etc. */}
                                <input type="text" className='m-input-field' placeholder='Search NFTs by name' onChange={(e) => setSearch(e.target.value.toLowerCase())} />
                                <img src={searchIcon} className="m-searchIcon" alt="" />
                            </div>
                            <button onClick={() => console.log(props.NFTs)}> See NFTs</button>
                            <div className='modal-card my-4'>
                                {/* maybe get actual key up here */}
                                {props.NFTs.map((NFT, i) => {
                                    return ((NFT.metadata?.name !== undefined ?
                                        NFT.metadata?.name.toLowerCase().includes(search) :
                                        ("UNKNOWN: " + NFT.name + " #" + NFT.token_id).toLowerCase().includes(search)) ? <AdvancedNFTCard
                                        key={i}
                                        actualIndex={i} // this index is actually wrong if we search lmao
                                        image={NFT.metadata?.image}
                                        name={NFT.metadata?.name !== undefined ? NFT.metadata?.name : "UNKNOWN: " + NFT.name + " #" + NFT.token_id}
                                        openSeaUrl={openSeaUrl + NFT.token_address + "/" + NFT.token_id}
                                        explorerUrl={blockExplorerUrl + NFT.token_address + blockSeparator + NFT.token_id}
                                        approved={NFT.approved}
                                        onApprove={props.onApprove} // pass in changeApproval function as a prop from coinflip 
                                        onClick={() => { setSelectedNFT(NFT); props.goPricePage() }} // idk if i can pass in like this
                                    /> : null)
                                })}
                                {/* {props.NFTs.filter((potentialNFT, idx) => potentialNFT.metadata?.name !== undefined ?
                                    potentialNFT.metadata?.name.toLowerCase().includes(search) :
                                    ("UNKNOWN: " + potentialNFT.name + " #" + potentialNFT.token_id).toLowerCase().includes(search)).map((NFT, i) => {
                                        // console.log(idx)
                                        return (<AdvancedNFTCard
                                            key={i}
                                            actualIndex={i} // this index is actually wrong if we search lmao
                                            image={NFT.metadata?.image}
                                            name={NFT.metadata?.name !== undefined ? NFT.metadata?.name : "UNKNOWN: " + NFT.name + " #" + NFT.token_id}
                                            openSeaUrl={openSeaUrl + NFT.token_address + "/" + NFT.token_id}
                                            explorerUrl={blockExplorerUrl + NFT.token_address + blockSeparator + NFT.token_id}
                                            approved={NFT.approved}
                                            onApprove={props.onApprove} // pass in changeApproval function as a prop from coinflip 
                                            onClick={() => { setSelectedNFT(NFT); props.goPricePage() }} // idk if i can pass in like this
                                        />)
                                    })} */}
                            </div>
                        </div>
                    ) : (<div className='modal-column'>
                        <BasicNFTCard
                            image={selectedNFT.metadata?.image}
                            name={selectedNFT.metadata?.name !== undefined ? selectedNFT.metadata?.name : "UNKNOWN: " + selectedNFT.name + " #" + selectedNFT.token_id}
                            openSeaUrl={openSeaUrl + selectedNFT.token_address + "/" + selectedNFT.token_id}
                            explorerUrl={blockExplorerUrl + selectedNFT.token_address + blockSeparator + selectedNFT.token_id}
                        />
                        <div className='right-side-nft-modal'>
                            <div className='price-row'>
                                <p className='price-text'>Price (ETH)</p>
                                <input
                                    type="number"
                                    className=''
                                    placeholder="Ex: 100"
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                                {/* eth logo */}
                            </div>
                            <div className='button-row'>
                                <button
                                    className='cancel-button'
                                    // setSelectedNFT({}); 
                                    onClick={props.goNFTPage}>
                                    Cancel
                                </button>
                                <button
                                    className='confirm-button'
                                    onClick={() => console.log("confirmed - remove from current nfts?")}>
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>)
                    }
                </div >
            </div >
        </Modal >
    )
}

export default PickNFTModal