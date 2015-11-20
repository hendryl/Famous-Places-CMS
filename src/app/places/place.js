class Place {
  constructor(data) {
    if (data) {
      this.name = data.name;
      this.enabled = data.enabled;
      this.description = data.description;
      this.country_id = data.country_id;
      this.image = data.image;
      this.latitude = data.latitude;
      this.longitude = data.longitude;
      this.link = data.link;
      this.tags = data.tags;
    } else {
      this.name = "";
      this.enabled = true;
      this.description = "";
      this.country_id = null;
      this.image = "";
      this.latitude = 0;
      this.longitude = 0;
      this.link = "";
      this.tags = [];
    }
  }
}

export default Place;
