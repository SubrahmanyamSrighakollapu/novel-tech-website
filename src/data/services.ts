import data from './services.json';
export const services = data;
export type Service = (typeof services)[number];
