class Place {
  constructor(data) {
    if (data) {
      this.name = data.name;
      this.enabled = data.enabled;
      this.description = data.description;
      this.country_id = data.country_id;
      this.photo_id = data.photo_id;
      this.latitude = data.latitude;
      this.longitude = data.longitude;
      this.link = data.link;
      this.tags = data.tags;
    } else {
      this.name = "";
      this.enabled = true;
      this.description = "";
      this.country_id = null;
      this.photo_id = null;
      //Set default location to binus
      this.latitude = -6.200235;
      this.longitude = 106.785382;
      this.link = "";
      this.tags = [];
    }
  }
}

export default Place;
