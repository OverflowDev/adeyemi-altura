import {useState} from 'react'

import Modal from '../modal/Modal'

function MyNfts() {

    const [loading, setLoading] = useState(false)

    const [searchText, setSearchText] = useState('')

    const [nfts, setNfts] = useState([])

    const [showModal, setShowModal] = useState(false)
    const handleOnClose = () => setShowModal(false)

    const [selectedNft, setSelectedNft] = useState([null])

    const onChangeSearchText = (e) => {
        setSearchText(e.target.value)
    }

    // handle submit 
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const response = await fetch(`https://api.alturanft.com/api/v2/user/items/${searchText}`);
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json()
            if (data && data.items) {
                setLoading(false);
                setNfts(data.items);
              } else {
                setLoading(false);
                setNfts([]);
            }
        } catch (error) {
            console.error(error);
        }
    }

    

    if(!nfts) return null

  return (
    <div className='py-4 flex flex-col items-center justify-center'>
        {/* Search input start here  */}
        <div>
            <div className="relative text-gray-600">
                <form onSubmit={handleSubmit}>
                    <input 
                        className="bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none w-full" 
                        type="search" 
                        name="search" 
                        value={searchText}
                        onChange={onChangeSearchText}
                        placeholder="Search" 
                    />
                    <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </button>
                </form>
            </div>

        </div>
        {/* Search input end here  */}

        {/* NFT grid start here  */}
        {loading ? 
            <div className='h-screen flex items-center text-white'>
                Loading...
            </div>
            : 
            
            <div>
                {/* Check  if search text is not empty */}
                {searchText ? (
                    // check nfts array is greater than 0 
                    nfts.length > 0 ? 
                        <div className='grid md:grid-cols-3 gap-4 mt-12'>
                            {nfts.map((nft, i) => (
                                <div 
                                    key={i}
                                    onClick={() => {
                                        setShowModal(!showModal)
                                        setSelectedNft(nft)
                                    }}
                                    className="relative bg-white font-semibold text-center rounded-3xl border shadow-lg p-10 max-w-xs cursor-pointer hover:bg-gray-100"
                                >
                                    <div className='bg-[#f65ae2] w-16 h-8 text-semibold text-md absolute top-0 right-0 rounded-tr-3xl '>{nft.tokenId}</div>
                                    <img className="mb-3 w-32 h-32 rounded-full shadow-lg mx-auto" src={nft.imageUrl} alt="NftImage" />
                                    <h1 className="text-lg text-gray-700"> {nft.name} </h1>
                                    <h3 className="text-sm text-gray-400 "> creator - {nft?.collectionAddress.substring(0,5)}...{nft?.collectionAddress.substring(nft?.collectionAddress.length - 5)} </h3>
                                </div>
                                
                            ))}
                        </div> 
                            : 
                        <div className='h-screen flex items-center justify-center text-white'>
                            No data found
                        </div>
                    
                ) : (
                    <div className='h-screen flex items-center justify-center text-white'>
                        Please enter an address to search
                    </div>
                )
                
            }
            </div>
        }
                

        {/* NFT grid end here  */}

        {/* Modal component  */}
        <Modal onClose={handleOnClose} visible={showModal} selectedNft={selectedNft} owner={searchText} />


    </div>
  )
}

export default MyNfts