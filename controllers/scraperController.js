const db = require("../models");
const router = require("express").Router();
var cheerio = require("cheerio");
// Makes HTTP request for HTML page
var axios = require("axios");
const articlesController = require("./articlesController");

console.log("here in teh scraperController.js in the controllers folder");
//Defining methods for the booksController
module.exports = {
  scrapeReddit: function(title) {
    console.log("inside scrapeReddit - req.body = " + title);
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // get the reddit topics and use it for comparing
    axios
      .get("https://old.reddit.com")
      .then(function(response) {
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
            "topic from Reddit here is = " +
              topic.toUpperCase() +
              " and req body is " +
              title.toUpperCase()
          );

          if (title.toUpperCase() === topic.toUpperCase()) {
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
                  var r_title = $(element).text();

                  // In the currently selected element, look at its child elements (i.e., its a-tags),
                  // then save the values for any "href" attributes that the child elements may have
                  var link = $(element)
                    .children()
                    .attr("href");

                  // console.log("link is " + link);
                  // Save these results in an object that we'll push into the results array we defined earlier
                  reddit_results.push({
                    subject: topic,
                    title: r_title,
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
          console.log("No results found for the topic " + title);
        } else {
          console.log(r_topicresults);
        }
      })
      .catch(e => {
        console.error(e);
      });
  },
  scrapeNYTimes: function(title) {
    console.log("inside scrapeNYTime - req.body.title = " + title);
    // get the reddit topics and use it for comparing
    axios
      .get("https://nytimes.com")
      .then(function(response) {
        // Load the HTML into cheerio and save it to a variable
        // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
        var $ = cheerio.load(response.data);

        // With cheerio, find each p-tag with the "tagline" class
        // (i: iterator. element: the current element)
        $(".css-cwdrld").each(function(i, element) {
          // Save the text of the element in a "topic" variable
          var ny_topic = $(element).text();

          console.log(
            "topic from NYTimes here is = " +
              ny_topic.toUpperCase() +
              " and req body is " +
              title.toUpperCase()
          );

          if (title.toUpperCase() === ny_topic.toUpperCase()) {
            console.log("strings match " + ny_topic);

            // once we have the topic match to what user has inputted, we need to pull the news here using another axios call

            console.log(
              "\n***********************************\n" +
                "When the search topic matches, Capture the name and link\n" +
                "from NYTimes  website:" +
                "\n***********************************\n"
            );

            // Making a request via NYTimes Section board. The page's HTML is passed as the callback's third argument
            axios
              .get("https://nytimes.com/section/" + ny_topic.toLowerCase())
              .then(function(response) {
                // Load the HTML into cheerio and save ipt to a variable
                // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
                var $ = cheerio.load(response.data);

                // An empty array to save the data that we'll scrape
                var ny_results = [];

                // With cheerio, find each p-tag with the "title" class
                // (i: iterator. element: the current element)
                $("h2").each(function(i, element) {
                  // Save the text of the element in a "title" variable
                  var ny_title = $(element).text();
                  //.split("/")[1];

                  // In the currently selected element, look at its child elements (i.e., its a-tags),
                  // then save the values for any "href" attributes that the child elements may have
                  var link = $(element)
                    .children()
                    .attr("href");
                  var new_link = changeLink(link);
                  function changeLink(old_link) {
                    if (old_link && old_link.substr(1) === "/") {
                      return "https://nytimes.com" + old_link;
                    } else if (old_link) {
                      return "https://nytimes.com/" + old_link;
                    } else if (old_link === "undefined") {
                      return "no link";
                    }
                  }

                  console.log(" new_link after change = " + new_link);
                  // Save these results in an object that we'll push into the results array we defined earlier
                  ny_results.push({
                    subject: ny_topic,
                    title: ny_title,
                    link: new_link
                  });
                });
                console.log("before pushing the results to DB ");
                articlesController.create(ny_results);
                // Log the results once you've looped through each of the elements found with cheerio
                console.log(ny_results);
              });
          }
        });
        // Log the results once you've looped through each of the elements found with cheerio
        //   console.log(results);
      })
      .catch(e => {
        console.error(e);
      });
  }
};