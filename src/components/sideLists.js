import React from 'react';
import '../paper.min.css';
import '../css/custom.css';

const countryLists = require('../data/countries.json');

class SideLists extends React.Component {
  constructor(props) {
    super(props);
    this.renderCountry = this.renderCountry.bind(this);
    this.filterList = this.filterList.bind(this);
    this.selecteCountry = this.selecteCountry.bind(this);

    this.state ={
      filterC:null,
      selectedCountryName : "United States"
    }

  }
  selecteCountry(v){
      this.setState({selectedCountryName:v.name}, function () {
      });
    this.props.handleCountryCode(v.code);  
  }

  renderCountry(v){
    if(!!v)
  		return (
  				<p key={v.code} onClick={()=>this.selecteCountry(v)} className="cc">{v.name}</p>

  			)  	
  }
  filterList(key) {
    
    if(this.state.filterC){
    let haystack = key.name.toLowerCase();
    let needle = this.state.filterC.toLowerCase();
    var index = haystack.indexOf(needle);
    if(index === -1)
      return false;
    }
    return true;

  }
  handleChange(e){
    this.setState({
      [e.target.name]:e.target.value
    })
  }
  render() {

    let countryName = this.state.selectedCountryName;
    return (
    <div>
          <div className="form-group">
            <input type="text" 
              name="filterC"
              placeholder="Search Country" id="search-country" 
              value={this.state.comment} 
              onChange={ this.handleChange.bind(this) } 
            />
        </div>
        <p className="cname">{countryName}</p>
        <hr />
        <div className="flex-spaces ullist">
        	   {countryLists.filter(this.filterList).map(this.renderCountry)}
        </div>
   </div>

    );
  }
}
export default SideLists;