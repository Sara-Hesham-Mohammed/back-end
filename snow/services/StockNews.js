function getStockNews() {
    //ajax call to GET needed information from base URL(also search URL in this instance)
    $.ajax({
      url: baseNewsURL,
      method: "GET",
      //JS promise to complete after ajax call comes back
    }).then(function (newsData) {
      // console.log(newsData);
      //using jQuery to get dummy div on prototype html
      let divStockNews = $("#stock-news");
      //adding an hr to the top of the display
      divStockNews.append("<hr>");
      //for loop to populate html with current stock news
      for (var i = 0; i < newsData.news.length; i++) {
        //setting variable to contain publication dat
        let publicationDate = newsData.news[i].publication_date;
        // console.log(publicationDate);
        //variable holding a sliced form of the publication date
        let publicationDate1 = publicationDate.slice(0, 10);
        //variable holding the final publication date and a ":" to display on screen
        let newPublicationDate = publicationDate1 + ": ";
        //variable to hold article title
        let publicationTitle = newsData.news[i].title;
        // console.log(publicationTitle);
        //variable to hold URL link to article
        let publicationURL = newsData.news[i].url;
        // console.log(publicationURL);
        //jQuery appending title, date, and publication to dummy html elements to see how display looks
        divStockNews.append(`<p id=publication-date>${newPublicationDate}</p>`);
        divStockNews.append(`<p id=pubication-title>${publicationTitle}</p>`);
        divStockNews.append(
          `<a id=publication-URL href=${publicationURL}>${publicationURL}</a>`
        );
        //adding an hr below each entry for style.
        divStockNews.append("<hr>");
      }
    });
  }