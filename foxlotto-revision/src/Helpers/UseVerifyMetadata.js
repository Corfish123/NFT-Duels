import Moralis from 'moralis'
import React from 'react';

function useVerifyMetadata() {
  const [results, setResults] = React.useState({});

  async function verifyMetadata(NFT) {

    if (NFT.metadata) {
      NFT.metadata.image = resolveLink(NFT.metadata.image);
      return NFT;
    };

    // console.log("No metadata found, will look for one: " + NFT.token_address);
    await getMetadata(NFT);
    return results?.[NFT.token_uri] ? results?.[NFT.token_uri] : NFT;
  }

  async function getMetadata(NFT) {
    if (!NFT.token_uri || !NFT.token_uri.includes("://")) {
      console.log("Invalid URI found: " + NFT.token_address + " which has url " + NFT.token_uri);
      return;
    }

    if (NFT.token_uri.endsWith(".json")) {
      let split = NFT.token_uri.split("/");
      let numPart = split[split.length - 1];
      let actualNum = parseInt(numPart.substring(0, numPart.length - 5));
      split[split.length - 1] = actualNum;
      NFT.token_uri = split.join("/") + ".json";
    } else if (/[0-9]+$/.test(NFT.token_uri)) {
      let split = NFT.token_uri.split("/");
      let numPart = split[split.length - 1];
      let actualNum = parseInt(numPart);
      split[split.length - 1] = actualNum;
      NFT.token_uri = split.join("/");
    }

    // might need to do manual if error
    Moralis.Cloud.run("fetchJSON", { theUrl: NFT.token_uri })
      .then((res) => {
        let metadata = res.data;
        if (!metadata) {
          console.log("No metadata found x2, giving up: " + NFT.token_address + " which has url " + NFT.token_uri);
        }
        // not sure if .detail is correct here
        else if (
          metadata?.detail &&
          metadata.detail.includes("Request was throttled")
        ) {
          // console.log("Request was throttled, will keep re-trying: " + NFT.token_address);
          setTimeout(function () {
            getMetadata(NFT);
          }, 1000);
        }
        else {
          setMetadata(NFT, metadata);
          // console.log("Found metadata for: " + NFT.token_address);
        }
      })
      .catch((err) => {
        console.log("Error1: " + err + " with " + NFT.token_address + " which has url " + NFT.token_uri);

        fetch(NFT.token_uri)
          .then((res) => res.json())
          .then((data) => {
            setMetadata(NFT, data);
          })
          .catch((err) => {
            console.log("Error2: " + err + " with " + NFT.token_address + " which has url " + NFT.token_uri);
          });
      });
  }

  function setMetadata(NFT, metadata) {
    NFT.metadata = metadata;
    if (metadata?.image) NFT.metadata.image = resolveLink(metadata.image);
    if (metadata && !results[NFT.token_uri])
      setResults({ ...results, [NFT.token_uri]: NFT });
  }

  const resolveLink = (url) => {
    if (!url || !url.includes("ipfs://")) return url;
    return url.replace("ipfs://", "https://gateway.ipfs.io/ipfs/");
  };

  return { verifyMetadata };
}

export default useVerifyMetadata