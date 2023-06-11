//this file is to allow typescript to import json files
declare module "*.json" {
    const value: any;
    export default value;
 }