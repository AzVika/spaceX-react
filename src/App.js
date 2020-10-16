import React from 'react';
import Header from './componets/Header/Header';
import Main from './componets/Main/Main';
import Features from './componets/Features/Features';
import Footer from './componets/Footer/Footer';
// import Calendar from './componets/Calendar/Calendar';
// import Details from './componets/Details/Details';

import FetchData from './service/FetchData';

import './style.css'; /* поключение стилей */

class App extends React.Component {

  fetchData = new FetchData();

  state = {
    rocket: 'Falcon 1',
    rocketFeatures: null,
    rockets: [],
  };

  componentDidMount() {
    this.updateRocket();
  }

  updateRocket() {
    this.fetchData.getRocket()
      .then(data => {
        this.setState( {rockets: data.map(item => item.name) });
        return data;
      })
      .then(data => data.find(item => item.name === this.state.rocket))
      .then(rocketFeatures => this.setState({ rocketFeatures }));
  }

  changeRocket = rocket => {
    this.setState({
      rocket
    }, this.updateRocket);
  }

  render() {
    console.log(this.state);
    return (
      <>
        <Header rockets={this.state.rockets} changeRocket={this.changeRocket} />
        <Main rocket={this.state.rocket} />
        <Features />
        <Footer />
      </>
    );
  }
}

export default App;
