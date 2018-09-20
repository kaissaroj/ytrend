import React from 'react';

import ProgressiveImage from "react-progressive-image-loading";


class VideoLists extends React.Component {

  constructor(props) {
    super(props);
    this.videoClicked = this.videoClicked.bind(this);
  }

  videoClicked(id){
  	let url = `https://www.youtube.com/watch?v=${id}`;
  	if(!!id){
   		let win = window.open(url, '_blank');
  		win.focus();
  	}
  }
  render() {
  	const videoDetails = this.props.data;
    return (
      <div>
        <div className="hr"></div>
        <div className="row flex-center video_box" onClick={() => this.videoClicked(videoDetails.id)}>
          <div className="sm-3 col">
            <ProgressiveImage
                preview={videoDetails.snippet.thumbnails.default.url}
                src={videoDetails.snippet.thumbnails.medium.url}
                render={(src) => <img src={src} alt=""/>}
            />
          </div>
          <div className="sm-9 col">
            <p>{videoDetails.snippet.title}</p>
            <p className="views-c">{videoDetails.snippet.channelTitle} 
            </p>
               <p className="desc">{videoDetails.snippet.description.substring(0, 190)}...</p>
          </div>
        </div>
     </div>
    );
  }
}

export default VideoLists;