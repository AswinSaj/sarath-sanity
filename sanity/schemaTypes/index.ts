import { type SchemaTypeDefinition } from "sanity";
import heroVideo from "./hero-video";
import category from "./category";
import poems from "./poems";
import about from "./about";
import filmography from "./filmography";
import poetrySection from "./poetry-section";
import contact from "./contact";
import logo from "./logo";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [heroVideo, category, poems, about, filmography, poetrySection, contact, logo],
};
