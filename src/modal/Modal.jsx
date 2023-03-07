
function Modal({onClose, visible, selectedNft, owner}) {

    const handleOnClose = (e) => {
        if(e.target.id === 'container') onClose()
    }

    // checking chainId 
    const getChainId = (chainId) => {
        
        switch (chainId) {
            case 1:
                return 'ethereum'
            case 137:
                return 'matic'
            case 56:
                return 'bsc'
            case 10:
                return 'optimism'
            case 42161:
                return 'arbitrum'
            case 8217:
                return 'klaytn'
            case 43114:
                return 'avalanche'
            default:
                return ''
            }

    }

    const chain = getChainId(selectedNft?.chainId)

    if(!visible) return null

  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
        onClick={handleOnClose}
        id='container'
    >
        <div className='dark:bg-gray-100 bg-gray-100 w-full mx-4 p-4 rounded-xl md:w-1/2 lg:w-1/3'>
        
            {/* MODAL HEADER */}
            <div className="flex justify-between items center border-b border-gray-200 py-3">
                <div className="flex items-center justify-center">
                    <p className="text-xl font-bold text-gray-800">{selectedNft.name}</p>
                </div>

                <button 
                    className="bg-gray-300 hover:bg-gray-500 cursor-pointer hover:text-gray-300 font-sans text-gray-500 w-8 h-8 flex items-center justify-center rounded-full uppercase"
                    onClick={onClose}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            {/* MODAL HEADER ENDED */}

            {/* MODAL BODY  */}
            <div className="my-4 relative">

                <div 
                    className=""
                >
                    <div className='bg-[#f65ae2] w-20 h-8 px-6 text-bold text-md absolute top-0 right-0 rounded flex justify-center items-center '>{selectedNft?.properties[0]?.value}</div>

                    <img className="mb-3 w-32 h-32 rounded-full shadow-lg mx-auto" src={selectedNft?.imageUrl} alt="productdesigner" />
                    <div className='flex flex-col justify-center'>
                        <h1 className="text-lg text-center text-gray-700"> {selectedNft.name}</h1>
                        <h3 className="text-sm text-center text-gray-500 ">creator- {selectedNft?.collectionAddress.substring(0,5)}...{selectedNft?.collectionAddress.substring(selectedNft?.collectionAddress.length - 5)} </h3>
                        <div className='flex mt-4 justify-center border-t-2 border-b-2'>
                            <h1 className='text-bold text-sm tracking-wider'>{owner}</h1>
                        </div>
                        <p className="text-md text-center text-gray-700 mt-4"> {selectedNft.description}</p>
                        {/* Owner address */}
                        {/* Supply  */}
                        <div className='flex mt-4 justify-center border-t-2'>
                            <h1 className='text-bold text-lg tracking-wider'>{selectedNft?.maxSupply} - Supply </h1>
                        </div>
                        <button className="bg-[#58d0ea] hover:bg-[#083b46] px-8 py-2 mt-8 rounded-3xl text-gray-100 font-semibold tracking-wider">
                            <a href={`https://opensea.io/assets/${chain}/${selectedNft?.collectionAddress}/${selectedNft?.tokenId}`} target='_blank' rel='noreferrer'>
                                Buy on OpenSea
                            </a>
                        </button>
                    </div>
                </div>

            </div>
            {/* MODAL BODY ENDED  */}

        </div>
</div>
  )
}

export default Modal