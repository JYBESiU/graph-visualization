export enum NodeLabel {
  CITY = "city",
  COUNTRY = "country",
  CONTINENT = "continent",
  FORUM = "forum",
  PERSON = "person",
  MESSAGE = "message",
  COMPANY = "company",
  UNIVERSITY = "university",
  TAG = "tag",
  TAGCLASS = "tagclass",
}

export enum EdgeLabel {}

export type NodeData = {
  vertex_id: number;
  [x: string]: any;
};
