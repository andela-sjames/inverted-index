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

    var indexDict = {};
    var uniqueTexts = [];
    var posIndex = [];

    var returnedArray, returnedText;
    returnedArray = this.readFile(filePath);
    returnedArray.forEach(function(dictValue, id) {
        returnedText = dictValue.text.replace(/[\.|,|:]/g, " ").split(" ");

        returnedText.forEach(function(textValue, idx){

            var pos = uniqueTexts.indexOf(textValue);

            if (pos > -1) {
                var index = posIndex[pos];
                indexDict[textValue].push([id, idx])

            } else {
                uniqueTexts.push(textValue);
                posIndex.push(idx);

                indexDict[textValue] = [[id, idx]];
            }
        })
    })

    console.log(indexDict);

    this.generatedIndex = indexDict;
}


Index.prototype.getIndex = function() {

  return this.generatedIndex;
}


Index.prototype.searchIndex = function(item) {
    var item = item.toLowerCase();
    var result = this.getIndex()[item];
    if (typeof result === 'undefined') {

        return "Not found"
    } else return result.forEach(function(value) {
        console.log(value)
    });
}


