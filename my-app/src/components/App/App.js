import { Component, useState, useEffect } from "react";
import ImageGallery from "../ImageGallery";
import serviceAPI from "../../Api/serviceAPI/serviceAPI";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../Button";
import Modal from "../Modal";
import { ModalImg } from "../Modal/Modal.styled";
import Loader from "../Loader";
import Searchbar from "../Searchbar";
import GlobalStyle from "../../Style/globalStyles";

const Status = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};
export default function App() {
  const [seacrhQuery, setSeacrhQuery] = useState("");
  const [gallery, setGallery] = useState([]);
  const [page, setPage] = useState(1);
  const [eror, setEror] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const [urlImg, setUrlImg] = useState("");

  const [showModal, setShowModal] = useState(false);

  const handleFormSubmit = (query) => {
    setSeacrhQuery(query);
    setPage(1);
    setGallery([]);
  };

  useEffect(() => {
    if (!seacrhQuery) return;
    setStatus(Status.PENDING);

    const fetchGallary = () => {
      serviceAPI
        .fetchImg(seacrhQuery, page)
        .then(({ hits }) => {
          setGallery((prevState) => [...prevState, ...hits]);
          setPage(page);
          setStatus(Status.RESOLVED);

          if (page !== 1) scrollPage();
        })

        .catch((error) => {
          setEror(error);
          setStatus(Status.REJECTED);
        });
    };

    fetchGallary();
  }, [page, seacrhQuery]);

  const onClickImageURL = (urlImg) => {
    setUrlImg(urlImg);
    toggleModal();
  };

  const scrollPage = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  const onLoadMore = () => {
    setPage(page + 1);
    setStatus(Status.PENDING);
  };

  const toggleModal = () => {
    setShowModal((showModal) => !showModal);
  };
  return (
    <>
      <GlobalStyle />
      <Searchbar onSubmit={handleFormSubmit} />
      {status === "idle" && null}

      {status === "pending" && <Loader />}

      {status === "rejected" && <div>{eror}</div>}

      {status === "resolved" && (
        <>
          <ToastContainer />

          <ImageGallery hits={gallery} onClick={onClickImageURL} />
          {gallery.length > 0 ? <Button onLoadMore={onLoadMore} /> : null}
          {showModal && (
            <Modal onClose={toggleModal}>
              <ModalImg src={urlImg} />
            </Modal>
          )}
        </>
      )}
    </>
  );
}
