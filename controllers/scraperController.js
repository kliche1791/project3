const db = require("../models");
const router = require("express").Router();
var cheerio = require("cheerio");
// Makes HTTP request for HTML page
var axios = require("axios");
const articlesController = require("./articlesController");

console.log("here in teh scraperController.js in the controllers folder");
//Defining methods for the booksController
module.exports = {
  scrapeReddit: function(req, res) {
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // get the reddit topics and use it for comparing
    axios.get("https://old.reddit.com").then(function(response) {
      // Load the HTML into cheerio and save it to a variable
      // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
      var $ = cheerio.load(response.data);

      // An empty array to save the data that we'll scrape
      var r_topicresults = [];

      // With cheerio, find each p-tag with the "tagline" class
      // (i: iterator. element: the current element)
      $("p.tagline").each(function(i, element) {
        // Save the text of the element in a "topic" variable
        var topic = $(element)
          .text()
          .split("/")[1];

        console.log(
          "topic here is = " +
            topic.toUpperCase() +
            " and req body is " +
            req.body.title.toUpperCase()
        );

        if (req.body.title.toUpperCase() === topic.toUpperCase()) {
          console.log("strings match " + topic);

          // once we have the topic match to what user has inputted, we need to pull the news here using another axios call

          console.log(
            "\n***********************************\n" +
              "When the search topic matches, Capture the name and link\n" +
              "from Reddit  board:" +
              "\n***********************************\n"
          );

          // Making a request via axios for reddit's "webdev" board. The page's HTML is passed as the callback's third argument
          axios
            .get("https://old.reddit.com/r/" + topic + "/")
            .then(function(response) {
              // Load the HTML into cheerio and save it to a variable
              // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
              var $ = cheerio.load(response.data);

              // An empty array to save the data that we'll scrape
              var reddit_results = [];

              // With cheerio, find each p-tag with the "title" class
              // (i: iterator. element: the current element)
              $("p.title").each(function(i, element) {
                // Save the text of the element in a "title" variable
                var title = $(element).text();

                // In the currently selected element, look at its child elements (i.e., its a-tags),
                // then save the values for any "href" attributes that the child elements may have
                var link = $(element)
                  .children()
                  .attr("href");

                // console.log("link is " + link);
                // Save these results in an object that we'll push into the results array we defined earlier
                reddit_results.push({
                  subject: topic,
                  title: title,
                  link: link
                });
              });

              // Log the results once you've looped through each of the elements found with cheerio
              //  console.log(results);

              articlesController.create(reddit_results);
            });

          // push the results to database

          // Save these results in an object that we'll push into the results array we defined earlier
          r_topicresults.push({
            topic: topic
            // link: link
          });
        }
      });

      // Log the results once you've looped through each of the elements found with cheerio
      if (r_topicresults.length === 0) {
        console.log("No results found for the topic " + req.body.title);
      } else {
        console.log(r_topicresults);
      }
    });
  },
  scrapeNYTimes: function(req, res) {
    // get the reddit topics and use it for comparing
    axios.get("https://nytimes.com").then(function(response) {
      // Load the HTML into cheerio and save it to a variable
      // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
      var $ = cheerio.load(response.data);

      // An empty array to save the data that we'll scrape
      var ny_topicresults = [];

      // With cheerio, find each p-tag with the "tagline" class
      // (i: iterator. element: the current element)
      $(".css-cwdrld").each(function(i, element) {
        // Save the text of the element in a "topic" variable
        var ny_topic = $(element).text();

        console.log(
          "topic from NYTimes here is = " +
            ny_topic.toUpperCase() +
            " and req body is " +
            req.body.title.toUpperCase()
        );
      });

      if (req.body.title.toUpperCase() === ny_topic.toUpperCase()) {
        console.log("strings match " + ny_topic);

        // once we have the topic match to what user has inputted, we need to pull the news here using another axios call

        console.log(
          "\n***********************************\n" +
            "When the search topic matches, Capture the name and link\n" +
            "from NYTimes  website:" +
            "\n***********************************\n"
        );
      }

      // Log the results once you've looped through each of the elements found with cheerio
      //   console.log(results);
    });
  }
};
