import React from "react";
import PropTypes from "prop-types";
import { GalleryList } from "../ImageGallery/ImageGallery.styled";
import ImageGalleryItem from "../ImageGalleryItem";

const ImageGallery = ({ hits, onClick }) => {
  return (
    <GalleryList>
      {hits.map((item) => (
        <ImageGalleryItem
          key={item.id}
          webformatURL={item.webformatURL}
          largeImageURL={item.largeImageURL}
          tags={item.tags}
          onClick={onClick}
        />
      ))}
    </GalleryList>
  );
};
ImageGallery.propTypes = {
  onClick: PropTypes.func.isRequired,
  hits: PropTypes.array.isRequired,
};

export default ImageGallery;
