import React, { Component } from 'react';
import axios from 'axios';
import './paper.min.css';
import './css/custom.css';

import SideLists from './components/sideLists';
import VideoLists from './components/videoLists';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      lists:[],
      selectedCode:'US'
    }
    this.videoLoop = this.videoLoop.bind(this);
    this.onSelectCountry = this.onSelectCountry.bind(this);
    this.pullData = this.pullData.bind(this);
  }
  componentDidMount() {
    this.pullData(this.state.selectedCode);
  }

 onSelectCountry = (value) => {
      this.pullData(value);
  }

  pullData(cCode){
      const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostpopular&regionCode=${cCode}&maxResults=25&key=AIzaSyDwLusKuELhvJjIHGxdldDRRe3CeWoOHyA`;
      const CancelToken = axios.CancelToken;
      const source = CancelToken.source();

        axios.get(url, {
          cancelToken: source.token
        }).catch(function(thrown) {
          if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
          } else {
           
          }
        }).then((response) =>{
          // this.setState({lists:response.data.items});
          this.setState({lists:response.data.items}, function () {
              console.log('updated .. ');
          });
        })
  }

  videoLoop(v){
        return <VideoLists data={v} key={v.etag}/>
  }
  render() {
    const videos = this.state.lists;
    return (
          <div className="row">
            <div className="col-2 col sidebar">
              <SideLists handleCountryCode={this.onSelectCountry}/>
            </div>
            <div className="col-10 col lists vlist">
              <div className="header">
                <h2>YTrending</h2>
                <p>Lists of Trending Videos WorldWide</p>
              </div>
                {videos.map(this.videoLoop)}
            </div>
          </div>
    );
  }
}

export default App;
