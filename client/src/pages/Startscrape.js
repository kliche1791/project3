import React, { Component } from "react";
// import { Linking } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import "./Startscrape.css";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

class Startscrape extends Component {
  state = {
    title: "",
    articles: [],
    searchCriteria: ""
  };

  componentDidMount() {
    this.loadArticles();
  }

  loadArticles = () => {
    API.getArticles()
      .then(res =>
        this.setState({
          articles: res.data,
          title: "",
          searchCriteria: ""
        })
      )
      .catch(err => console.log(err));
  };

  deleteArticle = id => {
    API.deleteArticle(id)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.searchCriteria) {
      alert("A search topic was submitted: " + this.state.searchCriteria);
      API.saveArticle({
        title: this.state.searchCriteria
      })
        .then(res => this.loadArticles())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            {/* <Jumbotron> */}
            <h1 className="mytitle">Explore the best of MyNewsNow</h1>
            {/* </Jumbotron> */}
            <form>
              <div>
                <Input
                  value={this.state.searchCriteria}
                  onChange={this.handleInputChange}
                  name="searchCriteria"
                  style={{ width: "70%" }}
                  placeholder="Enter the search topic (Required)"
                />
                {/* <Input
                value={this.state.author}
                onChange={this.handleInputChange}
                name="author"
                placeholder="Author (required)"
              />
              <TextArea
                value={this.state.synopsis}
                onChange={this.handleInputChange}
                name="synopsis"
                placeholder="Synopsis (Optional)"
              /> */}
                <FormBtn
                  className="searchBtn"
                  disabled={!this.state.searchCriteria}
                  onClick={this.handleFormSubmit}
                >
                  Submit Search
                </FormBtn>
              </div>
            </form>
          </Col>
        </Row>
        <Row>
          <Col size="md-4">
            <h1 className="mytitle">Search from Washington Post</h1>
          </Col>
          <Col size="md-4">
            <h1 className="mytitle">Search from New York Times</h1>
          </Col>
          <Col size="md-4">
            <h1 className="mytitle">Search from Reddit</h1>
          </Col>
        </Row>
        <Row>
          <Col size="md-4">
            {/* Need to write logic for looping the database and displaying the articles resulted from the search --  */}
            {/* <Col size="md-6 sm-12"> */}
            <div className="scrollable">
              <h1>News from Washington Post</h1>
              <h1>News from Washington Post</h1>
              <h1>News from Washington Post</h1>
              <h1>News from Washington Post</h1>
              <h1>News from Washington Post</h1>
              <h1>News from Washington Post</h1>
              <h1>News from Washington Post</h1>
              <h1>News from Washington Post</h1>
            </div>
          </Col>
          <Col size="md-4">
            {/* Need to write logic for looping the database and displaying the articles resulted from the search --  */}
            {/* <Col size="md-6 sm-12"> */}
            <div className="scrollable">
              {this.state.articles.length ? (
                <List>
                  {this.state.articles.map(article => (
                    <ListItem key={article._id}>
                      {/* <Link to={"/articles/" + article._id}> */}
                      <strong>
                        {article.title}
                        {<p></p>}
                        {
                          <a
                            href={article.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {article.link}{" "}
                          </a>
                        }
                      </strong>
                      {/* </Link> */}
                      {/* <DeleteBtn onClick={() => this.deleteBook(book._id)} /> */}
                    </ListItem>
                  ))}
                </List>
              ) : (
                <h3>No Results to Display</h3>
              )}
            </div>
          </Col>
          <Col size="md-4">
            {/* Need to write logic for looping the database and displaying the articles resulted from the search --  */}
            {/* <Col size="md-6 sm-12"> */}
            <div className="scrollable">
              {this.state.articles.length ? (
                <List>
                  {this.state.articles.map(article => (
                    <ListItem key={article._id}>
                      {/* <Link to={"/articles/" + article._id}> */}
                      <strong>
                        {article.title}
                        {<p></p>}
                        {
                          <a
                            href={article.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {article.link}{" "}
                          </a>
                        }
                      </strong>
                      {/* </Link> */}
                      {/* <DeleteBtn onClick={() => this.deleteBook(book._id)} /> */}
                    </ListItem>
                  ))}
                </List>
              ) : (
                <h3>No Results to Display</h3>
              )}
            </div>
          </Col>

          {/*  {this.state.articles.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book._id}>
                    <Link to={"/books/" + book._id}>
                      <strong>
                        {book.title} by {book.author}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col> */}
        </Row>
      </Container>
    );
  }
}

export default Startscrape;
