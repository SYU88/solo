var Dumpling = Backbone.Model.extend({
  defaults: {
    name: 'Bunny',
    image: 'assets/dumpling.jpg',
    age: 0,
    health: 5,
    intelligence: 10,
    juiciness: 15,
    type: 'xiaolongbao'
  },
  initialize: function(){
    // this.getData();
    this.on('update', this.setData);
    this.on('getNew', this.retrieve);
  },
  retrieve: function(){
    var newDumpling = this.get('newDum');
    // console.log(newDumpling);
    this.getData(newDumpling);
  },
  processData: function(data){
    this.set('name', data.dumpling);
    this.set('age', data.age);
    this.set('health', data.health);
    this.set('intelligence', data.intelligence);
    this.set('juiciness', data.juiciness);
    this.set('type', data.type);
    this.set('image', data.image);
  },
  getData: function(data){
    var that = this;
    var dataObj = {
      'dumpling': data
    };
   $.ajax({
      type: 'POST',
      url: 'http://localhost:8080/data',
      data: dataObj,
      success: function(data) {
        console.log('success');
        that.processData(data);
       },
       error: function(){
        console.log('error');
       }
    });
  },
  createData: function(){
    var dataObj = {
      'dumpling': this.get('name'),
      'age': this.get('age'),
      'health': this.get('health'),
      'intelligence': this.get('intelligence'),
      'juiciness': this.get('juiciness'),
      'type': this.get('type'),
      'image': this.get('image')
    };
    return dataObj;
  },
  setData: function(){
  var data = this.createData();
  console.log(data);
  $.ajax({
     type: 'POST',
     url: 'http://localhost:8080/update',
     data: this.attributes,
     success: function(data) {
       console.log('success setting data');
      },
      error: function(){
       console.log('error');
      }
   });
  }
});