/* An utility function to make string formating easy. */
String.prototype._ = function(obj) this.replace(/\{(.+?)\}/g, function(m, key) obj[key]);

var suggest_base_url = 'http://{lang}.wikipedia.org/w/api.php?action=opensearch&format=json&limit={limit}&search={keyword}'
var wikipage_base_url = 'http://{lang}.wikipedia.org/wiki/{title}'
var default_lang = liberator.globalVariables.wikipedia_default_lang || 'en';
var limit = liberator.globalVariables.wikipedia_limit || 20;

commands.addUserCommand(['wiki[pedia]'], 'Wikipedia',
  function(args) {  /* The action function for 'wikipedia' command. */
    if(args.length > 1 && args[0].length > 1 && args[0][0] == '.') {
      /* A language is specified. */
      var lang = args[0].substr(1);
      args.shift();
    } else
      var lang = default_lang;
    for(title of args)  /* Open a new wiki tab for each word. */
      liberator.open(wikipage_base_url._({lang: lang, title: encodeURIComponent(title)}), liberator.NEW_TAB);
  }, {
    completer: function(ctx, args) {
      ctx.title = ['Suggestions', 'Descriptions'];
      if(args.length > 1 && args[0].length > 1 && args[0][0] == '.')
        /* A language if specified. */
        var lang = args[0].substr(1);
      else
        var lang = default_lang;
      /* Asynchronously get wiki suggestions. */
      util.httpGet(suggest_base_url._({lang: lang, limit: limit, keyword: ctx.filter}), function(xhr) {
        var completions = [];
        var suggestions = JSON.parse(xhr.responseText);
        for(var i = 0; i < suggestions[1].length; ++i)
          completions.push([suggestions[1][i], suggestions[2][i]]);
        /* You CANNOT just push items into ctx.completions, which seems to only
         * respect assignment. */
        ctx.completions = completions;
      });
    }
  },
  true  /* Replace the existing command (if any). */
);
