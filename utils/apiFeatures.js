class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  filter() {
    const queryObj = { ...this.queryStr };
    const excludedFields = [
      "page",
      "sort",
      "limit",
      "title",
      "minPrice",
      "maxPrice",
    ];

    excludedFields.forEach((el) => delete queryObj[el]);

    this.query = this.query.find(queryObj);

    return this;
  }

  filterByPrice() {
    if (this.queryStr.minPrice && this.queryStr.maxPrice) {
      let minPrice = JSON.stringify(this.queryStr.minPrice);
      let maxPrice = JSON.stringify(this.queryStr.maxPrice);

      minPrice = minPrice.replace(/\b(gt|gte)\b/g, (match) => `$${match}`);
      maxPrice = maxPrice.replace(/\b(lt|lte)\b/g, (match) => `$${match}`);

      this.query = this.query.find({
        $and: [
          { pricePerNight: JSON.parse(minPrice) },
          { pricePerNight: JSON.parse(maxPrice) },
        ],
      });
    }

    return this;
  }

  search() {
    if (this.queryStr.title) {
      this.query = this.query.find({ $text: { $search: this.queryStr.title } });
    } else {
      this.query = this.query.find();
    }

    return this;
  }

  sort() {
    if (this.queryStr.sort) {
      const sortBy = this.queryStr.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  paginate() {
    const page = this.queryStr.page * 1 || 1;
    const limit = this.queryStr.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

export default APIFeatures;
