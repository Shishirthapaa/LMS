import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import Topbar from '../Component/Topbar';
import Studnavbar from '../Component/Studnavbar';
import "../Css/Studentlibrary.css";
import React, { useState } from 'react';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';


function Studentlibrary(){
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [staticBooks, setStaticBooks] = useState([]);
    const [error, setError] = useState(null);
    const [booksModal, setBooksModal] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);

    const handleOpenBooksModal = (book) => {
        setSelectedBook(book);
        setBooksModal(true);
        document.body.style.overflow = 'hidden';  
    };

    const handleCloseBooksModal = () => {
        setBooksModal(false);
        setSelectedBook(null);
        document.body.style.overflow = 'auto';  
    };


    useEffect(() => {
        const fetchStaticBooks = async () => {
            try {
                const response = await axios.get('http://localhost:3001/staticbooks');
                setStaticBooks(response.data);
            } catch (error) {
                console.error('Error fetching static books:', error);
                setError('Failed to fetch static books');
            }
        };

        fetchStaticBooks();
    }, []);
  
    const handleSearch = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/searchbooks?query=${searchQuery}`);
        if (!response.data) {
            throw new Error('No data received from the server');
          }
        setSearchResults(response.data);
        setError(null);
      } catch (error) {
        console.error('Error searching for books:', error);
        setError('Failed to fetch search results');
        setSearchResults([]);
      }
    };
    const handleReadMore = (id) => {
        console.log(`Book ID: ${id}`);
        const googleBooksUrl = `https://books.google.com/books?id=${id}`;
        window.open(googleBooksUrl, '_blank');
    };
  

    return(
        <>
            <div className={`overlay ${booksModal ? 'show' : ''}`}></div>
            <div className='headerrtop' >
                <Topbar />
            </div>
            <div className="siderrr" style={{ filter: booksModal ? 'blur(5px)' : 'none', pointerEvents: booksModal ? 'none' : 'auto' }}>
                <Studnavbar />
            </div>
            <div className="stdliball" style={{ filter: booksModal ? 'blur(5px)' : 'none', pointerEvents: booksModal ? 'none' : 'auto' }}>
                <div className='stdlibinfo'>
                    <div className='stdlibsearch'>
                        <div className='searchboxdiv'>
                            <input
                                type="text"
                                id="stdlibsearchbox"
                                placeholder="Search your favourite books"
                                color="white"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{ border: 'none' }}
                            />
                        </div>
                        <div className='searchicondiv'>
                            <SearchIcon onClick={handleSearch} style={{ fontSize: '40px', marginTop: '1%' }} className='searchiconn' />
                        </div>
                        {error && <p className='errordiv'>{error}</p>}
                    </div>
                </div>
                {searchResults.length === 0 ? (
                    <div className='stdlibbookcard'>
                        <div className='stdlibrec'>
                            <h5 className='stdlibrectext'>Recommended</h5>
                        </div>
                        <div className='stdlibrecbooks'>
                            {staticBooks.map((book) => (
                                <div className='bookscard' key={book.id} onClick={() => handleOpenBooksModal(book)}>
                                    <div className='bookscardtop'>
                                        <img src={book.coverUrl} alt="Book Cover" className='booksimgs' />
                                    </div>
                                    <div className='bookscardbottom'>
                                        <p className='stdbookstitle'>{book.title}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className='stdlibbookcard'>
                        <div className='stdlibrec'>
                            <h5 className='stdlibrectext'>Search Results: </h5>
                        </div>
                        <div className='stdlibrecbooks'>
                            {searchResults.map((book) => (
                                <div className='bookscard' key={book.id} onClick={() => handleOpenBooksModal(book)}>
                                    <div className='bookscardtop'>
                                        <img src={book.coverUrl} alt="Book Cover" className='booksimgs' />
                                    </div>
                                    <div className='bookscardbottom'>
                                        <p className='stdbookstitle'>{book.title}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {selectedBook && (
                <div
                    className={`modal fade ${booksModal ? 'show' : ''}`}
                    id="bookDetailsModal"
                    tabIndex="-1"
                    aria-labelledby="bookDetailsModalLabel"
                    aria-hidden="true"
                    style={{ display: booksModal ? 'block' : 'none', zIndex:'3000' }}
                    onClick={handleCloseBooksModal}
                >
                    <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content" style={{ height: '510px', width: '800px' }}>
                            <div className="modal-header">
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    onClick={handleCloseBooksModal}
                                ></button>
                            </div>
                            <div className="modal-body d-flex" style={{ flexDirection: 'row', height: '400px', width: '600px' }}>
                                <div style={{ flex: '30%' }}>
                                    <div style={{ backgroundColor: '#c495fc', borderRadius: '10px', width: '100%', height: '55%' }}>
                                        <img src={selectedBook.coverUrl} alt="Book Cover" style={{ width: '80%', height: '80%' }} />
                                    </div>
                                    <button id="readmorebtn" onClick={() => handleReadMore(selectedBook.id)}>Read More</button>
                                </div>
                                <div style={{ flex: '70%', paddingLeft: '20px', overflow: 'auto' }}>
                                    <h5 style={{ fontSize: '22px' }}>{selectedBook.title}</h5>
                                    <p><strong>Author:</strong> {selectedBook.author}</p>
                                    <p style={{ fontSize: '14px' }}>{selectedBook.description || 'No description available.'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
export default Studentlibrary;