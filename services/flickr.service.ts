import axios from "axios";

class FlickrServices {
  baseUrl = "https://api.flickr.com/services/rest/";

  async getInitialPhotos(pageNumber:number) {
    try {
      const response = await axios.get(this.baseUrl, {
        params: {
          method: "flickr.photos.getRecent",
          api_key: process.env.NEXT_PUBLIC_FLICKR_API_KEY,
          format: "json",
          per_page: "20",
          page: pageNumber,
          safe_search:3,
        },
      });

      const data = response?.data;
      const jsonStartIndex = data.indexOf("{");
      const jsonEndIndex = data.lastIndexOf("}");
      const json = data.substring(jsonStartIndex, jsonEndIndex + 1);
      const jsonData = JSON.parse(json);
      return jsonData;

    } catch (error) {
      throw error;
    }
  }

  async getPhotos(searchText:string, pageNumber:number) {
    try {
      const response = await axios.get(this.baseUrl, {
        params: {
          method: "flickr.photos.search",
          api_key: process.env.NEXT_PUBLIC_FLICKR_API_KEY,
          format: "json",
          tags: searchText,
          per_page: "20",
          page: pageNumber,
        },
      });
      const data = response?.data;
      const jsonStartIndex = data.indexOf("{");
      const jsonEndIndex = data.lastIndexOf("}");
      const json = data.substring(jsonStartIndex, jsonEndIndex + 1);
      const jsonData = JSON.parse(json);
      return jsonData;
    } catch (error) {
      throw error;
    }
  }
}

const flickrServicesInstance = new FlickrServices();

export default flickrServicesInstance;
