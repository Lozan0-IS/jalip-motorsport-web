export type Availability="available"|"reserved"|"sold";
export interface Vehicle {id:string;name:string;year:number;condition:string;status:Availability;specifications:Record<string,string>;modifications:string[];mediaUrls:string[];videoUrl?:string}
export interface Part {id:string;name:string;categoryId:string;compatibleVehicles:string[];available:boolean;installationAvailable:boolean;mediaUrls:string[]}
export interface Project {id:string;name:string;buildType:string;story:string;modifications:string[];beforeMedia:string[];afterMedia:string[]}
export interface WorkshopRequest {id?:string;name:string;phone:string;vehicle:string;year:number;service:string;description:string;preferredDate:string;consent:boolean;status?:"new"|"contacted"|"scheduled"|"closed"}
export interface Configuration3D {id?:string;color:string;material:string;lightsOn:boolean;partIds:string[];createdAt?:string}
