// CLIENT-SIDE JAVASCRIPT

$(function() {

  // `phrasesController` holds all our phrase funtionality
  var phrasesController = {
    
    // compile phrase template
    template: _.template($('#phrase-template').html()),
    //phrasesController.template
    //phrasesController.all();
    all: function() {
      $.get('/phrases', function(data) {
        var allPhrases = data;
        
        // iterate through allPhrases
        _.each(allPhrases, function(phrase) {
          // pass each phrase object through template and append to view
          var $phraseHtml = $(phrasesController.template(phrase));
          $('#phrase-list').append($phraseHtml);
        });
        // add event-handlers to phrases for updating/deleting
        phrasesController.addEventHandlers();
      });
    },

    create: function(newWord, newDefinition) {
      var phraseData = {word: newWord, definition: newDefinition};
      // send POST request to server to create new phrase
      $.post('/phrases', phraseData, function(data) {
        // pass phrase object through template and append to view
        var $phraseHtml = $(phrasesController.template(data));
        $('#phrase-list').append($phraseHtml);
      });
    },

    update: function(phraseId, updatedWord, updatedDefinition) {
      var phraseData2 = {id : phraseId, word : updatedWord, definition: updatedDefinition};
      // send PUT request to server to update phrase
      $.put("/phrases", phraseData, function (data) {});
      // pass phrase object through template and append to view
    },
    
    delete: function(phraseId) {
      // send DELETE request to server to delete phrase

      // remove deleted phrase li from the view
    },

    // add event-handlers to phrases for updating/deleting
    addEventHandlers: function() {
      // for update: submit event on `.update-phrase` form

      // for delete: click event on `.delete-phrase` button
    },

    setupView: function() {
      // append existing phrases to view
      phrasesController.all();
      
      // add event-handler to new-phrase form
      $('#new-phrase').on('submit', function(event) {
        event.preventDefault();
        var newWord = $('#new-word').val();
        var newDefinition = $('#new-definition').val();
        phrasesController.create(newWord, newDefinition);
        
        // reset the form
        $(this)[0].reset();
        $('#new-word').focus();
      });
    }
  };

  phrasesController.setupView();

});