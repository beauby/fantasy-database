exports.instanceProps = {
  tableName: 'books',
  author: function () {
    return this.belongsTo(require('./authors'));
  },
  series: function () {
    return this.belongsTo(require('./series'));
  },
  chapters: function () {
    return this.hasMany(require('./chapters'));
  },
  firstChapter: function () {
    return this.hasMany(require('./chapters')).query(function (qb) {
      qb.where('ordering', 1);
    });
  },
  stores: function () {
    return this.belongsToMany(require('../stores/model'));
  }
};

exports.classProps = {
  typeName: 'books',
  fields: [
    'id',
    'author_id',
    'series_id',
    'date_published',
    'title'
  ],
  filters: {
    author_id: function (qb, value) {
      return qb.whereIn('author_id', value);
    },
    series_id: function (qb, value) {
      return qb.whereIn('series_id', value);
    },
    date_published: function (qb, value) {
      return qb.whereIn('date_published', value);
    },
    published_before: function (qb, value) {
      return qb.where('date_published', '<', value);
    },
    published_after: function (qb, value) {
      return qb.where('date_published', '>', value);
    },
    title: function (qb, value) {
      return qb.whereIn('title', value);
    }
  },
  relations: [
    'chapters',
    'firstChapter',
    'series',
    'author',
    'stores'
  ]
};
