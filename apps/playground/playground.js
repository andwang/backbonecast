$(function() {
  var editor = ace.edit("editor");
  editor.setTheme("ace/theme/monokai");
  var JavaScriptMode = require("ace/mode/javascript").Mode;
  editor.getSession().setMode(new JavaScriptMode());
  editor.getSession().setValue('var x = 3;\nvar y = 4;\nreturn (x + y);');
  $('.run').click(function() {
    var code = editor.getSession().getValue();
    try {
      var result = eval(code);
      $('.result').html(result.toString()); 
    } catch (e) {
      $('.result').html(e.message);
    }
  });
});
