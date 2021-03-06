import React, { Component } from 'react';
import Button from "./component/Button";
import './App.css';
const list = [
  {
  title: 'React',
  url: 'https://facebook.github.io/react/',
  author: 'Jordan Walke',
  num_comments: 3,
  points: 4,
  objectID: 0,
  },
  {
  title: 'Redux',
  url: 'https://github.com/reactjs/redux',
  author: 'Dan Abramov, Andrew Clark',
  num_comments: 2,
  points: 5,
  objectID: 1,
  },
];
const isSearched =  (searchTerm) => (item) => item.title.toLowerCase().includes(searchTerm.toLowerCase())
const Search = ({value,onChange,children}) => 
  <form>
    {children}<input type='text' value={value} onChange={onChange}/>
  </form>

const Table = ({list,pattern,onDismiss}) =>
<div>
  {
    list.filter(isSearched(pattern))
    .map(
      item =>
      <div key={item.objectID} className="table-row">
        <span><a href={item.url}>{item.title}</a></span>
            <span>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>
            <span>
              <Button onClick={() => onDismiss(item.objectID)} className="button-inline">
              Dismiss
              </Button>
            </span>
      </div>
    )
  }
</div>

class App extends Component {
  constructor(props)   {
    super(props)
    this.state = {
      list,searchTerm:''
    }
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }
  onDismiss(id) {
    const isNotId = item => item.objectID !== id
    const updatedList = this.state.list.filter(isNotId)
    this.setState({ list: updatedList });
  }    

  onSearchChange(event){
    this.setState({searchTerm:event.target.value})
  }
  render() {
    const {searchTerm,list} = this.state
    return (
      <div className="interactions">
        <Search value={searchTerm} onChange = {this.onSearchChange} >Search</Search>
        <Table list = {list} pattern = {searchTerm} onDismiss={this.onDismiss}/>
      </div>
    );
  }
}
export default App;
