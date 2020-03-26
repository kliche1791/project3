import React, { Component } from "react";

class Scrape extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert("A search topic was submitted: " + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="searchtopic">
            <div className="mySearch">
              <div className="searchlabel">
                <label for="scrapemynews">
                  <strong>Explore the best of MyNewsNow</strong>
                </label>
              </div>
              <div className="myInput">
                <input
                  clasName="myTextInput"
                  type="text"
                  placeholder="Enter the search topic"
                  value={this.state.value}
                  onChange={this.handleChange}
                />
                <input type="submit" value="Search" className="mySearchBtn" />
              </div>
            </div>
            <small id="topicHelp" className="form-text text-muted">
              Enter the search topic and we'll search the topic among our
              collection of news articles from different websites.
            </small>
          </div>
        </form>
      </div>
    );
  }
}

export default Scrape;
