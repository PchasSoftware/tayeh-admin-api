import qs from "querystringify";
import { Base } from "../base";
import { media, UploadMedia } from "./types";

const resourceName = "media";

export class Media extends Base {
  getMedia(media_id: number) {
    return this.get<media>(`${resourceName}/get/${media_id}`);
  }
}
