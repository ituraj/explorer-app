import React from "react";

const Gallery = ({ gallery, photos }) => (
  <section className="gallery">
    {photos.map(({ farm, server, id, secret, title, pathalias }) => (
      <figure className="gallery-figure" key={id}>
        <a
          className="gallery-link"
          href={`https://www.flickr.com/photos/${pathalias}/${id}/in/gallery-flickr-${gallery}/`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="gallery-img"
            src={`https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`}
            alt={title}
          />
          <div className="overlay">
            <span>{title ? title : "A beautiful photo"}</span>
          </div>
        </a>
      </figure>
    ))}
  </section>
);

export default Gallery;
