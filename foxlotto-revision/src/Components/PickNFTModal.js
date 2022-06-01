import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import '../Styles/css/style.css'
import searchIcon from '../Images/random/SearchIcon.svg'
import Moralis from 'moralis'
import NFTCard from './NFTCard';

function PickNFTModal(props) {
    const [metadataNFTs, setMetadataNFTs] = useState([]);

    async function getNFTs() {
        // find out how to enable multiple chains? if get rid of options, it does for current user logged in
        const ethNFTs = await Moralis.Web3API.account.getNFTs({
            chain: "polygon",
            address: "0x18f4a7d3ca4e846489d193c0c03df03843af822b",
        });
        console.log(ethNFTs.result);
        ethNFTs.result.forEach(nft => {
            cloudURL(nft);
        })
    }

    async function cloudURL(nft) {
        // so many edge cases w url... have to accept that some won't work

        // anything with opeansea api will throttle - make proxy? cache requests? timer load them?
        let url = nft.token_uri;
        if (url === null) { console.log("nft token uri is null"); return; }
        // let formattedJson = false;
        let metadata = {};
        try {
            if (url.startsWith("https://ipfs.moralis.io:2053/ipfs/")) {
                url = "https://ipfs.io/ipfs/" + url.split("https://ipfs.moralis.io:2053/ipfs/").splice(-1);
            }
            // else if (url.startsWith("https://api.opensea.io/api")) {
            //     url += "?format=json";
            //     formattedJson = true;
            // }

            // if (formattedJson) {
            //     const response = await fetch(url);
            //     const data = await response.json();
            //     metadata = data;
            // } else {
            //     metadata = await Moralis.Cloud.run("fetchJSON", { theUrl: url });
            // }
            metadata = await Moralis.Cloud.run("fetchJSON", { theUrl: url });

            metadata["token_id"] = nft.token_id;
            metadata["token_address"] = nft.token_address;

            if (metadata.data.image === undefined) {
                if (metadata.data.image_url !== undefined) {
                    metadata.data["image"] = metadata.data.image_url;
                    delete metadata.data["image_url"];
                }

                if (metadata.data.animation_url !== undefined) {
                    metadata.data["image"] = metadata.data.animation_url;
                    delete metadata.data["animation_url"];
                }
            }

            // if (metadata.data.name === "Gutter Punks Flyer - WoWG") { console.log(metadata.data); }

            if (metadata.data.image !== undefined) {
                try {
                    if (metadata.data.image.startsWith("ipfs://ipfs/")) {
                        metadata.data.image = "https://gateway.moralisipfs.com/ipfs/" + metadata.data.image.split("ipfs://ipfs/").splice(-1);
                    } else if (metadata.data.image.startsWith("ipfs://")) {
                        metadata.data.image = "https://gateway.moralisipfs.com/ipfs/" + metadata.data.image.split("ipfs://").splice(-1);
                    }
                } catch (error) {
                    console.log(error + "--imagechange--" + metadata.data.image);
                }
            } else {
                console.log(metadata.data)
            }

            setMetadataNFTs(metadataNFTs => [...metadataNFTs, metadata.data]);
        } catch (error) {
            console.log(error + url);
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
                    <div className='position-relative'>
                        <input type="text" className='m-input-field' placeholder='Search NFTs' />
                        <img src={searchIcon} className="m-searchIcon" alt="" />
                    </div>
                    <button onClick={getNFTs}>Get NFTs</button>
                    {/* modal card */}
                    <div className='modal-card my-4'>
                        {metadataNFTs.map((nft, i) => {
                            return (<NFTCard key={i} image={nft.image} name={nft.name} price={100} />)
                        })}
                    </div>
                    {/* modal card */}
                </div>
            </div>
        </Modal >
    )
}

export default PickNFTModal