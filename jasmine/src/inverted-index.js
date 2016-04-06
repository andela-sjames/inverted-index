var Index = function() {};

Index.prototype.readFile = function(filePath) {

  var jsonFile;
  $.ajax({
    'async': false,
    'url': filePath,
    'dataType': "json",
    'success': function(data) {
      jsonFile = data;
    }
  });

  return jsonFile;
}


Index.prototype.createIndex = function(filePath) {

    var uniqueTexts = []; //Stores unique texts
    var posIndex = []; //Stores the index

    var returnedArray, returnedText;
    returnedArray = this.readFile(filePath);

    returnedArray.forEach(function(arrayValue, id) {
        returnedText = arrayValue.text.replace(".", " ").split(" ");
        var id = id;
        // console.log(returnedText);

        returnedText.forEach(function(textValue, idx){

            var pos = uniqueTexts.indexOf(textValue);

            if (pos > -1) {
                var index = posIndex[pos];
                // console.log(index);
            } else {
                uniqueTexts.push(textValue);
                posIndex.push(idx);
            }
        })


    })

    this.generatedIndex = {
    uniqueTexts: uniqueTexts,
    textIndex: posIndex
  };
}


Index.prototype.getIndex = function() {

  return this.generatedIndex;
}


Index.prototype.searchIndex = function(item) {

  var itemIndex = this.getIndex().uniqueTexts.indexOf(item);

  if (itemIndex === -1) {
    return -1;
  } else {
    return this.getIndex().textIndex[itemIndex];
  }
}


