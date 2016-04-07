
describe('Inverted Index', function(){

    beforeEach(function() {
        this.pageItem = new Index();
        this.pageItem.createIndex('./books.json');
    });

    describe('Read book data', function() {
        var result;
        it('should read json file', function(){
            result = this.pageItem.readFile('./books.json');
            expect(result).toBeDefined();
        });
    });


    describe('Populate Index', function() {
        var response;
        it('should create the index', function(){
            response = this.pageItem.getIndex();
            expect(response).toEqual(jasmine.any(Object));
        });

        it('should map the string keys to the correct objects', function(){
            response = this.pageItem.getIndex();
            expect(response).toEqual(jasmine.objectContaining({
                'Alice': [0, 0],
                'destroy': [1, 15]
            }));
        })
    });


    describe('Search index', function() {
        var searchTerm;
        it('should return array indices for search term', function(){
            searchTerm = this.pageItem.searchIndex('destroy');
            expect(searchTerm).toEqual(jasmine.any(Array));
            expect(searchTerm).toEqual([1,15]);
        });
    });

});







