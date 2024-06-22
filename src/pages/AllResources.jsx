import React,{ useState, useRef} from 'react'
import Modal from 'react-modal'

const videos = [
  { id: 1, title: "Video 1", category:"diabetes", src: "/src/assets/videos/video4.mp4" },
  { id: 2, title: "Video 2", category:"diabetes", src: "/src/assets/videos/video4.mp4" },
  { id: 3, title: "Video 3", category:"hypertension", src: "/src/assets/videos/video4.mp4" },
  { id: 4, title: "Video 4", category:"diabetes", src: "/src/assets/videos/video4.mp4" },
  { id: 5, title: "Video 5", category:"hypertension", src: "/src/assets/videos/video4.mp4" },
  { id: 6, title: "Video 6", category:"diabetes", src: "/src/assets/videos/video4.mp4" },
  { id: 7, title: "Video 7", category:"cardio", src: "/src/assets/videos/video4.mp4" },
  { id: 8, title: "Video 8", category:"diabetes", src: "/src/assets/videos/video4.mp4" }
];
const AllResources = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [currentPlayingId, setCurrentPlayingId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [videosPerPage] = useState(6);
  const videoRefs = useRef({});
  const [searchTerm,setSearchTerm]=useState('');
  const [openUploadModal,setOpenUploadModal]=useState(false);
  const uploadModal = () => setOpenUploadModal(true);
  const closeUploadModal = () => setOpenUploadModal(false);

  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const filteredVideos = videos.filter(video => video.category.toLowerCase().includes(searchTerm.toLowerCase()));
  const currentVideos = filteredVideos.slice(indexOfFirstVideo, indexOfLastVideo);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const togglePlayPause = (id) => {
    setSelectedVideo(videos.find(video => video.id === id));
    setCurrentPlayingId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (selectedVideo) {
      videoRefs.current[selectedVideo.id].pause();
    }
    setIsModalOpen(false);
    setSelectedVideo(null);
    setCurrentPlayingId(null);
  };

  const handleVideoClick = () => {
    togglePlayPause(selectedVideo.id);
  };
  return (
    <React.Fragment>
    <div className="container mx-auto py-6">
      <div className="flex flex-row mb-8 mr-14 justify-around items-center w-full">
        <h1 className="text-3xl font-bold text-center my-3 text-blue-600">
                Education Resources
        </h1>
        <input type='text' placeholder='Search ...' value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} className='text-sm focus:outline-none h-10 w-[24rem] border border-gray-300 rounded-[40px] px-3 pl-11 pr-4' />
        <button onClick={uploadModal} className='bg-white border border-blue-600 p-2 rounded-md text-blue-600 hover:bg-blue-600 hover:text-white'>Add new Item</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {currentVideos.map(video => (
          <div key={video.id} className="relative">
            <video
              ref={el => videoRefs.current[video.id] = el}
              className="w-full h-auto"
              src={video.src}
              onClick={() => togglePlayPause(video.id)}
            >
              Your browser does not support the video tag.
            </video>
            <button
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-2xl"
              style={{ display: currentPlayingId === video.id ? 'none' : 'block' }}
              onClick={() => togglePlayPause(video.id)}
            >
              ▶️
            </button>
            <div className='absolute top-36 left-6'>
              <h3 className='text-white font-semibold text-md text-left'>{video.title}</h3>
              <h4 className='text-white font-semibold text-sm text-center'>{video.category}</h4>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(videos.length / videosPerPage) }, (_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`px-3 py-2 mx-1 rounded-md ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {isModalOpen && selectedVideo && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Video Player"
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-90"
          overlayClassName="fixed inset-0 bg-transparent" 
        >
          <div className="relative bg-transparent p-4 rounded-md w-11/12 max-w-3xl">
            <button onClick={closeModal} className="absolute top-1 right-1 px-2 py-1 bg-red-500 text-white rounded-full">
              X
            </button>
            <video
              ref={el => videoRefs.current[selectedVideo.id] = el}
              autoPlay
              controls
              className="w-full"
              src={selectedVideo.src}
              onClick={handleVideoClick}
            >
              Your browser does not support the video tag.
            </video>
            
          </div>
        </Modal>
      )}
      {openUploadModal&&
      <Modal
      isOpen={uploadModal}
      onRequestClose={closeUploadModal}
      contentLabel="Add New Patient"
      className="flex items-center h-[60%] w-[60%] bg-white p-5 rounded-lg shadow-lg"
      overlayClassName="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center"
    >
      <div className="rounded-lg flex flex-col justify-center h-full w-full items-center">
        <h2 className="text-2xl font-bold mb-3 text-blue-700">Education Resource Uploading</h2>
        <form className="w-full h-full p-5">
          <div className='mb-2'>
            <label className="block font-semibold text-gray-700">Title</label>
            <input type="text" name='name'  className="w-[90%] p-2 border rounded-lg" required />
          </div>
          <div className='mb-2'>
            <label className="block font-semibold text-gray-700">Category</label>
            <input type="email" name='email'  className="w-[90%] p-2 border rounded-lg" required />
          </div>
          <div className='mb-2'>
            <label className="block font-semibold text-gray-700">Upload</label>
            <input type="file" name="phoneNumber"  className="w-[90%] p-2 border rounded-lg" required />
          </div>
          <div className="flex justify-end gap-4 mt-6 items-center">
            <button type="button" onClick={closeUploadModal} className="bg-gray-400 text-white px-4 py-1 rounded-lg">Cancel</button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded-lg">Save</button>
          </div>
        </form>
      </div>
    </Modal>
}
    </div>
</React.Fragment>
  )
}

export default AllResources
