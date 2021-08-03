import React from 'react';
import loadingGif from '../images/gif/loading-arrow.gif';

Loading.propTypes = {};

function Loading(props) {
  return (
    <div className="loading">
      <h4>room loading...</h4>
      <img src={loadingGif} alt="" />
    </div>
  );
}

export default Loading;
